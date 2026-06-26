import { useState } from "react";
import { Reveal } from "./Reveal";

const PROJECTS = [
  {
    name: "Synapse",
    tag: "AI · Knowledge Systems",
    status: "In Development",
    year: "2026",
    problem: "Notes get written and forgotten. Information piles up, insight doesn't compound.",
    insight: "Knowledge isn't a list — it's a graph. The value is in the connections, not the entries.",
    solution: "A personal AI that links every thought to related ideas as you write, surfacing forgotten context the moment it's relevant.",
    impact: "Turns scattered notes into a living, queryable second brain.",
    tech: ["Python", "Embeddings", "Vector DB", "Node.js"],
    bg: "var(--color-bento-purple)",
  },
  {
    name: "Drift",
    tag: "Productivity · Focus",
    status: "Prototype",
    year: "2026",
    problem: "Most productivity tools add more noise than they remove.",
    insight: "Focus isn't a feature — it's an absence. The best tool is the one you barely notice.",
    solution: "An ambient focus companion that quietly shapes your environment around the work you're actually doing, instead of demanding attention.",
    impact: "Deep work, without the dashboards that pretend to enable it.",
    tech: ["Swift", "Core ML", "System APIs"],
    bg: "var(--color-bento-mint)",
  },
  {
    name: "Atlas",
    tag: "Data · Decision Tools",
    status: "Shipped",
    year: "2025",
    problem: "Decisions get made on instinct because the data is too tangled to read.",
    insight: "Numbers don't persuade. Patterns do. People act when they see the shape of the thing.",
    solution: "A visual layer that translates messy datasets into interactive maps of cause and effect — built for thinking, not reporting.",
    impact: "Lets non-technical decision makers see what the data is actually saying.",
    tech: ["React", "D3.js", "WebGL", "PostgreSQL"],
    bg: "var(--color-bento-yellow)",
  },
];


export function Projects() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="work" className="relative scroll-mt-32">
      <div className="w-full">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold tracking-widest text-[var(--color-bento-purple)] uppercase">Selected Work</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
            Engineering <span className="text-white/40">Ideas</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4">
          {PROJECTS.map((p, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={p.name} delay={i * 50}>
                <article
                  onMouseEnter={() => setOpen(i)}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={`group relative overflow-hidden rounded-3xl border transition-all duration-700 cursor-pointer ${
                    isOpen
                      ? "border-white/10 bg-[var(--surface-hover)] shadow-2xl md:scale-[1.01]"
                      : "border-white/5 bg-[var(--surface)] hover:border-white/10"
                  }`}
                >
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none`}
                    style={{ backgroundColor: p.bg }}
                  />

                  <div className="relative p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-4">
                          <div className="font-sans text-[10px] tracking-widest text-white/50 uppercase font-medium">
                            {p.tag}
                          </div>
                          <span className="w-1 h-1 rounded-full" style={{ backgroundColor: p.bg }} />
                          <div className="font-sans text-[10px] tracking-widest text-white/50 uppercase font-medium">
                            {p.year}
                          </div>
                          <span className="w-1 h-1 rounded-full bg-white/20" />
                          <div className="font-sans text-[10px] tracking-widest text-white/50 uppercase font-medium">
                            {p.status}
                          </div>
                        </div>
                        <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
                          {p.name}
                        </h3>
                      </div>
                      <div className="hidden md:block">
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500">
                          <span className={`transform transition-transform duration-500 text-lg ${isOpen ? "rotate-90" : "-rotate-45"}`}>→</span>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`grid gap-6 transition-all duration-700 ease-out-bento ${
                        isOpen ? "mt-8 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                          <Field label="The Problem" value={p.problem} />
                          <Field label="The Insight" value={p.insight} />
                          <Field label="The Solution" value={p.solution} />
                          <Field label="The Impact" value={p.impact} />
                        </div>
                        <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-white/5">
                          {p.tech.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] font-medium tracking-wide px-4 py-2 rounded-full border border-white/10 text-white/70 bg-white/5"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-sans text-xs font-semibold tracking-widest text-white/40 uppercase mb-3">
        {label}
      </div>
      <p className="text-white/80 leading-relaxed text-lg">{value}</p>
    </div>
  );
}
