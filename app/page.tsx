import Link from "next/link";
import type { Metadata } from "next";
import { getHomeData } from "../sanity/fetch";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import Explorer from "../components/Explorer";
import Newsletter from "../components/Newsletter";
import {
  AreaIcon,
  ArrowRight,
  ChevronRight,
  Info,
  Tap,
} from "../components/Icons";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { content } = await getHomeData();
    return {
      title: `${content.brandName}${content.brandTld} · ${content.tagline}`,
      description: content.heroSubhead,
      keywords: [
        "why do I crash at 3pm",
        "coffee ruins my sleep gene",
        "slow caffeine metaboliser",
        "lactose intolerance India",
        "MTHFR B12 absorption",
        "symptom to gene explorer",
        "genetics in plain language India",
      ],
    };
  } catch {
    return { title: "the decode-yourself explorer" };
  }
}

export default async function HomePage() {
  const { content, areas, decodes } = await getHomeData();

  return (
    <>
      <SiteNav content={content} />

      <main>
        {/* HERO */}
        <section className="hero section">
          <div className="container hero__inner">
            {content.heroEyebrow ? (
              <span className="hero__badge">
                <span className="hero__badge-dot" />
                {content.heroEyebrow}
              </span>
            ) : null}
            <h1 className="hero__title">{content.heroHeadline}</h1>
            <p className="hero__sub">{content.heroSubhead}</p>
            <div className="hero__cta-row">
              <Link
                href={content.heroPrimaryCtaHref || "/#grid"}
                className="btn btn--primary"
              >
                {content.heroPrimaryCtaLabel || "Start tapping"}
                <ArrowRight />
              </Link>
              <Link href="/#areas" className="btn btn--ghost">
                {content.heroSecondaryLabel || "Browse by area"}
              </Link>
            </div>
          </div>
        </section>

        {/* TAP GRID */}
        <section id="grid" className="block section">
          <div className="container">
            <span className="eyebrow">
              <Tap size={13} /> Tap to decode
            </span>
            <h2 className="section-title" style={{ marginTop: 10 }}>
              {content.gridTitle}
            </h2>
            <p className="section-intro">{content.gridIntro}</p>
            <Explorer decodes={decodes} disclaimer={content.disclaimer} />
          </div>
        </section>

        {/* AREAS */}
        <section
          id="areas"
          className="block section"
          style={{
            background: "var(--surface-2)",
            borderBlock: "1px solid var(--line)",
          }}
        >
          <div className="container">
            <span className="eyebrow">By part of life</span>
            <h2 className="section-title" style={{ marginTop: 10 }}>
              {content.areasTitle}
            </h2>
            <p className="section-intro">{content.areasIntro}</p>

            <div className="areas__grid">
              {areas.map((a) => (
                <Link
                  key={a.slug}
                  href={`/area/${a.slug}`}
                  className="area-card"
                >
                  <span className="area-card__icon">
                    <AreaIcon iconKey={a.iconKey} />
                  </span>
                  <h3 className="area-card__title">{a.title}</h3>
                  {a.blurb ? (
                    <p className="area-card__blurb">{a.blurb}</p>
                  ) : null}
                  <span className="area-card__foot">
                    {a.count} {a.count === 1 ? "decode" : "decodes"}
                    <span className="area-card__arrow">
                      <ChevronRight size={16} />
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="how block section">
          <div className="container how__inner">
            <div>
              <span className="eyebrow">No reading required</span>
              <h2 className="section-title" style={{ marginTop: 10 }}>
                {content.howTitle}
              </h2>
            </div>
            <div>
              <p className="how__body">{content.howBody}</p>
              {content.disclaimer ? (
                <div className="disclaimer">
                  <Info size={18} />
                  <span>{content.disclaimer}</span>
                </div>
              ) : null}
              <Link
                href="/map"
                className="btn btn--ghost"
                style={{ marginTop: 22 }}
              >
                See the full symptom-to-gene map
                <ArrowRight />
              </Link>
            </div>
          </div>
        </section>

        <Newsletter content={content} />
      </main>

      <SiteFooter content={content} />
    </>
  );
}
