import { Reveal } from "./Reveal";

const ITEMS = [
  {
    tag: "Now",
    title: "Shipping small, sharp tools",
    body: "Building things end-to-end — from the rough sketch to something a stranger can use without an explanation.",
  },
  {
    tag: "Next",
    title: "An AI-native product, start to finish",
    body: "Not AI bolted on. AI as the interface itself — designed so the model and the human meet in the middle.",
  },
  {
    tag: "Later",
    title: "A company worth working at",
    body: "Tiny team, real problem, no theater. Build the thing I'd want to use, then hand it to people who'd notice it was missing.",
  },
  {
    tag: "Always",
    title: "Notice problems. Try things. Repeat.",
    body: "The compounding interest of curiosity. Every shipped experiment teaches more than ten studied ones.",
  },
];

export function Roadmap() {
  return (
    <section id="next" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="flex items-baseline gap-4 mb-3">
            <span className="text-xs tracking-[0.3em] text-[#00aeef] uppercase">Trajectory</span>
            <span className="h-px flex-1 bg-gradient-to-r from-[rgba(0,174,239,0.4)] to-transparent" />
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-semibold tracking-tight">
            What's <span className="text-gradient">Next?</span>
          </h2>
        </Reveal>

        <div className="mt-20 relative">
          <div className="absolute left-[11px] md:left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-[rgba(0,174,239,0.6)] via-[rgba(122,92,255,0.3)] to-transparent" />
          <div className="space-y-12">
            {ITEMS.map((it, i) => (
              <Reveal key={it.tag} delay={i * 100}>
                <div className="relative pl-12 md:pl-16">
                  <span className="absolute left-0 top-1.5 h-[22px] w-[22px] md:h-[30px] md:w-[30px] rounded-full border border-[rgba(0,174,239,0.5)] bg-[#050505] flex items-center justify-center">
                    <span className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-[#00ffff] shadow-[0_0_12px_#00ffff] animate-pulse-glow" />
                  </span>
                  <div className="font-mono text-[11px] tracking-[0.3em] text-[#00aeef] uppercase">
                    {it.tag}
                  </div>
                  <h3 className="mt-2 font-display text-2xl md:text-3xl font-medium">{it.title}</h3>
                  <p className="mt-3 text-white/55 max-w-2xl leading-relaxed">{it.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
