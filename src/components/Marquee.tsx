const WORDS = [
  "OBSERVE",
  "RESEARCH",
  "UNDERSTAND",
  "DESIGN",
  "BUILD",
  "SHIP",
  "ITERATE",
  "REPEAT",
];

export function Marquee() {
  const line = WORDS.join("  ◇  ");
  return (
    <div
      className="relative py-10 border-y border-white/[0.06] overflow-hidden select-none"
      aria-hidden
    >
      <div
        className="flex gap-12 whitespace-nowrap font-display text-4xl md:text-6xl font-semibold tracking-tight text-transparent"
        style={{
          WebkitTextStroke: "1px rgba(255,255,255,0.18)",
          animation: "marquee 38s linear infinite",
        }}
      >
        <span>{line}</span>
        <span>{line}</span>
        <span>{line}</span>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  );
}
