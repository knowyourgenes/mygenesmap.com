"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Decode } from "../sanity/fetch";
import DecodeBody from "./DecodeBody";
import { Tap, Close, ArrowRight } from "./Icons";

export default function Explorer({
  decodes,
  disclaimer,
}: {
  decodes: Decode[];
  disclaimer?: string;
}) {
  const [active, setActive] = useState<Decode | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      <div className="chips">
        {decodes.map((d) => (
          <button
            key={d.slug}
            className="chip"
            onClick={() => setActive(d)}
            aria-label={`Decode: ${d.chip}`}
          >
            <span className="chip__dot">
              <Tap size={17} />
            </span>
            <span>
              <span className="chip__label">{d.chip}</span>
              {d.areaTitle ? (
                <span className="chip__area">{d.areaTitle}</span>
              ) : null}
            </span>
          </button>
        ))}
      </div>

      {active ? (
        <div
          className="modal__backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={active.symptom || active.chip}
          onClick={() => setActive(null)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__head">
              <button
                className="modal__close"
                aria-label="Close"
                onClick={() => setActive(null)}
              >
                <Close size={18} />
              </button>
              <span className="decode__tapped-label">You tapped</span>
              <p className="decode__tapped">{active.symptom || active.chip}</p>
            </div>

            <div className="modal__scroll">
              <DecodeBody decode={active} disclaimer={disclaimer} />
            </div>

            <div className="modal__foot">
              <Link
                href={`/decode/${active.slug}`}
                className="btn btn--primary modal__foot-btn"
              >
                Read the full decode
                <ArrowRight size={15} />
              </Link>
              <button
                className="btn btn--ghost modal__foot-btn"
                onClick={() => setActive(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
