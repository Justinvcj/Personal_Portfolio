import { Reveal } from "./Reveal";

const SKILLS = [
  "Java", "Python", "SQL", "Node.js", "MySQL", "Git",
  "AI Tools", "HTML", "CSS", "JavaScript", "TypeScript",
  "REST APIs", "Linux", "System Design", "Swift", "Figma"
];

export function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-32">
      <div className="w-full">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold tracking-widest text-[var(--color-bento-mint)] uppercase">Toolkit</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
            Tools I Use To <span className="text-white/40">Build</span>
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            {SKILLS.map((s) => (
              <div
                key={s}
                className="bg-[var(--surface)] border border-white/5 rounded-xl p-4 flex items-center justify-center hover:bg-[var(--surface-hover)] hover:border-white/10 transition-all duration-500 group hover:-translate-y-1"
              >
                <span className="text-white/70 text-sm font-medium group-hover:text-white transition-colors">
                  {s}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
