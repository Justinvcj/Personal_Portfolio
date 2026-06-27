import { useRef, type AnchorHTMLAttributes, type ReactNode } from "react";

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  strength?: number;
}

export function MagneticButton({
  children,
  href,
  variant = "primary",
  strength = 18,
  className = "",
  ...rest
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${(x / r.width) * strength}px, ${(y / r.height) * strength}px)`;
    inner.style.transform = `translate(${(x / r.width) * (strength * 0.4)}px, ${(y / r.height) * (strength * 0.4)}px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    const inner = innerRef.current;
    if (el) el.style.transform = "";
    if (inner) inner.style.transform = "";
  };

  const base =
    "group relative inline-flex items-center justify-center px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-[box-shadow,border-color,background-color,color] duration-500 will-change-transform";
  const styles =
    variant === "primary"
      ? "text-black border border-white bg-white hover:bg-white/90 hover:scale-[1.02] hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.4)]"
      : "text-white/80 border border-white/10 bg-white/5 hover:bg-[var(--surface-hover)] hover:border-white/20 hover:text-white hover:shadow-2xl";

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${base} ${styles} ${className}`}
      style={{ transition: "transform 0.45s var(--ease-out-bento), box-shadow 0.5s, border-color 0.5s, background-color 0.5s, color 0.5s" }}
      {...(rest as any)}
    >
      <span ref={innerRef} className="relative z-10 inline-flex items-center gap-2" style={{ transition: "transform 0.45s var(--ease-out-bento)" }}>
        {children}
      </span>
    </a>
  );
}
