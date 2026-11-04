import { readFile, rename, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const sourcePath = resolve(root, "translation-source.json");
const catalogPath = resolve(root, "translation-catalog.generated.json");
const languages = ["en", "es", "nl", "de", "zh-CN", "pt", "ar", "hi", "ja", "ru", "it"];
const humanText = /\p{L}{2}/u;
const voidElements = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta",
  "param", "source", "track", "wbr",
]);
const ignoredElements = new Set(["script", "style", "noscript", "template"]);
const htmlEntities = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  nbsp: "\u00a0",
  quot: '"',
};

function decodeEntities(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, name) => {
    if (name[0] === "#") {
      const codePoint = name[1].toLowerCase() === "x"
        ? Number.parseInt(name.slice(2), 16)
        : Number.parseInt(name.slice(1), 10);
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : entity;
    }
    return htmlEntities[name] ?? entity;
  });
}

function addText(text, texts) {
  const value = text.trim();
  if (
    value.length < 2
    || !humanText.test(value)
    || /^(?:https?:\/\/|www\.)/i.test(value)
    || value.includes("${")
    || value.includes("{{")
    || value === "IAeVolution"
  ) return;
  texts.add(value);
}

function parseAttributes(tag) {
  const attributes = new Map();
  const match = tag.match(/^<\s*[^\s/>]+([\s\S]*?)\/?>$/);
  if (!match) return attributes;
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for (const attribute of match[1].matchAll(pattern)) {
    attributes.set(
      attribute[1].toLowerCase(),
      decodeEntities(attribute[2] ?? attribute[3] ?? attribute[4] ?? ""),
    );
  }
  return attributes;
}

function extractHtml(html, texts) {
  const stack = [];
  const tokenPattern = /<!--[\s\S]*?-->|<![^>]*>|<\/?[^>]+>|[^<]+/g;
  for (const match of html.matchAll(tokenPattern)) {
    const token = match[0];
    if (token.startsWith("<!--") || token.startsWith("<!")) continue;
    if (token.startsWith("</")) {
      const tagName = token.match(/^<\/\s*([^\s/>]+)/)?.[1]?.toLowerCase();
      if (!tagName) continue;
      const index = stack.findLastIndex((entry) => entry.tag === tagName);
      if (index >= 0) stack.length = index;
      continue;
    }
    if (token.startsWith("<")) {
      const tagName = token.match(/^<\s*([^\s/>]+)/)?.[1]?.toLowerCase();
      if (!tagName) continue;
      const attributes = parseAttributes(token);
      const classNames = (attributes.get("class") ?? "").split(/\s+/);
      const parentSkipped = stack.some((entry) => entry.skip);
      const skip = parentSkipped
        || ignoredElements.has(tagName)
        || attributes.get("aria-hidden") === "true"
        || attributes.has("data-no-translate")
        || classNames.includes("brand");
      if (!skip) {
        for (const attribute of ["aria-label", "title", "placeholder", "alt", "data-assistant-prompt"]) {
          addText(attributes.get(attribute) ?? "", texts);
        }
      }
      if (!voidElements.has(tagName) && !token.endsWith("/>")) stack.push({ tag: tagName, skip });
      continue;
    }
    if (!stack.some((entry) => entry.skip)) addText(decodeEntities(token), texts);
  }
}

function decodeJsString(value, quote) {
  if (quote === '"') {
    try {
      return JSON.parse(`"${value}"`);
    } catch {
      return value;
    }
  }
  return value.replace(/\\(['\\])/g, "$1").replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\t/g, "\t");
}

function extractQuotedValues(source, texts) {
  const quoted = /"((?:\\.|[^"\\])*)"|'((?:\\.|[^'\\])*)'/g;
  for (const match of source.matchAll(quoted)) {
    const quote = match[1] !== undefined ? '"' : "'";
    addText(decodeJsString(match[1] ?? match[2], quote), texts);
  }
}

function extractRelevantJavascript(source, texts) {
  const relevantProperties = [
    "answer", "caption", "category", "contextDetail", "contextTitle", "description",
    "factNote", "factValue", "label", "linkLabel", "name", "narration", "publisherType", "reviewCadence",
    "sourceName", "stat", "summary", "title",
  ];
  const propertyPattern = new RegExp(
    `\\b(?:${relevantProperties.join("|")})\\s*:\\s*("(?:\\\\.|[^"\\\\])*"|'(?:\\\\.|[^'\\\\])*')`,
    "g",
  );
  for (const match of source.matchAll(propertyPattern)) {
    const literal = match[1];
    const quote = literal[0];
    addText(decodeJsString(literal.slice(1, -1), quote), texts);
  }

  const arrayPattern = /\b(?:examples|tags|topics)\s*:\s*\[([\s\S]*?)\]/g;
  for (const array of source.matchAll(arrayPattern)) extractQuotedValues(array[1], texts);

  const assignmentPattern = /\b(?:textContent|innerHTML)\s*=\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g;
  for (const match of source.matchAll(assignmentPattern)) {
    const literal = match[1];
    addText(decodeJsString(literal.slice(1, -1), literal[0]), texts);
  }

  const localizedCallPattern = /\bgetLocalizedText\s*\(\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g;
  for (const match of source.matchAll(localizedCallPattern)) {
    const literal = match[1];
    addText(decodeJsString(literal.slice(1, -1), literal[0]), texts);
  }

  const formattedPattern = /\bformatLocalizedText\s*\(\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')/g;
  for (const match of source.matchAll(formattedPattern)) {
    const literal = match[1];
    const template = decodeJsString(literal.slice(1, -1), literal[0]);
    const placeholders = new Map();
    addText(template.replace(/\{([\w]+)\}/g, (placeholder, name) => {
      if (!placeholders.has(name)) placeholders.set(name, `__IAEVAR${placeholders.size}__`);
      return placeholders.get(name);
    }), texts);
  }
}

function collectJsonStrings(value, texts, key = "") {
  if (Array.isArray(value)) {
    for (const entry of value) collectJsonStrings(entry, texts, key);
  } else if (value && typeof value === "object") {
    for (const [childKey, childValue] of Object.entries(value)) {
      collectJsonStrings(childValue, texts, childKey);
    }
  } else if (typeof value === "string" && !/^(?:url|domain|id|href|slug)$/i.test(key)) {
    addText(value, texts);
  }
}

async function buildSourceCatalog() {
  const texts = new Set();
  for (const file of ["index.html", "reseaux-mondiaux.html"]) {
    extractHtml(await readFile(resolve(root, file), "utf8"), texts);
  }

  for (const file of ["app.js", "reseaux-mondiaux.js"]) {
    const source = await readFile(resolve(root, file), "utf8");
    extractRelevantJavascript(source, texts);
    if (file === "reseaux-mondiaux.js") {
      const captions = source.match(/const captions\s*=\s*\{([\s\S]*?)\};/)?.[1] ?? "";
      extractQuotedValues(captions, texts);
    }
  }
  collectJsonStrings(JSON.parse(await readFile(resolve(root, "sources.json"), "utf8")), texts);

  const translationSource = await readFile(resolve(root, "translation.js"), "utf8");
  const keyPattern = /^\s*"((?:\\.|[^"\\])*)"\s*:/gm;
  for (const match of translationSource.matchAll(keyPattern)) {
    addText(decodeJsString(match[1], '"'), texts);
  }

  return [...texts].sort((a, b) => a.localeCompare(b, "fr"));
}

async function writeJsonAtomically(path, value) {
  const temporaryPath = `${path}.tmp`;
  await writeFile(temporaryPath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  await rename(temporaryPath, path);
}

function reportEstimate(texts) {
  const sourceCharacters = texts.reduce((total, text) => total + text.length, 0);
  const translatedCharacters = sourceCharacters * languages.length;
  console.log(`Unique French strings: ${texts.length}`);
  console.log(`Source characters: ${sourceCharacters.toLocaleString("en-US")}`);
  console.log(`Maximum characters sent across ${languages.length} target languages: ${translatedCharacters.toLocaleString("en-US")}`);
  console.log("Review the current Google Cloud Translation pricing and billing settings before generation.");
}

function makeBatches(texts) {
  const batches = [];
  let batch = [];
  let bytes = 0;
  for (const text of texts) {
    const textBytes = Buffer.byteLength(JSON.stringify(text), "utf8");
    if (batch.length >= 128 || (batch.length && bytes + textBytes > 20_000)) {
      batches.push(batch);
      batch = [];
      bytes = 0;
    }
    batch.push(text);
    bytes += textBytes;
  }
  if (batch.length) batches.push(batch);
  return batches;
}

async function translateBatch(texts, target, apiKey) {
  const maxAttempts = 5;
  for (let attempt = 1; ; attempt += 1) {
    try {
      return await translateBatchOnce(texts, target, apiKey);
    } catch (error) {
      const retryable = /HTTP (429|5\d\d)|request failed/.test(error.message);
      if (!retryable || attempt >= maxAttempts) throw error;
      const delay = 2000 * 2 ** (attempt - 1);
      console.warn(`${target}: temporary error, retry ${attempt}/${maxAttempts - 1} in ${delay / 1000}s`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

async function translateBatchOnce(texts, target, apiKey) {
  let response;
  try {
    const endpoint = new URL("https://translation.googleapis.com/language/translate/v2");
    endpoint.searchParams.set("key", apiKey);
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ q: texts, source: "fr", target, format: "text" }),
    });
  } catch {
    throw new Error(`Google Cloud Translation request failed for ${target}; check network access and try again.`);
  }

  if (!response.ok) {
    throw new Error(`Google Cloud Translation returned HTTP ${response.status} for ${target}.`);
  }
  const result = await response.json();
  const translations = result?.data?.translations;
  if (!Array.isArray(translations) || translations.length !== texts.length) {
    throw new Error(`Google Cloud Translation returned an incomplete batch for ${target}.`);
  }
  return translations.map((entry, index) => {
    const translated = decodeEntities(entry.translatedText ?? "");
    const placeholders = texts[index].match(/__IAEVAR\d+__/g) ?? [];
    if (placeholders.some((placeholder) => !translated.includes(placeholder))) {
      throw new Error(`Google Cloud Translation did not preserve a formatting placeholder for ${target}.`);
    }
    return translated;
  });
}

async function generateTranslations(texts) {
  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!apiKey) throw new Error("Set GOOGLE_TRANSLATE_API_KEY in your local environment; do not commit or share the key.");

  let catalog;
  try {
    catalog = JSON.parse(await readFile(catalogPath, "utf8"));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    catalog = {};
  }

  for (const target of languages) {
    catalog[target] ??= {};
    const missing = texts.filter((text) => typeof catalog[target][text] !== "string");
    const batches = makeBatches(missing);
    for (const [index, batch] of batches.entries()) {
      const translations = await translateBatch(batch, target, apiKey);
      batch.forEach((text, itemIndex) => {
        catalog[target][text] = translations[itemIndex];
      });
      await writeJsonAtomically(catalogPath, catalog);
      console.log(`${target}: saved batch ${index + 1}/${batches.length}`);
    }
  }
}

const args = new Set(process.argv.slice(2));
if (!args.has("--extract") && !args.has("--translate")) {
  console.error("Usage: node scripts/generate-translations.mjs --extract | --translate --confirm-cost");
  process.exitCode = 1;
} else {
  try {
    const texts = await buildSourceCatalog();
    reportEstimate(texts);
    if (args.has("--extract")) {
      await writeJsonAtomically(sourcePath, texts);
      console.log("Wrote translation-source.json (local-only, ignored by Git).");
    }
    if (args.has("--translate")) {
      if (!args.has("--confirm-cost")) {
        throw new Error("No API requests were made. Review the estimate and pricing, then rerun with --confirm-cost to authorize generation.");
      }
      await generateTranslations(texts);
    }
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
