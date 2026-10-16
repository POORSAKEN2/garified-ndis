/**
 * Smoke check for a running copy of the site: every page in the sitemap, the files
 * crawlers need, the stylesheet, and the 404 page. CI runs it against `next start`
 * before a change can ship; the uptime workflow runs it against production.
 *
 *   node scripts/check-site.mjs http://localhost:3000
 *   node scripts/check-site.mjs https://www.garifiedsolutions.com
 *
 * Exits 1 if any check fails. Set CHECK_REPORT to a file path to also get the
 * results as Markdown (the uptime workflow puts it in the issue it opens).
 */
import { appendFileSync, writeFileSync } from "node:fs";

const base = (process.argv[2] ?? "").replace(/\/+$/, "");
if (!base) {
  console.error("Usage: node scripts/check-site.mjs <base-url>");
  process.exit(2);
}

// Checked even if the sitemap is broken, so a bad sitemap cannot hide a missing page.
const CORE_PAGES = [
  "/",
  "/services/accounting",
  "/services/administration",
  "/services/marketing",
  "/services/rostering",
];

/** A failing check is retried so one dropped request does not report an outage. */
const ATTEMPTS = 3;
const RETRY_DELAY_MS = 5_000;
const TIMEOUT_MS = 15_000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetches `path` until `verify` passes or attempts run out. `verify` gets the response
 * and body and returns an error message, or nothing when the response is right.
 */
async function check(name, path, verify) {
  let result;
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    const started = performance.now();
    try {
      const res = await fetch(base + path, {
        redirect: "follow",
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: { "user-agent": "garified-site-check" },
      });
      const body = await res.text();
      const error = verify(res, body);
      result = { name, path, status: res.status, ms: Math.round(performance.now() - started), error, body };
    } catch (err) {
      const reason = err?.name === "TimeoutError" ? `no response in ${TIMEOUT_MS / 1000}s` : err?.cause?.code ?? err?.message;
      result = { name, path, status: "-", ms: Math.round(performance.now() - started), error: `request failed (${reason})` };
    }
    if (!result.error) break;
    if (attempt < ATTEMPTS) await sleep(RETRY_DELAY_MS * attempt);
  }
  return result;
}

const expectStatus = (want) => (res) => (res.status === want ? undefined : `expected ${want}, got ${res.status}`);

/** A real page, not a host error page: 200 and a Garified <title>. */
function expectPage(res, body) {
  if (res.status !== 200) return `expected 200, got ${res.status}`;
  const title = body.match(/<title>([^<]*)<\/title>/)?.[1];
  if (!title) return "no <title> in the page";
  if (!title.includes("Garified")) return `unexpected title "${title}"`;
}

const sitemap = await check("Sitemap", "/sitemap.xml", (res, body) =>
  expectStatus(200)(res) ?? (body.includes("<urlset") ? undefined : "not a sitemap"),
);

// Sitemap entries use the production domain; only their paths are checked here.
const sitemapPaths = [...(sitemap.body ?? "").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
const pages = [...new Set([...CORE_PAGES, ...sitemapPaths])];

const results = [
  sitemap,
  ...(await Promise.all([
    ...pages.map((path) => check(`Page ${path}`, path, expectPage)),
    check("robots.txt", "/robots.txt", (res, body) =>
      expectStatus(200)(res) ?? (body.includes("Sitemap:") ? undefined : "no Sitemap line"),
    ),
    // A 500 here means error handling itself is broken.
    check("Missing page returns 404", "/site-check-missing-page", expectStatus(404)),
  ])),
];

// Without its stylesheet the site loads as unstyled text, which a status code alone misses.
const home = results.find((r) => r.path === "/");
const css = home?.body?.match(/\/_next\/static\/[^"']+\.css/)?.[0];
results.push(
  css
    ? await check("Stylesheet", css, (res) =>
        expectStatus(200)(res) ?? (res.headers.get("content-type")?.includes("text/css") ? undefined : "not served as CSS"),
      )
    : { name: "Stylesheet", path: "-", status: "-", ms: 0, error: "home page links no stylesheet" },
);

const failed = results.filter((r) => r.error);

for (const r of results) {
  const line = `${r.error ? "FAIL" : "ok  "}  ${String(r.status).padEnd(3)}  ${String(r.ms).padStart(5)}ms  ${r.name}`;
  console.log(r.error ? `${line}: ${r.error}` : line);
}
console.log(failed.length ? `\n${failed.length} of ${results.length} checks failed on ${base}` : `\nAll ${results.length} checks passed on ${base}`);

const report = [
  `**${failed.length ? `${failed.length} of ${results.length} checks failed` : `All ${results.length} checks passed`}** on ${base}`,
  "",
  "| Check | Result | Status | Time |",
  "| --- | --- | --- | --- |",
  ...results.map((r) => `| ${r.name} | ${r.error ? `❌ ${r.error}` : "✅"} | ${r.status} | ${r.ms} ms |`),
  "",
].join("\n");

if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, report);
if (process.env.CHECK_REPORT) writeFileSync(process.env.CHECK_REPORT, report);

process.exit(failed.length ? 1 : 0);
