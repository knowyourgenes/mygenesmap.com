import { defineType, defineField } from "sanity";

export const decode = defineType({
  name: "decode",
  title: "Decode (symptom → gene)",
  type: "document",
  fields: [
    defineField({
      name: "chip",
      title: "Chip label",
      type: "string",
      description: "The short tappable label, e.g. 'I crash at 3pm'.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "symptom",
      title: "Symptom (You tapped…)",
      type: "string",
      description: "The full phrase a person would say.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "chip", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "area",
      type: "reference",
      to: [{ type: "area" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "genes",
      title: "Decoded to (genes)",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "answer",
      title: "The answer (AEO line)",
      type: "text",
      rows: 3,
      description:
        "Single self-contained sentence naming the gene; the line AI assistants quote.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "why",
      title: "Why it happens",
      type: "text",
      rows: 5,
    }),
    defineField({ name: "doThis", title: "Do this", type: "text", rows: 3 }),
    defineField({
      name: "oneLine",
      title: "One-line (full map)",
      type: "string",
      description:
        "The condensed summary shown in the full symptom-to-gene map.",
    }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "chip", subtitle: "area.title" },
  },
});
