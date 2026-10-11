import { enquiry, serviceOptions } from "@/content/enquiry";
import type { ServiceId } from "@/content/types";
import type { Enquiry } from "./enquiry-schema";

const { brief, email: copy } = enquiry;

/** The site palette (globals.css). Email clients ignore CSS variables, so the hex values are repeated. */
const color = {
  navy: "#0b1f3a",
  blue: "#1d4ed8",
  blueEdge: "#1e40af",
  tint: "#eef4fb",
  line: "#dce3ec",
  muted: "#4b5768",
  amber: "#f2a93b",
  open: "#b4bcc8",
  white: "#ffffff",
};

/** Same colour per service as the site's week sheet (components/sections/service-swatch.ts). */
const swatch: Record<ServiceId, { fill: string; text: string; edge: string }> = {
  rostering: { fill: color.blue, text: color.white, edge: color.blue },
  administration: { fill: color.navy, text: color.white, edge: color.navy },
  marketing: { fill: color.amber, text: color.navy, edge: color.amber },
  accounting: { fill: color.white, text: color.navy, edge: color.blue },
};

const sans = `'Plus Jakarta Sans','Segoe UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif`;
const serif = `Georgia,'Times New Roman',serif`;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Inline style from longhand pairs. Outlook drops the `font` shorthand, so it is never used. */
function css(rules: Record<string, string | number>): string {
  return Object.entries(rules)
    .map(([key, value]) => `${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}:${value}`)
    .join(";");
}

function type(size: number, lineHeight: number, weight = 400, fontColor = color.navy, family = sans) {
  return { fontFamily: family, fontSize: `${size}px`, lineHeight: `${lineHeight}px`, fontWeight: weight, color: fontColor };
}

/**
 * The email Garified receives for each enquiry, set as an intake sheet in the site's own
 * language: a white sheet on tint, ruled rows, and the four services as colour-coded tiles
 * (requested ones filled and ticked, the rest left open like an unfilled shift). Every
 * value the user typed is escaped. The plain-text brief is still sent alongside.
 */
export function buildEnquiryEmail(data: Enquiry): string {
  const name = escapeHtml(data.name);
  const business = escapeHtml(data.business);
  const address = escapeHtml(data.email);
  const withName = (text: string) => escapeHtml(text).replace("{name}", () => name);

  const requested = serviceOptions.filter((option) => data.services.includes(option.id));
  const preheader = escapeHtml(
    `${data.name}, ${data.teamSize}. ${requested.length ? requested.map((o) => o.label).join(", ") : brief.noServices}.`,
  );
  const mailto = `mailto:${address}?subject=${encodeURIComponent(copy.replySubject)}`;

  const rule = `1px solid ${color.line}`;
  const label = css({ ...type(15, 22, 400, color.muted), padding: "12px 16px 12px 0", borderTop: rule, verticalAlign: "top", width: "104px" });
  const value = css({ ...type(16, 22, 600), padding: "12px 0", borderTop: rule, verticalAlign: "top", wordBreak: "break-word" });
  const heading = css({ ...type(15, 22, 700), margin: "32px 0 12px" });

  const register = [
    [brief.labels.contact, name],
    [brief.labels.email, `<a href="${mailto}" style="${css({ color: color.blue, textDecoration: "underline" })}">${address}</a>`],
    [brief.labels.teamSize, escapeHtml(data.teamSize)],
  ]
    .map(([key, val]) => `<tr><td class="key" style="${label}">${escapeHtml(key)}</td><td style="${value}">${val}</td></tr>`)
    .join("");

  // The tile is the table cell itself, so both tiles in a row always share one height.
  const tile = (option: (typeof serviceOptions)[number]) => {
    const on = data.services.includes(option.id);
    const s = swatch[option.id];
    const box = on
      ? css({ background: s.fill, border: `2px solid ${s.edge}` })
      : css({ background: color.white, border: `2px dashed ${color.open}` });
    const tick = `<span style="${css({
      display: "inline-block",
      width: "14px",
      height: "14px",
      borderRadius: "9px",
      border: `2px solid ${color.white}`,
      background: color.amber,
      textAlign: "center",
      verticalAlign: "middle",
      marginRight: "6px",
      ...type(10, 14, 700),
    })}">&#10003;</span>`;
    // No width on the tiles: with a fixed layout they split what the 8px gap leaves evenly.
    return `<td class="tile" valign="top" style="${box};border-radius:12px;padding:14px 16px">
      <p class="tile-name" style="${css({ ...type(16, 22, on ? 700 : 600, on ? s.text : color.muted), margin: "0" })}">${escapeHtml(option.label)}</p>
      <p style="${css({ ...type(13, 20, 600, on ? s.text : color.muted), margin: "6px 0 0" })}">${on ? tick + copy.requested : copy.notRequested}</p>
    </td>`;
  };
  const gap = `<td width="8" style="width:8px;font-size:0;line-height:0">&nbsp;</td>`;

  const services = requested.length
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;table-layout:fixed">
        <tr>${tile(serviceOptions[0])}${gap}${tile(serviceOptions[1])}</tr>
        <tr><td colspan="3" height="8" style="height:8px;font-size:0;line-height:0">&nbsp;</td></tr>
        <tr>${tile(serviceOptions[2])}${gap}${tile(serviceOptions[3])}</tr>
      </table>`
    : `<p style="${css({ ...type(16, 24, 600), margin: "0", padding: "14px 16px", background: color.tint, borderRadius: "12px" })}">${escapeHtml(brief.noServices)}</p>`;

  const priorities = data.priorities
    ? `<p style="${css({ ...type(18, 30, 400, color.navy, serif), margin: "0" })}">${escapeHtml(data.priorities).replace(/\r\n|\r|\n/g, "<br>")}</p>`
    : `<p style="${css({ ...type(16, 24, 400, color.muted), margin: "0" })}">${escapeHtml(copy.noPriorities)}</p>`;

  return `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${business}</title>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  @media (max-width: 480px) {
    .outer { padding-left: 8px !important; padding-right: 8px !important; }
    .pad { padding-left: 20px !important; padding-right: 20px !important; }
    .title { font-size: 24px !important; line-height: 30px !important; }
    .key { width: 84px !important; }
    .tile { padding: 12px !important; }
    .tile-name { font-size: 15px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${color.tint}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${color.tint}" style="background:${color.tint}">
<tr><td class="outer" align="center" style="padding:24px 12px 32px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="${css({ maxWidth: "600px", background: color.white, border: rule, borderRadius: "20px", borderCollapse: "separate" })}">
    <tr><td class="pad" style="${css({ ...type(15, 22, 600, color.blue), padding: "16px 28px", borderBottom: rule })}">${escapeHtml(copy.sheet)}</td></tr>
    <tr><td class="pad" style="padding:28px 28px 32px" align="left">
      <h1 class="title" style="${css({ ...type(28, 34, 700), letterSpacing: "-0.02em", margin: "0 0 20px" })}">${business}</h1>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-bottom:${rule}">${register}</table>
      <h2 style="${heading}">${escapeHtml(brief.labels.services)}</h2>
      ${services}
      <h2 style="${heading}">${escapeHtml(copy.priorities)}</h2>
      ${priorities}
    </td></tr>
    <tr><td class="pad" style="${css({ padding: "20px 28px", background: color.tint, borderTop: rule, borderRadius: "0 0 19px 19px" })}">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="${css({ background: color.blue, borderRadius: "999px", borderBottom: `2px solid ${color.blueEdge}` })}">
          <a href="${mailto}" style="${css({ ...type(16, 20, 600, color.white), display: "inline-block", padding: "12px 22px", textDecoration: "none" })}">${withName(copy.reply)}</a>
        </td>
      </tr></table>
    </td></tr>
  </table>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px"><tr>
    <td class="pad" style="${css({ ...type(13, 20, 400, color.muted), padding: "16px 28px 0", textAlign: "left" })}">${withName(copy.footer)}</td>
  </tr></table>
</td></tr>
</table>
</body>
</html>`;
}
