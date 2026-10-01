type CodeReadoutProps = {
  className?: string;
  variant?: "flank" | "inline" | "strip" | "ambient";
};

type Token = { text: string; kind?: "kw" | "str" | "fn" | "num" | "cmt" | "op" | "plain" };

const leftFlank: { n: number; tokens: Token[] }[] = [
  { n: 1, tokens: [{ text: "// future_reality.config", kind: "cmt" }] },
  { n: 2, tokens: [{ text: "const", kind: "kw" }, { text: " ", kind: "plain" }, { text: "festival", kind: "plain" }, { text: " = ", kind: "op" }, { text: "{", kind: "op" }] },
  { n: 3, tokens: [{ text: "  medium: ", kind: "plain" }, { text: '"generative_cinema"', kind: "str" }, { text: ",", kind: "op" }] },
  { n: 4, tokens: [{ text: "  intent: ", kind: "plain" }, { text: '"human_directed"', kind: "str" }, { text: ",", kind: "op" }] },
  { n: 5, tokens: [{ text: "  city: ", kind: "plain" }, { text: '"nyc"', kind: "str" }] },
  { n: 6, tokens: [{ text: "};", kind: "op" }] },
  { n: 8, tokens: [{ text: "await", kind: "kw" }, { text: " ", kind: "plain" }, { text: "render_scene", kind: "fn" }, { text: "();", kind: "op" }] },
  { n: 10, tokens: [{ text: "export", kind: "kw" }, { text: " ", kind: "plain" }, { text: "premiere", kind: "fn" }, { text: "();", kind: "op" }] },
];

const rightFlank: { n: number; tokens: Token[] }[] = [
  { n: 1, tokens: [{ text: "// pipeline.status", kind: "cmt" }] },
  { n: 2, tokens: [{ text: "model", kind: "plain" }, { text: ".", kind: "op" }, { text: "load", kind: "fn" }, { text: "(", kind: "op" }, { text: '"film"', kind: "str" }, { text: ");", kind: "op" }] },
  { n: 3, tokens: [{ text: "authorship", kind: "plain" }, { text: " = ", kind: "op" }, { text: "true", kind: "kw" }, { text: ";", kind: "op" }] },
  { n: 4, tokens: [{ text: "lat", kind: "plain" }, { text: ": ", kind: "op" }, { text: "40.7359", kind: "num" }, { text: ";", kind: "op" }] },
  { n: 5, tokens: [{ text: "date", kind: "plain" }, { text: ": ", kind: "op" }, { text: '"2026-10-25"', kind: "str" }, { text: ";", kind: "op" }] },
  { n: 7, tokens: [{ text: "return", kind: "kw" }, { text: " ", kind: "plain" }, { text: "premiere", kind: "fn" }, { text: "();", kind: "op" }] },
  { n: 9, tokens: [{ text: "// union_sq · oct_25", kind: "cmt" }] },
];

const stripLines: Token[][] = [
  [{ text: "build", kind: "plain" }, { text: ": ", kind: "op" }, { text: "nyc_2026", kind: "str" }],
  [{ text: "mode", kind: "plain" }, { text: " → ", kind: "op" }, { text: "ai_native_cinema", kind: "str" }],
  [{ text: "status", kind: "plain" }, { text: ": ", kind: "op" }, { text: "RENDERING", kind: "kw" }],
];

const ambientLines: string[] = [
  "render_pass · latent_diffusion · frame_24",
  "authorship: human · pipeline: generative_cinema",
  "union_sq · regal · nyc · 40.7359,-73.9903",
  "future_reality · ai_film · premiere_2026",
  "const story = await direct(intent);",
  "model.load('cinema') · color_grade · sound_mix",
];

function TokenLine({ tokens }: { tokens: Token[] }) {
  return (
    <>
      {tokens.map((token, i) => (
        <span key={i} className={token.kind ? `code-${token.kind}` : undefined}>
          {token.text}
        </span>
      ))}
    </>
  );
}

function Flank({ mirror }: { mirror?: boolean }) {
  const rows = mirror ? rightFlank : leftFlank;
  return (
    <pre className={`code-flank ${mirror ? "code-flank--right" : "code-flank--left"}`}>
      {rows.map((row) => (
        <div key={row.n} className="code-flank-line">
          <span className="code-ln">{String(row.n).padStart(2, "0")}</span>
          <code>
            <TokenLine tokens={row.tokens} />
          </code>
        </div>
      ))}
    </pre>
  );
}

export default function CodeReadout({ className = "", variant = "flank" }: CodeReadoutProps) {
  if (variant === "inline") {
    return (
      <p className={`code-inline ${className}`} aria-hidden="true">
        <span className="code-cmt">// </span>
        <span className="code-fn">init_festival</span>
        <span className="code-op">(</span>
        <span className="code-str">"future_reality"</span>
        <span className="code-op">)</span>
      </p>
    );
  }

  if (variant === "strip") {
    return (
      <div className={`code-strip ${className}`} aria-hidden="true">
        {stripLines.map((tokens, i) => (
          <span key={i} className="code-strip-item">
            <TokenLine tokens={tokens} />
          </span>
        ))}
      </div>
    );
  }

  if (variant === "ambient") {
    return (
      <div className={`code-ambient ${className}`}>
        {ambientLines.map((line) => (
          <span key={line} className="code-ambient-line">
            {line}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={`code-readout ${className}`} aria-hidden="true">
      <Flank />
      <Flank mirror />
    </div>
  );
}

export const processFnLabels = ["intent()", "generate()", "direct()", "premiere()"] as const;
