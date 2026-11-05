import { readFile } from "node:fs/promises";
import sharp from "sharp";

const logo = await sharp("public/favicon.svg", { density: 300 }).resize(300, 300).png().toBuffer();
const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><radialGradient id="g" cx="80%" cy="10%" r="80%"><stop offset="0" stop-color="#1d3a3a"/><stop offset="1" stop-color="#10151d"/></radialGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="440" y="285" font-family="Helvetica, Arial, sans-serif" font-size="96" font-weight="700" fill="#f3f6f8">IA<tspan fill="#c8f56a">e</tspan>Volution</text>
  <text x="444" y="355" font-family="Helvetica, Arial, sans-serif" font-size="38" fill="#a8d6c8">Comprendre l'IA qui change</text>
  <text x="444" y="420" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#8a98a6">Infrastructures · Réseaux · Robots · Sources</text>
</svg>`);

await sharp(text).composite([{ input: logo, left: 100, top: 165 }]).png().toFile("public/og-image.png");
