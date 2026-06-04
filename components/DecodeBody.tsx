import type { Decode } from "../sanity/fetch";
import { Info } from "./Icons";

/**
 * The shared decode content: the gene tags, the answer-first line, why it
 * happens, one thing to try, and the load-bearing "tendency not verdict" note.
 * Rendered identically inside the modal and on the standalone decode page.
 */
export default function DecodeBody({
  decode,
  disclaimer,
}: {
  decode: Decode;
  disclaimer?: string;
}) {
  return (
    <div className="decode__decoded">
      {decode.genes && decode.genes.length > 0 ? (
        <>
          <span className="decode__decoded-label">The gene behind it</span>
          <div className="decode__genes">
            {decode.genes.map((g) => (
              <span key={g} className="gene">
                {g}
              </span>
            ))}
          </div>
        </>
      ) : null}

      <p className="decode__answer">{decode.answer}</p>

      {decode.why ? (
        <>
          <h3 className="decode__h">Why it happens</h3>
          <p className="decode__p">{decode.why}</p>
        </>
      ) : null}

      {decode.doThis ? (
        <>
          <h3 className="decode__h">One thing to try</h3>
          <p className="decode__do">{decode.doThis}</p>
        </>
      ) : null}

      {disclaimer ? (
        <p className="decode__note">
          <Info size={15} /> {disclaimer}
        </p>
      ) : null}
    </div>
  );
}
