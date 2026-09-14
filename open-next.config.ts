// open-next.config.ts created by @opennextjs/cloudflare
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const config = defineCloudflareConfig();
// Cloudflare's Workers Builds pipeline runs `npm run build` then a bare
// `wrangler versions upload`, so `npm run build` must itself produce the
// OpenNext output. But opennextjs-cloudflare's internal Next.js-build step
// defaults to shelling out to `npm run build` again -- which is now itself,
// causing infinite recursion. Point it at the real Next.js build directly.
config.buildCommand = "next build";

export default config;
