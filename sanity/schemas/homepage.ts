import { defineType, defineField, defineArrayMember } from "sanity";

const linkArray = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        name: "link",
        fields: [
          defineField({
            name: "label",
            type: "string",
            validation: (r) => r.required(),
          }),
          defineField({
            name: "href",
            type: "string",
            validation: (r) => r.required(),
          }),
        ],
        preview: { select: { title: "label", subtitle: "href" } },
      }),
    ],
  });

export const homepage = defineType({
  name: "homepage",
  title: "Homepage & Site",
  type: "document",
  groups: [
    { name: "brand", title: "Brand & Nav" },
    { name: "hero", title: "Hero" },
    { name: "grid", title: "Tap grid" },
    { name: "areas", title: "Areas section" },
    { name: "how", title: "How it works" },
    { name: "map", title: "Full map" },
    { name: "newsletter", title: "Newsletter" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({
      name: "brandName",
      type: "string",
      group: "brand",
      initialValue: "mygenesmap",
    }),
    defineField({
      name: "brandTld",
      type: "string",
      group: "brand",
      initialValue: ".com",
    }),
    defineField({ name: "tagline", type: "string", group: "brand" }),
    { ...linkArray("navLinks", "Nav links"), group: "brand" },
    defineField({ name: "navCtaLabel", type: "string", group: "brand" }),
    defineField({ name: "navCtaHref", type: "string", group: "brand" }),

    defineField({ name: "heroEyebrow", type: "string", group: "hero" }),
    defineField({ name: "heroHeadline", type: "string", group: "hero" }),
    defineField({ name: "heroSubhead", type: "text", rows: 4, group: "hero" }),
    defineField({ name: "heroPrimaryCtaLabel", type: "string", group: "hero" }),
    defineField({ name: "heroPrimaryCtaHref", type: "string", group: "hero" }),
    defineField({ name: "heroSecondaryLabel", type: "string", group: "hero" }),

    defineField({ name: "gridTitle", type: "string", group: "grid" }),
    defineField({ name: "gridIntro", type: "text", rows: 3, group: "grid" }),

    defineField({ name: "areasTitle", type: "string", group: "areas" }),
    defineField({ name: "areasIntro", type: "text", rows: 3, group: "areas" }),

    defineField({ name: "howTitle", type: "string", group: "how" }),
    defineField({ name: "howBody", type: "text", rows: 4, group: "how" }),
    defineField({
      name: "disclaimer",
      type: "text",
      rows: 3,
      group: "how",
      description:
        "The 'tendency, not a verdict' honest line shown across the site.",
    }),

    defineField({ name: "mapTitle", type: "string", group: "map" }),
    defineField({ name: "mapIntro", type: "text", rows: 3, group: "map" }),

    defineField({
      name: "newsletterTitle",
      type: "string",
      group: "newsletter",
    }),
    defineField({
      name: "newsletterBody",
      type: "text",
      rows: 3,
      group: "newsletter",
    }),
    defineField({
      name: "newsletterPlaceholder",
      type: "string",
      group: "newsletter",
    }),
    defineField({ name: "newsletterCta", type: "string", group: "newsletter" }),

    defineField({
      name: "missionLine",
      type: "text",
      rows: 3,
      group: "footer",
    }),
    { ...linkArray("footerLinks", "Footer links"), group: "footer" },
    defineField({ name: "footerCopy", type: "string", group: "footer" }),
  ],
  preview: { prepare: () => ({ title: "Homepage & Site content" }) },
});
