import { getClient } from "./client";
import { isSanityConfigured } from "./env";
import {
  homepageQuery,
  areasQuery,
  decodeIndexQuery,
  decodeSlugsQuery,
  decodeBySlugQuery,
  areaSlugsQuery,
  areaBySlugQuery,
} from "./queries";

export type NavLink = { label: string; href: string };

export type Decode = {
  slug: string;
  chip: string;
  symptom: string;
  genes?: string[];
  answer: string;
  why?: string;
  doThis?: string;
  oneLine?: string;
  areaTitle?: string;
  areaSlug?: string;
  order?: number;
};

export type DecodeFull = Decode & { related: Decode[] };

export type Area = {
  slug: string;
  title: string;
  blurb?: string;
  iconKey?: string;
  order: number;
  count: number;
};

export type AreaWithDecodes = {
  slug: string;
  title: string;
  blurb?: string;
  iconKey?: string;
  decodes: Decode[];
};

export type HomepageContent = {
  brandName: string;
  brandTld: string;
  tagline: string;
  navLinks: NavLink[];
  navCtaLabel?: string;
  navCtaHref?: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubhead: string;
  heroPrimaryCtaLabel: string;
  heroPrimaryCtaHref: string;
  heroSecondaryLabel: string;
  gridTitle: string;
  gridIntro: string;
  areasTitle: string;
  areasIntro: string;
  howTitle: string;
  howBody: string;
  disclaimer: string;
  mapTitle: string;
  mapIntro: string;
  newsletterTitle: string;
  newsletterBody: string;
  newsletterPlaceholder: string;
  newsletterCta: string;
  missionLine: string;
  footerLinks: NavLink[];
  footerCopy: string;
};

export type HomeData = {
  content: HomepageContent;
  areas: Area[];
  decodes: Decode[];
};

function ensureClient() {
  const client = getClient();
  if (!isSanityConfigured || !client) {
    throw new Error(
      "Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env, then run `pnpm seed`.",
    );
  }
  return client;
}

export async function getHomeData(): Promise<HomeData> {
  const client = ensureClient();
  const [content, areas, decodes] = await Promise.all([
    client.fetch<HomepageContent | null>(homepageQuery),
    client.fetch<Area[]>(areasQuery),
    client.fetch<Decode[]>(decodeIndexQuery),
  ]);
  if (!content)
    throw new Error("No homepage document found in Sanity. Run `pnpm seed`.");
  return { content, areas: areas ?? [], decodes: decodes ?? [] };
}

export async function getSiteContent(): Promise<HomepageContent> {
  const client = ensureClient();
  const content = await client.fetch<HomepageContent | null>(homepageQuery);
  if (!content) throw new Error("No homepage document found. Run `pnpm seed`.");
  return content;
}

export async function getAllDecodes(): Promise<Decode[]> {
  const client = ensureClient();
  return (await client.fetch<Decode[]>(decodeIndexQuery)) ?? [];
}

export async function getDecodeSlugs(): Promise<string[]> {
  const client = getClient();
  if (!isSanityConfigured || !client) return [];
  return (await client.fetch<string[]>(decodeSlugsQuery)) ?? [];
}

export async function getDecodeBySlug(
  slug: string,
): Promise<DecodeFull | null> {
  const client = ensureClient();
  return await client.fetch<DecodeFull | null>(decodeBySlugQuery, { slug });
}

export async function getAreaSlugs(): Promise<string[]> {
  const client = getClient();
  if (!isSanityConfigured || !client) return [];
  return (await client.fetch<string[]>(areaSlugsQuery)) ?? [];
}

export async function getAreaBySlug(
  slug: string,
): Promise<AreaWithDecodes | null> {
  const client = ensureClient();
  return await client.fetch<AreaWithDecodes | null>(areaBySlugQuery, { slug });
}
