import { Reveal } from "./Reveal";
import { MagneticButton } from "./MagneticButton";

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-32">
      <div className="w-full">
        <Reveal>
          <div className="bg-[var(--surface)] border border-white/5 rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden flex flex-col items-center text-center shadow-2xl group">
            {/* Subtle glow background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-bento-yellow)] opacity-5 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-bento-purple)] opacity-5 rounded-full blur-[80px] pointer-events-none -translate-x-1/2 translate-y-1/2 group-hover:scale-110 transition-transform duration-1000" />
            
            <div className="font-sans text-[10px] font-bold tracking-widest text-white/50 uppercase mb-6 relative z-10">
              Next Steps
            </div>
            
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white mb-10 relative z-10 leading-[0.9]">
              Let's Build <br />
              <span className="text-white/40">Something Great.</span>
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <MagneticButton href="mailto:inquiry@justin.design" variant="primary">
                Start a Conversation
              </MagneticButton>
              <MagneticButton href="https://linkedin.com" variant="ghost" target="_blank" rel="noreferrer">
                LinkedIn
              </MagneticButton>
              <MagneticButton href="https://github.com" variant="ghost" target="_blank" rel="noreferrer">
                GitHub
              </MagneticButton>
            </div>
          </div>
        </Reveal>

        <footer className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30 font-sans px-8">
          <div>© {new Date().getFullYear()} Justin Varghese</div>
          <div className="tracking-widest uppercase font-semibold">Engineered to Perfection.</div>
        </footer>
      </div>
    </section>
  );
}
