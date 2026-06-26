import { useState } from "react";
import { Reveal } from "./Reveal";

const TOPICS = [
  {
    name: "Artificial Intelligence",
    related: ["Agents", "Embeddings", "Multimodal", "RAG"],
  },
  {
    name: "Product Thinking",
    related: ["Jobs-to-be-done", "Taste", "Distribution", "First principles"],
  },
  {
    name: "System Design",
    related: ["Scalability", "Trade-offs", "Latency", "Architecture"],
  },
  {
    name: "Software Engineering",
    related: ["Clean code", "Patterns", "Testing", "Tooling"],
  },
  {
    name: "Emerging Technologies",
    related: ["Edge compute", "On-device AI", "Spatial UI", "Crypto rails"],
  },
  {
    name: "Founder Craft",
    related: ["0 to 1", "Storytelling", "Capital", "Conviction"],
  },
];

export function Exploring() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section id="exploring" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="flex items-baseline gap-4 mb-3">
            <span className="text-xs tracking-[0.3em] text-[#00aeef] uppercase">Currently</span>
            <span className="h-px flex-1 bg-gradient-to-r from-[rgba(0,174,239,0.4)] to-transparent" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight">
            What I'm <span className="text-gradient">Exploring</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOPICS.map((t, i) => (
            <Reveal key={t.name} delay={i * 60}>
              <div
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className={`group relative overflow-hidden rounded-xl border p-6 h-full transition-all duration-500 ${
                  hover === i
                    ? "border-[rgba(0,174,239,0.4)] bg-[rgba(0,174,239,0.04)] shadow-[0_0_40px_-15px_rgba(0,174,239,0.5)]"
                    : "border-white/8 bg-white/[0.015] hover:border-white/15"
                }`}
              >
                <div className="font-display text-lg md:text-xl font-medium">{t.name}</div>

                <div
                  className={`mt-4 flex flex-wrap gap-1.5 transition-all duration-500 ${
                    hover === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                  }`}
                >
                  {t.related.map((r) => (
                    <span
                      key={r}
                      className="text-[10px] font-mono tracking-wider px-2 py-1 rounded-full border border-[rgba(0,255,255,0.2)] text-[#00ffff]/80 bg-[rgba(0,255,255,0.03)]"
                    >
                      {r}
                    </span>
                  ))}
                </div>

                <div
                  className={`absolute right-5 top-5 h-2 w-2 rounded-full transition-all duration-500 ${
                    hover === i ? "bg-[#00ffff] shadow-[0_0_12px_#00ffff]" : "bg-white/15"
                  }`}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
