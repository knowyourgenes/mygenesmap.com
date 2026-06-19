// Shared generators for /llms.txt and /llms-full.txt (see https://llmstxt.org).
//
// buildLlmsTxt()      -> concise markdown index of the whole site.
// buildLlmsFullTxt()  -> same structure but with full decode bodies inlined.
//
// Both build absolute URLs from siteConfig.siteUrl and pull content from the
// existing Sanity-backed fetch layer.

import { siteConfig } from "./siteConfig";
import {
  getSiteContent,
  getAllDecodes,
  getDecodeBySlug,
  type Area,
} from "../sanity/fetch";
import { getClient } from "../sanity/client";
import { isSanityConfigured } from "../sanity/env";
import { areasQuery } from "../sanity/queries";

// ---------- URL + text helpers ----------

/** Absolute URL from a site-root path. */
function abs(path: string): string {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}

/** Strip a trailing " | Brand" / " - Brand" / " · Brand" suffix off meta titles. */
export function cleanTitle(title: string): string {
  return title.replace(/\s+[|·\-–—]\s+[^|·\-–—]*$/, "").trim() || title.trim();
}

// ---------- Portable Text -> markdown ----------
// Generic serializer for Sanity Portable Text. Handles headings, lists,
// blockquotes and paragraphs with bold/italic marks; images and embeds are
// skipped. `headingOffset` demotes body headings so they nest under the
// article title (pass 2 to push h1->h3, h2->h4, ...).

type PTSpan = { _type?: string; text?: string; marks?: string[] };
type PTBlock = {
  _type?: string;
  style?: string;
  listItem?: string;
  level?: number;
  children?: PTSpan[];
};

function serializeSpans(children: PTSpan[] | undefined): string {
  if (!Array.isArray(children)) return "";
  return children
    .map((span) => {
      let text = span?.text ?? "";
      if (!text) return "";
      const marks = span.marks ?? [];
      if (marks.includes("strong")) text = `**${text}**`;
      if (marks.includes("em")) text = `*${text}*`;
      return text;
    })
    .join("");
}

export function portableTextToMarkdown(blocks: unknown, headingOffset = 0): string {
  if (!Array.isArray(blocks)) return "";
  const out: string[] = [];

  for (const block of blocks as PTBlock[]) {
    if (!block || block._type !== "block") continue; // skip images/embeds/etc.
    const text = serializeSpans(block.children).trim();
    if (!text) continue;

    const style = block.style ?? "normal";

    if (/^h[1-6]$/.test(style)) {
      const level = Math.min(6, parseInt(style.slice(1), 10) + headingOffset);
      out.push(`${"#".repeat(level)} ${text}`);
    } else if (style === "blockquote") {
      out.push(`> ${text}`);
    } else if (block.listItem === "bullet") {
      out.push(`- ${text}`);
    } else if (block.listItem === "number") {
      out.push(`1. ${text}`);
    } else {
      out.push(text);
    }
  }

  return out.join("\n\n");
}

// ---------- shared fetch ----------
// Areas (parts of life) aren't exposed via a typed fetch helper, so pull them
// straight from the existing query; fall back to an empty list when offline.
async function getAreas(): Promise<Area[]> {
  const client = getClient();
  if (!isSanityConfigured || !client) return [];
  return (await client.fetch<Area[]>(areasQuery)) ?? [];
}

// ---------- llms.txt (concise index) ----------

export async function buildLlmsTxt(): Promise<string> {
  const [content, areas, decodes] = await Promise.all([
    getSiteContent(),
    getAreas(),
    getAllDecodes(),
  ]);

  const summary =
    content?.missionLine?.trim() || content?.heroSubhead?.trim() || siteConfig.description;

  const lines: string[] = [];
  lines.push(`# ${siteConfig.siteName}`);
  lines.push("");
  lines.push(`> ${summary}`);
  lines.push("");

  lines.push("## Key Pages");
  lines.push(
    `- [Home](${abs("/")}): Tap what your body does and find the gene behind it, in plain language.`,
  );
  lines.push(
    `- [Full map](${abs("/map")}): Every symptom-to-gene decode in one scannable table.`,
  );
  lines.push("");

  if (areas.length) {
    lines.push("## Areas of life");
    for (const a of areas) {
      const excerpt = a.blurb?.trim() || `${a.count} decodes in this area.`;
      lines.push(`- [${cleanTitle(a.title)}](${abs(`/area/${a.slug}`)}): ${excerpt}`);
    }
    lines.push("");
  }

  if (decodes.length) {
    lines.push("## Decodes");
    for (const d of decodes) {
      const title = cleanTitle(d.symptom || d.chip);
      const excerpt = d.oneLine?.trim() || d.answer?.trim() || "";
      lines.push(`- [${title}](${abs(`/decode/${d.slug}`)}): ${excerpt}`);
    }
    lines.push("");
  }

  return lines.join("\n").trim() + "\n";
}

// ---------- llms-full.txt (full content inlined) ----------

export async function buildLlmsFullTxt(): Promise<string> {
  const [content, areas, decodes] = await Promise.all([
    getSiteContent(),
    getAreas(),
    getAllDecodes(),
  ]);

  const summary =
    content?.missionLine?.trim() || content?.heroSubhead?.trim() || siteConfig.description;

  const lines: string[] = [];
  lines.push(`# ${siteConfig.siteName}`);
  lines.push("");
  lines.push(`> ${summary}`);
  lines.push("");

  lines.push("## Key Pages");
  lines.push(`- [Home](${abs("/")})`);
  lines.push(`- [Full map](${abs("/map")})`);
  lines.push("");

  if (areas.length) {
    lines.push("## Areas of life");
    for (const a of areas) {
      lines.push(`### ${cleanTitle(a.title)}`);
      lines.push(`URL: ${abs(`/area/${a.slug}`)}`);
      lines.push("");
      if (a.blurb?.trim()) {
        lines.push(a.blurb.trim());
        lines.push("");
      }
    }
  }

  // Full decode bodies. Each decode is fetched in parallel for the genes,
  // why and do-this fields, kept in index order.
  if (decodes.length) {
    lines.push("## Decodes");
    lines.push("");
    const full = await Promise.all(decodes.map((d) => getDecodeBySlug(d.slug)));
    for (const item of full) {
      if (!item) continue;
      const question = item.symptom || item.chip;
      lines.push(`### ${cleanTitle(question)}`);
      lines.push(`URL: ${abs(`/decode/${item.slug}`)}`);
      if (item.areaTitle) lines.push(`Area: ${item.areaTitle}`);
      if (item.genes?.length) lines.push(`Genes: ${item.genes.join(", ")}`);
      lines.push("");
      if (item.answer?.trim()) {
        lines.push(item.answer.trim());
        lines.push("");
      }
      if (item.why?.trim()) {
        lines.push("#### Why it happens");
        lines.push(item.why.trim());
        lines.push("");
      }
      if (item.doThis?.trim()) {
        lines.push("#### Do this");
        lines.push(item.doThis.trim());
        lines.push("");
      }
    }
  }

  return lines.join("\n").trim() + "\n";
}
