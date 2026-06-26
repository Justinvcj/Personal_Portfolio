import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = isMobile ? 14000 : 9000;
      const count = Math.min(110, Math.max(28, Math.floor((width * height) / density)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 1.2 + 0.4,
      }));
    };

    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const onLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const scrollShift = (scrollRef.current * 0.02) % height;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // update + draw nodes
      for (const n of nodes) {
        if (!reduce) {
          n.x += n.vx;
          n.y += n.vy + Math.sin((n.x + scrollShift) * 0.003) * 0.05;
        }
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;

        // mouse attraction
        const dx = mx - n.x;
        const dy = my - n.y;
        const md2 = dx * dx + dy * dy;
        if (md2 < 30000) {
          const f = (1 - md2 / 30000) * 0.4;
          n.x += (dx / Math.sqrt(md2 + 1)) * f;
          n.y += (dy / Math.sqrt(md2 + 1)) * f;
        }
      }

      // connections
      const maxDist = isMobile ? 110 : 150;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxDist * maxDist) {
            const d = Math.sqrt(d2);
            const alpha = (1 - d / maxDist) * 0.22;
            // mouse proximity boost
            const cx = (a.x + b.x) / 2;
            const cy = (a.y + b.y) / 2;
            const mdx = cx - mx;
            const mdy = cy - my;
            const mD2 = mdx * mdx + mdy * mdy;
            const boost = mD2 < 40000 ? (1 - mD2 / 40000) * 0.6 : 0;
            ctx.strokeStyle = `rgba(0, 174, 239, ${alpha + boost * 0.4})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        const dx = mx - n.x;
        const dy = my - n.y;
        const d2 = dx * dx + dy * dy;
        const near = d2 < 30000 ? 1 - d2 / 30000 : 0;
        const color = near > 0.3 ? "rgba(0, 255, 255, " : "rgba(122, 92, 255, ";
        ctx.fillStyle = `${color}${0.4 + near * 0.5})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + near * 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 10%, rgba(0,174,239,0.10), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(122,92,255,0.10), transparent 55%), #050505",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(5,5,5,0.6) 100%)",
        }}
      />
    </div>
  );
}
