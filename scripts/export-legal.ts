// Exportiert alle Rechtstexte als Klartext (z. B. zum Einfügen in eRecht24).
// Aufruf: node --experimental-strip-types scripts/export-legal.ts
import { writeFileSync } from "node:fs";
import * as legal from "../lib/legal-content.ts";

const pages = [legal.impressum, legal.datenschutz, legal.cookies, legal.agb, legal.widerruf];
const out = pages
  .map((p) => `# ${p.title}\n\n${p.sections.map((s) => `## ${s.h2}\n\n${s.body.join("\n\n")}`).join("\n\n")}`)
  .join("\n\n---\n\n");

writeFileSync(new URL("../exports/rechtstexte.md", import.meta.url), out + "\n");
console.log(`exports/rechtstexte.md (${pages.length} Seiten)`);
