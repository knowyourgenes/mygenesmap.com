import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getDecodeBySlug,
  getDecodeSlugs,
  getSiteContent,
} from "../../../sanity/fetch";
import SiteNav from "../../../components/SiteNav";
import SiteFooter from "../../../components/SiteFooter";
import DecodeBody from "../../../components/DecodeBody";
import { ArrowRight, ChevronRight } from "../../../components/Icons";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getDecodeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const decode = await getDecodeBySlug(slug);
  if (!decode) return { title: "Decode not found" };

  const question = decode.symptom || decode.chip;
  const title = question.replace(/^I /, "Why ").replace(/\?$/, "") + "?";
  return {
    title: question,
    description: decode.answer,
    keywords: [
      ...(decode.genes ?? []),
      decode.chip,
      decode.areaTitle ?? "",
      "genetics explained India",
      "is this genetic",
    ].filter(Boolean),
    openGraph: {
      title,
      description: decode.answer,
      type: "article",
    },
  };
}

export default async function DecodePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [decode, content] = await Promise.all([
    getDecodeBySlug(slug),
    getSiteContent(),
  ]);
  if (!decode) notFound();

  const question = decode.symptom || decode.chip;

  // QAPage / FAQ structured data for answer engines.
  const acceptedText = [decode.answer, decode.why, decode.doThis]
    .filter(Boolean)
    .join(" ");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: acceptedText,
      },
    },
  };

  return (
    <>
      <SiteNav content={content} />

      <main>
        <section className="page-head section">
          <div className="container page-head__inner">
            <nav className="breadcrumb">
              <Link href="/">Home</Link>
              <span className="breadcrumb__sep">/</span>
              {decode.areaSlug ? (
                <>
                  <Link href={`/area/${decode.areaSlug}`}>
                    {decode.areaTitle}
                  </Link>
                  <span className="breadcrumb__sep">/</span>
                </>
              ) : null}
              <span>Decode</span>
            </nav>
            <h1 className="page-head__title">{question}</h1>
            {decode.answer ? (
              <p className="page-head__intro">{decode.answer}</p>
            ) : null}
          </div>
        </section>

        <section className="section">
          <div className="container decode-page">
            <DecodeBody decode={decode} disclaimer={content.disclaimer} />

            {decode.related && decode.related.length > 0 ? (
              <div style={{ marginTop: 44 }}>
                <h2 className="section-title" style={{ fontSize: "22px" }}>
                  More in {decode.areaTitle}
                </h2>
                <div className="chips" style={{ marginTop: 18 }}>
                  {decode.related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/decode/${r.slug}`}
                      className="chip"
                    >
                      <span className="chip__dot">
                        <ChevronRight size={16} />
                      </span>
                      <span>
                        <span className="chip__label">{r.chip}</span>
                        {r.oneLine ? (
                          <span className="chip__area">{r.oneLine}</span>
                        ) : null}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            <Link
              href="/#grid"
              className="btn btn--primary"
              style={{ marginTop: 36 }}
            >
              Decode something else
              <ArrowRight />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter content={content} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
