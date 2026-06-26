import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "top", label: "Intro" },
  { id: "why", label: "Why" },
  { id: "think", label: "Process" },
  { id: "work", label: "Work" },
  { id: "exploring", label: "Exploring" },
  { id: "skills", label: "Toolkit" },
  { id: "next", label: "Next" },
  { id: "contact", label: "Contact" },
];

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);

      const y = window.scrollY + window.innerHeight * 0.35;
      let curr = 0;
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y) curr = i;
      });
      setActive(curr);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* top thin progress line */}
      <div className="fixed top-0 inset-x-0 z-50 h-[2px] pointer-events-none">
        <div
          className="h-full origin-left bg-gradient-to-r from-[#00aeef] via-[#00ffff] to-[#7a5cff] shadow-[0_0_12px_rgba(0,255,255,0.6)]"
          style={{
            transform: `scaleX(${progress})`,
            transition: "transform 0.15s linear",
          }}
        />
      </div>

      {/* side section rail (desktop) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3 pointer-events-none">
        <div className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase pointer-events-auto">
          {String(Math.round(progress * 100)).padStart(2, "0")}
          <span className="text-white/15">/100</span>
        </div>
        <div className="flex flex-col items-end gap-2 pointer-events-auto">
          {SECTIONS.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="group flex items-center gap-3 py-0.5"
              aria-label={`Jump to ${s.label}`}
            >
              <span
                className={`font-mono text-[10px] tracking-widest uppercase transition-all duration-500 ${
                  active === i
                    ? "opacity-100 text-white translate-x-0"
                    : "opacity-0 group-hover:opacity-100 text-white/60 translate-x-2 group-hover:translate-x-0"
                }`}
              >
                {s.label}
              </span>
              <span
                className={`h-px transition-all duration-500 ${
                  active === i
                    ? "w-8 bg-[#00ffff] shadow-[0_0_8px_#00ffff]"
                    : "w-4 bg-white/20 group-hover:w-6 group-hover:bg-white/50"
                }`}
              />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
