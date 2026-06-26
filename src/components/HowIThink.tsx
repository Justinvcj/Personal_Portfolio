import { useState } from "react";
import { Reveal } from "./Reveal";

const STAGES = [
  {
    n: "01",
    title: "Observe",
    q: "What problem actually exists?",
    body: "Strip away assumptions. Watch how people behave, not what they say. The clearest opportunities live in the friction nobody bothers to articulate.",
  },
  {
    n: "02",
    title: "Research",
    q: "Does this already exist?",
    body: "Map the landscape. Understand what's been tried, why it succeeded, why it failed. Standing on shoulders is faster than starting from zero.",
  },
  {
    n: "03",
    title: "Understand",
    q: "Why does this problem exist?",
    body: "Trace it to the root. Problems are surface symptoms of deeper systems. The right diagnosis is half the solution.",
  },
  {
    n: "04",
    title: "Design",
    q: "What would the ideal solution look like?",
    body: "Imagine the end state without compromise first. Then negotiate with reality. Constraints should sharpen the idea, not dilute it.",
  },
  {
    n: "05",
    title: "Build",
    q: "Turn ideas into reality.",
    body: "Ship. Iterate. Talk to users. The only proof that an idea works is something running in the world that people return to.",
  },
];

export function HowIThink() {
  const [active, setActive] = useState(0);

  return (
    <section id="think" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-baseline gap-4 mb-3">
            <span className="text-xs tracking-[0.3em] text-[#00aeef] uppercase">Process</span>
            <span className="h-px flex-1 bg-gradient-to-r from-[rgba(0,174,239,0.4)] to-transparent" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight">
            How I <span className="text-gradient">Think</span>
          </h2>
          <p className="mt-4 text-white/55 max-w-xl">
            A blueprint for turning observation into something real.
          </p>
        </Reveal>

        <div className="mt-20 grid lg:grid-cols-[1fr_1.2fr] gap-12">
          {/* Stages list */}
          <div className="relative">
            <div className="absolute left-[22px] top-3 bottom-3 w-px bg-gradient-to-b from-[rgba(0,174,239,0.5)] via-[rgba(122,92,255,0.3)] to-transparent" />
            <div className="space-y-2">
              {STAGES.map((s, i) => (
                <button
                  key={s.n}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group w-full text-left relative pl-14 pr-4 py-4 rounded-lg transition-colors duration-500 hover:bg-white/[0.02]"
                >
                  <span
                    className={`absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] rounded-full border transition-all duration-500 ${
                      active === i
                        ? "border-[#00ffff] bg-[rgba(0,255,255,0.15)] shadow-[0_0_20px_rgba(0,255,255,0.6)]"
                        : "border-white/20 bg-[#050505]"
                    }`}
                  >
                    <span
                      className={`absolute inset-1 rounded-full transition-all duration-500 ${
                        active === i ? "bg-[#00ffff]" : "bg-transparent"
                      }`}
                    />
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className={`font-mono text-xs transition-colors ${active === i ? "text-[#00ffff]" : "text-white/30"}`}>
                      {s.n}
                    </span>
                    <span
                      className={`font-display text-xl md:text-2xl font-medium transition-colors ${
                        active === i ? "text-white" : "text-white/45"
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Active panel */}
          <div className="relative">
            <div className="sticky top-32 glass-panel rounded-2xl p-8 md:p-10 min-h-[320px] overflow-hidden">
              <div
                className="absolute inset-0 opacity-40 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 80% 0%, rgba(0,174,239,0.18), transparent 50%)",
                }}
              />
              <div key={active} className="relative animate-fade-up">
                <div className="font-mono text-xs text-[#00aeef] tracking-[0.25em]">
                  STAGE {STAGES[active].n}
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-semibold mt-3 text-gradient">
                  {STAGES[active].title}
                </h3>
                <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed">
                  {STAGES[active].q}
                </p>
                <p className="mt-5 text-white/55 leading-relaxed max-w-lg">
                  {STAGES[active].body}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
