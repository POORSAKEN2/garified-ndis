This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Checks and monitoring

Two GitHub Actions workflows guard the live site:

- **CI** (`.github/workflows/ci.yml`) runs on every pull request and push to `main`: lint, unit tests, production build, then starts the built site and checks every page. A red run means the change would break the site, so fix it before merging.
- **Uptime** (`.github/workflows/uptime.yml`) checks https://www.garifiedsolutions.com every 15 minutes and after each Vercel production deploy. If it fails it opens a `site-down` issue with the failing checks, and closes it once the site passes again. First places to look: the Vercel dashboard (deployments, runtime logs) and the latest commits on `main`; promote the previous deployment in Vercel to roll back.

Both use `scripts/check-site.mjs`, which you can run yourself:

```bash
node scripts/check-site.mjs https://www.garifiedsolutions.com
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
