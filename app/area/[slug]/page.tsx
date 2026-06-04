import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAreaBySlug,
  getAreaSlugs,
  getSiteContent,
} from "../../../sanity/fetch";
import SiteNav from "../../../components/SiteNav";
import SiteFooter from "../../../components/SiteFooter";
import Explorer from "../../../components/Explorer";
import { ArrowRight } from "../../../components/Icons";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAreaSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = await getAreaBySlug(slug);
  if (!area) return { title: "Area not found" };
  return {
    title: area.title,
    description:
      area.blurb ||
      `Decode the ${area.title.toLowerCase()} things your body does, and the genes behind them.`,
    keywords: [
      area.title,
      "genetics",
      "why do I",
      "India",
      ...(area.decodes ?? []).map((d) => d.chip),
    ],
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [area, content] = await Promise.all([
    getAreaBySlug(slug),
    getSiteContent(),
  ]);
  if (!area) notFound();

  const decodes = (area.decodes ?? []).map((d) => ({
    ...d,
    areaTitle: area.title,
  }));

  return (
    <>
      <SiteNav content={content} />

      <main>
        <section className="page-head section">
          <div className="container page-head__inner">
            <nav className="breadcrumb">
              <Link href="/">Home</Link>
              <span className="breadcrumb__sep">/</span>
              <Link href="/#areas">Areas</Link>
              <span className="breadcrumb__sep">/</span>
              <span>{area.title}</span>
            </nav>
            <h1 className="page-head__title">{area.title}</h1>
            {area.blurb ? (
              <p className="page-head__intro">{area.blurb}</p>
            ) : null}
          </div>
        </section>

        <section className="block section">
          <div className="container">
            <span className="eyebrow">
              {decodes.length} {decodes.length === 1 ? "decode" : "decodes"} in
              this area
            </span>
            <h2 className="section-title" style={{ marginTop: 10 }}>
              Tap what sounds like you
            </h2>
            <Explorer decodes={decodes} disclaimer={content.disclaimer} />

            <Link
              href="/#areas"
              className="btn btn--ghost"
              style={{ marginTop: 36 }}
            >
              Browse other areas
              <ArrowRight />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter content={content} />
    </>
  );
}
