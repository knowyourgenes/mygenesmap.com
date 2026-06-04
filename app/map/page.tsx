import Link from "next/link";
import type { Metadata } from "next";
import { getHomeData } from "../../sanity/fetch";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { content } = await getHomeData();
    return {
      title: content.mapTitle || "The full symptom-to-gene map",
      description: content.mapIntro,
      keywords: [
        "symptom to gene map",
        "what gene causes",
        "genetics lookup India",
        "why do I feel",
        "decode my body",
      ],
    };
  } catch {
    return { title: "The full symptom-to-gene map" };
  }
}

export default async function MapPage() {
  const { content, decodes } = await getHomeData();

  // FAQPage JSON-LD — every decode as a question/answer pair.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: decodes.map((d) => ({
      "@type": "Question",
      name: d.symptom || d.chip,
      acceptedAnswer: { "@type": "Answer", text: d.answer },
    })),
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
              <span>Full map</span>
            </nav>
            <h1 className="page-head__title">{content.mapTitle}</h1>
            {content.mapIntro ? (
              <p className="page-head__intro">{content.mapIntro}</p>
            ) : null}
          </div>
        </section>

        <section className="block section">
          <div className="container">
            <div className="map-wrap">
              <table className="map-table">
                <thead>
                  <tr>
                    <th>What you feel</th>
                    <th>Gene behind it</th>
                    <th>The one-line answer</th>
                  </tr>
                </thead>
                <tbody>
                  {decodes.map((d) => (
                    <tr key={d.slug}>
                      <td className="map-table__feel">
                        <Link href={`/decode/${d.slug}`}>
                          {d.symptom || d.chip}
                        </Link>
                      </td>
                      <td className="map-table__genes">
                        {(d.genes ?? []).join(" · ")}
                      </td>
                      <td>{d.oneLine || d.answer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
