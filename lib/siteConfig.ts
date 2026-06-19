// Canonical site identity. Reused by sitemap, robots, and the llms.txt routes
// so the production URL/name live in exactly one place.
export const siteConfig = {
  siteUrl: "https://mygenesmap.com",
  siteName: "mygenesmap.com",
  description:
    "An interactive map from what you feel to the gene that explains it. " +
    "Tap the things your body actually does - the afternoon crash, the coffee that " +
    "ruins your sleep, the diet that never works - and see the science behind each one, " +
    "in plain language, with one thing to try. India-aware, free for everyone.",
} as const;
