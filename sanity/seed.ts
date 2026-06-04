/**
 * Push seed-data.ts into the configured Sanity dataset.
 *
 * Required env (in .env.local or .env):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN (Editor)
 *
 * Run:  pnpm seed
 */

import { createClient } from "@sanity/client";
import { areas, decodes, homepageContent } from "./seed-data";

function loadDotEnv() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("fs");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require("path");
    for (const file of [".env.local", ".env"]) {
      const p = path.join(process.cwd(), file);
      if (!fs.existsSync(p)) continue;
      for (const raw of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
        const line = raw.trim();
        if (!line || line.startsWith("#")) continue;
        const eq = line.indexOf("=");
        if (eq === -1) continue;
        const key = line.slice(0, eq).trim();
        let val = line.slice(eq + 1).trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = val;
      }
    }
  } catch {
    // best-effort
  }
}

loadDotEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing env vars. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_WRITE_TOKEN in .env",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-10-01",
  useCdn: false,
});

async function run() {
  console.log(`Seeding project=${projectId} dataset=${dataset}`);

  const oldIds = await client.fetch<string[]>(
    `*[_type in ["area", "decode"]]._id`,
  );
  if (oldIds.length > 0)
    console.log(`Deleting ${oldIds.length} existing content docs.`);

  const tx = client.transaction();
  for (const id of oldIds) tx.delete(id);

  tx.createOrReplace({
    _id: "homepage.singleton",
    _type: "homepage",
    ...homepageContent,
  });

  for (const a of areas) {
    tx.createOrReplace({
      _id: `area.${a.slug}`,
      _type: "area",
      title: a.title,
      slug: { _type: "slug", current: a.slug },
      blurb: a.blurb,
      iconKey: a.iconKey,
      order: a.order,
    });
  }

  for (const d of decodes) {
    tx.createOrReplace({
      _id: `decode.${d.slug}`,
      _type: "decode",
      chip: d.chip,
      symptom: d.symptom,
      slug: { _type: "slug", current: d.slug },
      area: { _type: "reference", _ref: `area.${d.areaSlug}` },
      genes: d.genes,
      answer: d.answer,
      why: d.why,
      doThis: d.doThis,
      oneLine: d.oneLine,
      order: d.order,
    });
  }

  const result = await tx.commit();
  console.log(`Seeded ${result.results.length} documents.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
