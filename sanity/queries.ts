import { groq } from "next-sanity";

const decodeCard = `{
  "slug": slug.current,
  chip,
  symptom,
  genes,
  answer,
  why,
  doThis,
  oneLine,
  "areaTitle": area->title,
  "areaSlug": area->slug.current,
  order
}`;

export const homepageQuery = groq`*[_type == "homepage"] | order(_updatedAt desc)[0] {
  brandName, brandTld, tagline,
  navLinks[]{ label, href },
  navCtaLabel, navCtaHref,
  heroEyebrow, heroHeadline, heroSubhead,
  heroPrimaryCtaLabel, heroPrimaryCtaHref, heroSecondaryLabel,
  gridTitle, gridIntro,
  areasTitle, areasIntro,
  howTitle, howBody, disclaimer,
  mapTitle, mapIntro,
  newsletterTitle, newsletterBody, newsletterPlaceholder, newsletterCta,
  missionLine,
  footerLinks[]{ label, href },
  footerCopy
}`;

export const areasQuery = groq`*[_type == "area"] | order(order asc) {
  "slug": slug.current,
  title, blurb, iconKey, order,
  "count": count(*[_type == "decode" && references(^._id)])
}`;

export const decodeIndexQuery = groq`*[_type == "decode"] | order(order asc) ${decodeCard}`;

export const decodeSlugsQuery = groq`*[_type == "decode" && defined(slug.current)][].slug.current`;

export const decodeBySlugQuery = groq`*[_type == "decode" && slug.current == $slug][0] {
  "slug": slug.current,
  chip, symptom, genes, answer, why, doThis, oneLine,
  "areaTitle": area->title,
  "areaSlug": area->slug.current,
  "related": *[_type == "decode" && area._ref == ^.area._ref && slug.current != ^.slug.current] | order(order asc)[0...6] ${decodeCard}
}`;

export const areaSlugsQuery = groq`*[_type == "area" && defined(slug.current)][].slug.current`;

export const areaBySlugQuery = groq`*[_type == "area" && slug.current == $slug][0] {
  "slug": slug.current,
  title, blurb, iconKey,
  "decodes": *[_type == "decode" && references(^._id)] | order(order asc) ${decodeCard}
}`;
