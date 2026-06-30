import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Preloader } from "../components/Preloader";
import Grainient from "../components/Grainient";
import PixelCard from "../components/PixelCard";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

// --- UTILITIES ---

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const LeetcodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.939 5.939 0 0 0 1.271 1.543l3.995 3.739 6.212 5.714a1.374 1.374 0 0 0 2.008-.123l3.228-3.711a1.374 1.374 0 0 0-.141-1.92l-5.694-5.181a1.374 1.374 0 0 1 .04-2.02l5.59-4.811a1.374 1.374 0 0 0-.125-1.968l-3.116-2.617a1.374 1.374 0 0 0-1.916.143l-3.535 4.088a1.374 1.374 0 0 1-2.02.04l-1.375-1.272a1.374 1.374 0 0 1-.04-2.02l5.632-6.529a1.374 1.374 0 0 0-1.916-1.986zM5.484 15.36a1.374 1.374 0 0 1 0 1.942l-1.463 1.463a1.374 1.374 0 0 1-1.943-1.943l1.463-1.463a1.374 1.374 0 0 1 1.943 0z" />
  </svg>
);

function MagneticButton({ children, className, onClick, href, target, rel, 'aria-label': ariaLabel, ...rest }: any) {
  const ref = useRef<any>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<any>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const MotionComponent = href ? motion.a : motion.button;

  return (
    <MotionComponent
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      onClick={onClick}
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
}

function RevealText({ text, className }: { text: string, className?: string }) {
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 20, transition: { type: "spring" as const, damping: 12, stiffness: 100 } },
  };

  return (
    <motion.div
      className={`flex flex-wrap overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {text.split(" ").map((word, index) => (
        <span className="mr-3 inline-flex overflow-hidden" key={index}>
          {Array.from(word).map((letter, index) => (
            <motion.span variants={child} key={index} className="inline-block">
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
}

function FadeUp({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// --- COMPONENTS ---

function Navigation() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    return scrollY.on('change', y => setIsScrolled(y > 50));
  }, [scrollY]);

  return (
    <motion.nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-theme-bg/80 backdrop-blur-md border-b border-theme-border' : 'bg-transparent border-transparent'}`}>
      <div className="flex justify-between items-center px-gutter py-4 max-w-container-max mx-auto">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="font-bold text-headline-sm tracking-tighter text-theme-text flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-theme-accent-1 text-deep-navy flex items-center justify-center text-xs">JV</div>
          Justin Varghese
        </motion.div>
        <div className="hidden md:flex gap-8 items-center">
          {["Stack", "Projects", "Process", "Experience"].map((item, i) => (
            <motion.a key={item} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }} className="text-theme-text-muted font-body-md text-sm hover:text-theme-accent-1 transition-colors duration-300" href={`#${item.toLowerCase()}`}>
              {item}
            </motion.a>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <MagneticButton href="/resume.pdf" target="_blank" rel="noreferrer" aria-label="Open Resume" className="bg-theme-card/80 border border-theme-border text-theme-text px-5 py-2 rounded-full font-label-caps text-xs hover:bg-white hover:text-deep-navy transition-colors">
            Resume
          </MagneticButton>
        </motion.div>
      </div>
    </motion.nav>
  );
}

function GitHubWidget({ ghData }: { ghData: any }) {
  // Generate fake contribution grid for visuals
  const days = Array.from({ length: 119 }, () => Math.floor(Math.random() * 5));
  const colors = ["bg-surface-container-low/50", "bg-theme-mint/20", "bg-theme-mint/50", "bg-theme-mint/80", "bg-theme-mint"];

  const commitsCount = "340";
  
  return (
    <motion.div whileHover={{ y: -5, scale: 1.02 }} className="glass-card p-6 rounded-2xl border border-theme-border h-full flex flex-col justify-between hover:border-theme-mint/50 hover:shadow-[0_0_30px_color-mix(in_srgb,var(--theme-mint)_20%,transparent)] transition-all bg-theme-card backdrop-blur-md shadow-glass-extrusion relative overflow-hidden group">
      <div className="absolute -right-5 -bottom-5 text-[150px] opacity-5 pointer-events-none group-hover:text-theme-mint/10 transition-colors">
        <GithubIcon />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-4 text-theme-text-muted">
          <span className="material-symbols-outlined text-theme-mint text-sm">commit</span>
          <span className="font-label-caps tracking-widest uppercase text-xs">GitHub Activity</span>
        </div>
        <div className="font-bold text-3xl text-theme-text mb-6">{commitsCount} <span className="text-sm font-normal text-theme-text-muted block mt-1">Commits this year</span></div>
      </div>
      
      <div className="grid grid-cols-[repeat(17,minmax(0,1fr))] gap-1.5 opacity-80 z-10">
        {days.map((level, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 + (i * 0.005) }}
            className={`w-full aspect-square rounded-[2px] ${colors[level]}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

function LeetCodeWidget({ lcData }: { lcData: any }) {
  const totalSolved = lcData?.solvedProblem || 0;
  const easy = lcData?.easySolved || 0;
  const medium = lcData?.mediumSolved || 0;
  const hard = lcData?.hardSolved || 0;

  return (
    <motion.div whileHover={{ y: -5, scale: 1.02 }} className="glass-card p-6 rounded-2xl border border-theme-border h-full flex flex-col justify-between hover:border-theme-honey/50 hover:shadow-[0_0_30px_color-mix(in_srgb,var(--theme-honey)_20%,transparent)] transition-all bg-theme-card backdrop-blur-md shadow-glass-extrusion relative overflow-hidden group">
      <div className="absolute -right-5 -bottom-5 text-[150px] opacity-5 pointer-events-none group-hover:text-theme-honey/10 transition-colors">
        <LeetcodeIcon />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-4 text-theme-text-muted">
          <span className="material-symbols-outlined text-theme-honey text-sm">emoji_events</span>
          <span className="font-label-caps tracking-widest uppercase text-xs">Problem Solving</span>
        </div>
        <div className="font-bold text-3xl text-theme-text mb-6">{totalSolved || "..."} <span className="text-sm font-normal text-theme-text-muted block mt-1">DSA Problems Solved</span></div>
      </div>
      
      <div className="space-y-4 relative z-10">
        {[
          { label: "Easy", count: easy, color: "bg-theme-mint", percent: `${(easy / (totalSolved || 1)) * 100}%` },
          { label: "Medium", count: medium, color: "bg-theme-honey", percent: `${(medium / (totalSolved || 1)) * 100}%` },
          { label: "Hard", count: hard, color: "bg-theme-crimson", percent: `${(hard / (totalSolved || 1)) * 100}%` }
        ].map((stat, i) => (
          <div key={stat.label}>
            <div className="flex justify-between text-xs mb-1.5 text-theme-text/80 font-medium">
              <span>{stat.label}</span>
              <span className="text-theme-text">{stat.count || "..."}</span>
            </div>
            <div className="h-1.5 w-full bg-theme-border rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: stat.percent }}
                transition={{ duration: 1.5, delay: 1.2 + (i * 0.2), ease: "easeOut" }}
                className={`h-full ${stat.color}`} 
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function HeroDashboard({ ghData, lcData }: { ghData: any, lcData: any }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-16 overflow-hidden">
      <div className="relative z-10 w-full max-w-container-max mx-auto px-gutter">
        
        {/* Blueprint Hero Container */}
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 w-full max-w-6xl mx-auto glass-card p-6 md:p-12 rounded-[2rem] border border-theme-border relative overflow-hidden bg-theme-card/80 backdrop-blur-xl shadow-glass-extrusion group mb-8 md:mb-12">
          
          {/* Blueprint background grid */}
          <div className="absolute inset-0 opacity-10 pointer-events-none z-0" style={{ backgroundImage: "linear-gradient(var(--theme-border) 1px, transparent 1px), linear-gradient(90deg, var(--theme-border) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          
          {/* Left Panel: Portrait */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
            className="relative w-48 h-48 md:w-72 md:h-72 rounded-full border border-theme-border overflow-hidden shrink-0 shadow-[0_0_40px_rgba(255,255,255,0.05)] z-10 group-hover:border-theme-cerulean/50 transition-colors duration-500 bg-theme-bg"
          >
            <img src="/profile.png" alt="Justin Varghese" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            {/* Blueprint Reticles */}
            <div className="absolute top-0 left-1/2 w-px h-6 bg-theme-border -translate-x-1/2" />
            <div className="absolute bottom-0 left-1/2 w-px h-6 bg-theme-border -translate-x-1/2" />
            <div className="absolute left-0 top-1/2 h-px w-6 bg-theme-border -translate-y-1/2" />
            <div className="absolute right-0 top-1/2 h-px w-6 bg-theme-border -translate-y-1/2" />
          </motion.div>

          {/* Right Panel: Content */}
          <div className="flex flex-col flex-1 z-10 relative w-full">
            <motion.div 
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card bg-theme-bg/60 p-6 md:p-8 rounded-2xl border border-theme-border mb-8 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-card border border-theme-border text-xs text-theme-mint font-label-caps mb-6 uppercase tracking-widest w-max shadow-[0_0_15px_color-mix(in_srgb,var(--theme-mint)_20%,transparent)]">
                <span className="w-2 h-2 rounded-full bg-theme-mint animate-pulse"></span>
                Available for Hire
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-2 tracking-tight">Justin Varghese</h1>
              <h2 className="text-theme-cerulean text-lg md:text-2xl font-medium mb-6">System Architect & Software Developer</h2>
              <p className="text-theme-text-muted text-sm md:text-base leading-relaxed max-w-2xl">
                Computer Science student building real-time distributed systems, backend services, and AI-driven applications. Turning complex problems into scalable, production-ready software solutions.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row flex-wrap items-center gap-4"
            >
              <MagneticButton href="mailto:justinvcj@gmail.com" className="w-full sm:w-auto bg-theme-text text-theme-bg px-8 py-3.5 rounded-xl font-label-caps text-sm hover:bg-theme-cerulean hover:text-white transition-all shadow-[0_0_20px_color-mix(in_srgb,var(--theme-cerulean)_20%,transparent)] flex items-center justify-center gap-2 uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm">mail</span> Connect
              </MagneticButton>
              <MagneticButton href="/resume.pdf" target="_blank" rel="noreferrer" className="w-full sm:w-auto bg-transparent border border-theme-border text-white px-8 py-3.5 rounded-xl font-label-caps text-sm hover:bg-white hover:text-deep-navy transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
                <span className="material-symbols-outlined text-sm">description</span> Resume
              </MagneticButton>

              <div className="flex items-center gap-3 w-full sm:w-auto sm:ml-auto mt-4 sm:mt-0">
                <a href="https://github.com/Justinvcj" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl border border-theme-border flex items-center justify-center text-theme-text-muted hover:text-white hover:border-theme-cerulean transition-colors bg-theme-bg/50 backdrop-blur-sm">
                  <GithubIcon />
                </a>
                <a href="https://linkedin.com/in/justinvcj" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl border border-theme-border flex items-center justify-center text-theme-text-muted hover:text-white hover:border-theme-cerulean transition-colors bg-theme-bg/50 backdrop-blur-sm">
                  <LinkedinIcon />
                </a>
                <a href="https://leetcode.com/u/Justinvcj" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl border border-theme-border flex items-center justify-center text-theme-text-muted hover:text-white hover:border-theme-cerulean transition-colors bg-theme-bg/50 backdrop-blur-sm">
                  <LeetcodeIcon />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Widgets Row below the hero */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="h-full">
            <GitHubWidget ghData={ghData} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="h-full">
            <LeetCodeWidget lcData={lcData} />
          </motion.div>
        </div>

      </div>
    </section>
  );
}

function TechStack() {
  const rings = [
    { 
      radius: 120, speed: 20, items: ["React", "TypeScript", "Tailwind", "Framer Motion"], 
      borderClass: "border-theme-cerulean/30", textClass: "text-theme-cerulean", shadowVar: "--theme-cerulean"
    },
    { 
      radius: 200, speed: 25, reverse: true, items: ["Node.js", "Python", "Supabase", "PostgreSQL", "WebSockets"], 
      borderClass: "border-theme-honey/30", textClass: "text-theme-honey", shadowVar: "--theme-honey"
    },
    { 
      radius: 280, speed: 30, items: ["Git", "Docker", "LLMs", "Figma", "OSRM", "Vercel"], 
      borderClass: "border-theme-mint/30", textClass: "text-theme-mint", shadowVar: "--theme-mint"
    },
  ];

  return (
    <section id="stack" className="py-section-gap border-y border-theme-border relative z-10 overflow-hidden">
      <div className="max-w-container-max mx-auto px-gutter">
        <FadeUp className="mb-8 relative z-20 text-center md:text-left">
          <span className="text-theme-cerulean font-label-caps text-xs mb-2 block tracking-widest uppercase">Arsenal</span>
          <h2 className="text-3xl md:text-4xl font-bold text-theme-text">Technical Ecosystem</h2>
        </FadeUp>
        
        <div className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[600px] flex items-center justify-center scale-[0.55] sm:scale-75 md:scale-100 mt-10 md:mt-0">
          {/* Core Center */}
          <div className="absolute z-30 w-24 h-24 rounded-full border border-theme-crimson bg-theme-bg flex items-center justify-center shadow-[0_0_30px_color-mix(in_srgb,var(--theme-crimson)_40%,transparent)]">
            <span className="font-bold text-theme-crimson tracking-widest text-sm font-label-caps uppercase">Core</span>
            <div className="absolute inset-0 rounded-full border border-theme-crimson animate-ping opacity-20"></div>
          </div>

          {/* Orbits */}
          {rings.map((ring, i) => {
            return (
              <motion.div 
                key={i}
                className={`absolute rounded-full border border-dashed opacity-50 ${ring.borderClass}`}
                style={{ width: ring.radius * 2, height: ring.radius * 2 }}
                animate={{ rotate: ring.reverse ? -360 : 360 }}
                transition={{ duration: ring.speed, repeat: Infinity, ease: "linear" }}
              >
                {ring.items.map((item, j) => {
                  const angle = (j / ring.items.length) * Math.PI * 2;
                  const x = Math.cos(angle) * ring.radius;
                  const y = Math.sin(angle) * ring.radius;
                  return (
                    <motion.div
                      key={item}
                      className={`absolute whitespace-nowrap bg-theme-bg border ${ring.borderClass} px-4 py-2 rounded-full text-xs font-bold shadow-[0_0_15px_color-mix(in_srgb,var(${ring.shadowVar})_20%,transparent)] flex items-center justify-center ${ring.textClass}`}
                      style={{
                        left: "50%",
                        top: "50%",
                        marginLeft: -40,
                        marginTop: -16,
                        x,
                        y,
                      }}
                      animate={{ rotate: ring.reverse ? 360 : -360 }}
                      transition={{ duration: ring.speed, repeat: Infinity, ease: "linear" }}
                    >
                      {item}
                    </motion.div>
                  );
                })}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const projects = [
    {
      id: "equinox",
      title: "Equinox",
      tag: "Ride-Hailing Ecosystem",
      tech: ["Node.js", "WebSockets", "Supabase", "Flutter", "OSRM"],
      desc: "An Uber-like app built from scratch to show how to handle thousands of users without paying huge fees for maps. It seamlessly syncs the rider and driver's locations instantly.",
      icon: "local_taxi",
      fullDesc: "Apps like Uber spend millions on mapping services just to calculate routes and fares. Equinox proves you can build a massive ride-hailing platform for free by using open-source maps. It flawlessly connects riders and drivers in real-time, instantly calculating trip costs and keeping track of moving cars without ever lagging or dropping the connection.",
      githubUrl: "https://github.com/Justinvcj/Equinox-EcoSystem"
    },
    {
      id: "knowledge-engine",
      title: "Developer Knowledge Engine",
      tag: "AI & Data Pipeline",
      tech: ["Python", "LLMs", "NetworkX", "SQLite", "GitHub API"],
      desc: "An AI tool that reads thousands of pages of boring technical manuals and turns them into a beautiful, interactive visual map so developers can find answers instantly.",
      icon: "account_tree",
      fullDesc: "Software engineers waste countless hours reading endless pages of confusing manuals trying to figure out how different pieces of code fit together. This engine uses AI to read all those documents automatically. It then draws an interactive 'mind map' showing how every concept connects, turning hours of frustrating reading into seconds of simple visual exploration.",
      githubUrl: "https://github.com/Justinvcj/Developer-Knowledge-Engine"
    },
    {
      id: "reporoast",
      title: "RepoRoast",
      tag: "AI Code Review System",
      tech: ["React", "Node.js", "TypeScript", "Gemini API"],
      desc: "An AI-powered assistant that acts like a senior programmer. It instantly reads through a team's code to spot hidden bugs and security risks before they go live.",
      icon: "bug_report",
      fullDesc: "Checking other people's code for mistakes is slow and boring, and humans often miss subtle bugs that crash apps later. RepoRoast fixes this by acting as a tireless robotic engineer. It reads through entire codebases in seconds, understanding exactly what the code is trying to do, and points out security flaws and bad practices so teams can fix them immediately before users ever notice.",
      githubUrl: "https://github.com/Justinvcj/RepooRoast"
    },
    {
      id: "intent-pay",
      title: "Intent Pay",
      tag: "Expense Management App",
      tech: ["Kotlin", "Jetpack Compose", "Room DB"],
      desc: "A smart finance app that automatically tracks your spending. To stop impulse buying, it intentionally pauses for 5 seconds every time you try to open a payment app to make you think twice.",
      icon: "account_balance_wallet",
      fullDesc: "Most people fail at budgeting because typing out every single purchase is annoying, and apps make it way too easy to spend money instantly with one tap. Intent Pay solves both problems. It quietly reads your bank text messages to track your expenses automatically. But its best trick is psychology: whenever you try to open a payment app, Intent Pay jumps in and forces you to wait 5 seconds, giving you a crucial moment to realize you don't actually need to buy that item.",
      githubUrl: "https://github.com/Justinvcj/Intent_Pay"
    }
  ];

  return (
    <section id="projects" className="py-section-gap relative z-20">
      <div className="max-w-container-max mx-auto px-gutter relative">
        <FadeUp className="mb-16">
          <span className="text-theme-accent-1 font-label-caps text-xs mb-2 block tracking-widest uppercase">Showcase</span>
          <h2 className="text-3xl md:text-4xl font-bold text-theme-text">Engineering Projects</h2>
        </FadeUp>
        
        <div className="grid md:grid-cols-2 gap-8 relative z-10">
          {projects.map((p, i) => (
            <FadeUp delay={i * 0.1} key={p.id}>
              <motion.div 
                layoutId={`project-${p.id}`}
                onClick={() => setSelectedId(p.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedId(p.id);
                  }
                }}
                whileHover={{ scale: 1.02 }}
                className="group glass-card rounded-3xl border border-theme-border bg-theme-card backdrop-blur-md shadow-glass-extrusion p-8 md:p-10 hover:border-theme-honey/40 hover:bg-theme-card/80 transition-all duration-500 h-full flex flex-col cursor-pointer relative z-10"
              >
                <div className="flex justify-between items-start mb-6">
                  <motion.div layoutId={`icon-${p.id}`} className="w-14 h-14 rounded-2xl bg-surface-container-low flex items-center justify-center border border-theme-border group-hover:bg-theme-honey group-hover:border-theme-honey group-hover:text-theme-bg transition-colors duration-300">
                    <span className="material-symbols-outlined text-theme-text group-hover:text-theme-bg text-2xl">{p.icon}</span>
                  </motion.div>
                  <div className="w-10 h-10 rounded-full border border-theme-border flex items-center justify-center group-hover:bg-theme-text group-hover:text-theme-bg text-theme-text-muted transition-colors">
                    <span className="material-symbols-outlined text-sm">open_in_full</span>
                  </div>
                </div>
                
                <motion.h3 layoutId={`title-${p.id}`} className="text-2xl font-bold text-theme-text mb-2">{p.title}</motion.h3>
                <motion.div layoutId={`tag-${p.id}`} className="text-theme-honey text-sm font-bold mb-6">{p.tag}</motion.div>
                
                <motion.p layoutId={`desc-${p.id}`} className="text-theme-text-muted text-sm leading-relaxed mb-8 flex-grow">
                  {p.desc}
                </motion.p>
                
                <div className="flex flex-wrap gap-2 pt-6 border-t border-theme-border mt-auto">
                  {p.tech.map(t => (
                    <span key={t} className="text-xs font-label-caps uppercase tracking-wider text-theme-text/50 bg-theme-card px-2 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>

        <AnimatePresence>
          {selectedId && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="fixed inset-0 bg-theme-bg/80 backdrop-blur-md z-50 cursor-pointer"
              />
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 pointer-events-none">
                {projects.map((p) => 
                  p.id === selectedId && (
                    <motion.div
                      layoutId={`project-${p.id}`}
                      key={p.id}
                      className="glass-card rounded-[2rem] border border-theme-border bg-theme-bg/90 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_24px_64px_rgba(0,0,0,0.8)] p-8 md:p-12 w-full max-w-5xl max-h-[90vh] overflow-y-auto pointer-events-auto relative flex flex-col"
                    >
                      <div className="sticky top-0 w-full flex justify-end z-20 -mt-4 -mr-4 md:mt-0 md:mr-0 pointer-events-none pb-4 md:pb-0">
                        <button 
                          onClick={() => setSelectedId(null)}
                          className="w-10 h-10 rounded-full bg-theme-card/80 border border-theme-border flex items-center justify-center text-theme-text hover:bg-white hover:text-deep-navy transition-colors backdrop-blur-md shadow-lg pointer-events-auto md:absolute md:top-6 md:right-6"
                        >
                          <span className="material-symbols-outlined">close</span>
                        </button>
                      </div>

                      <div className="flex flex-col md:flex-row gap-8 md:gap-12 mt-4">
                        <div className="flex-1">
                          <motion.div layoutId={`icon-${p.id}`} className="w-20 h-20 rounded-3xl bg-theme-honey text-theme-bg flex items-center justify-center mb-8 shadow-[0_0_30px_color-mix(in_srgb,var(--theme-honey)_40%,transparent)]">
                            <span className="material-symbols-outlined text-theme-bg text-4xl">{p.icon}</span>
                          </motion.div>
                          <motion.h3 layoutId={`title-${p.id}`} className="text-4xl md:text-5xl font-bold text-theme-text mb-3 tracking-tight">{p.title}</motion.h3>
                          <motion.div layoutId={`tag-${p.id}`} className="text-theme-honey text-lg font-bold mb-8">{p.tag}</motion.div>
                          
                          <motion.p layoutId={`desc-${p.id}`} className="text-theme-text-muted text-lg leading-relaxed mb-8">
                            {p.fullDesc}
                          </motion.p>
                        </div>

                        <div className="w-full md:w-1/3 bg-theme-card rounded-3xl p-8 border border-theme-border h-fit">
                          <h4 className="text-theme-text font-bold mb-6 font-label-caps tracking-widest text-sm">Tech Stack</h4>
                          <div className="flex flex-col gap-3">
                            {p.tech.map(t => (
                              <div key={t} className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-theme-accent-1 shadow-[0_0_10px_color-mix(in_srgb,var(--theme-accent-1)_60%,transparent)]"></div>
                                <span className="text-theme-text-muted text-sm font-medium">{t}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-10 pt-8 border-t border-theme-border">
                              <MagneticButton href={p.githubUrl} target="_blank" rel="noreferrer" className="w-full bg-white text-deep-navy px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-theme-cerulean hover:text-white transition-all">
                                <span className="text-xl flex items-center justify-center"><GithubIcon /></span>
                                View Source
                              </MagneticButton>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    { num: "01", title: "Requirement Analysis", desc: "Understanding the core business problem and constraints before writing a single line of code." },
    { num: "02", title: "System Design", desc: "Architecting scalable backend structures, defining database schemas, and mapping out API contracts." },
    { num: "03", title: "Modular Development", desc: "Applying OOP principles and clean code practices to build robust, maintainable components." },
    { num: "04", title: "Testing & Deployment", desc: "Rigorous debugging, validation, and integrating real-world workflows to ensure production readiness." }
  ];

  return (
    <section id="process" className="py-section-gap border-y border-theme-border relative z-10">
      <div className="max-w-container-max mx-auto px-gutter">
        <FadeUp className="text-center mb-20">
          <span className="text-theme-accent-1 font-label-caps text-xs mb-2 block tracking-widest uppercase">Methodology</span>
          <h2 className="text-3xl md:text-4xl font-bold text-theme-text">How I Engineer Solutions</h2>
        </FadeUp>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-electric-blue/30 to-transparent z-0"></div>
          
          {steps.map((s, i) => (
            <FadeUp delay={i * 0.15} key={i} className="relative z-10">
              <div className="relative group p-6 rounded-2xl bg-theme-card backdrop-blur-md shadow-glass-extrusion border border-theme-border hover:border-theme-border hover:bg-theme-card/80 transition-all h-full">
                <div className="font-display-hero text-6xl md:text-7xl text-theme-text/5 absolute -top-8 -right-4 group-hover:text-theme-text group-hover:-translate-y-1 transition-all duration-500 pointer-events-none z-20">{s.num}</div>
                <h4 className="text-lg font-bold text-theme-text mb-3 relative z-10 mt-4">{s.title}</h4>
                <p className="text-theme-text-muted text-sm leading-relaxed relative z-10">{s.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-section-gap relative">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <div className="w-full h-full" style={{ background: "radial-gradient(circle at 70% 30%, #2D65FF, transparent 60%)" }}></div>
      </div>
      
      <div className="max-w-container-max mx-auto px-gutter relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          
          <div>
            <FadeUp className="mb-12">
              <span className="text-theme-accent-1 font-label-caps text-xs mb-2 block tracking-widest uppercase">Career</span>
              <h2 className="text-3xl md:text-4xl font-bold text-theme-text">Experience</h2>
            </FadeUp>
            
            <FadeUp delay={0.1}>
              <div className="relative pl-8 border-l border-theme-border">
                <div className="absolute w-4 h-4 rounded-full bg-theme-accent-1 -left-[8.5px] top-1 shadow-[0_0_10px_color-mix(in_srgb,var(--theme-accent-1)_80%,transparent)]"></div>
                <div className="text-sm text-theme-accent-1 font-bold mb-1">June 2025</div>
                <h3 className="text-xl font-bold text-theme-text mb-1">Software Development Intern</h3>
                <h4 className="text-theme-text-muted text-sm mb-4">Nxtlogic Software Solutions, Coimbatore</h4>
                <ul className="space-y-3 text-theme-text-muted text-sm">
                  <li className="flex gap-3"><span className="material-symbols-outlined text-theme-accent-2 text-[16px]">chevron_right</span> Assisted in integration of scalable RESTful backend APIs, improving data retrieval efficiency.</li>
                  <li className="flex gap-3"><span className="material-symbols-outlined text-theme-accent-2 text-[16px]">chevron_right</span> Collaborated on real-world workflows including requirement analysis, debugging, and testing.</li>
                  <li className="flex gap-3"><span className="material-symbols-outlined text-theme-accent-2 text-[16px]">chevron_right</span> Applied best practices including modular code design and Git version control.</li>
                </ul>
              </div>
            </FadeUp>
          </div>
          
          <div>
            <FadeUp className="mb-12">
              <span className="text-emerald-500 font-label-caps text-xs mb-2 block tracking-widest uppercase">Academic</span>
              <h2 className="text-3xl md:text-4xl font-bold text-theme-text">Education</h2>
            </FadeUp>
            
            <div className="space-y-10">
              <FadeUp delay={0.2}>
                <div className="relative pl-8 border-l border-theme-border">
                  <div className="absolute w-4 h-4 rounded-full bg-emerald-500 -left-[8.5px] top-1 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                  <div className="text-sm text-emerald-500 font-bold mb-1">Expected May 2026</div>
                  <h3 className="text-xl font-bold text-theme-text mb-1">B.E. Computer Science and Engineering</h3>
                  <h4 className="text-theme-text-muted text-sm mb-2">Dr. N.G.P Institute of Technology</h4>
                  <div className="inline-block px-3 py-1 rounded bg-theme-card text-theme-text/80 text-xs font-bold border border-theme-border">CGPA: 8.6</div>
                </div>
              </FadeUp>
              
              <FadeUp delay={0.3}>
                <div className="relative pl-8 border-l border-theme-border">
                  <div className="absolute w-3 h-3 rounded-full border-2 border-theme-border bg-background -left-[6.5px] top-1.5"></div>
                  <div className="text-sm text-theme-text-muted font-bold mb-1">March 2023</div>
                  <h3 className="text-lg font-bold text-theme-text mb-1">HSC (12th Grade)</h3>
                  <h4 className="text-theme-text-muted text-sm">Sacred Heart M.H.S.S | 83%</h4>
                </div>
              </FadeUp>
            </div>
            
          </div>
          
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "system", text: "Justin OS v1.0. Type 'help' for commands." }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: "user", text: `> ${input}` }];
    
    if (cmd === "help") {
      newHistory.push({ type: "system", text: "Available commands: help, contact, github, clear, ps, whoami, date, ls, pwd, sudo" });
    } else if (cmd === "contact") {
      newHistory.push({ type: "system", text: "Opening email client... (justinvcj@gmail.com)" });
      window.location.href = "mailto:justinvcj@gmail.com";
    } else if (cmd === "github") {
      newHistory.push({ type: "system", text: "Opening GitHub profile..." });
      window.open("https://github.com/Justinvcj", "_blank");
    } else if (cmd === "clear") {
      setHistory([{ type: "system", text: "Justin OS v1.0. Type 'help' for commands." }]);
      setInput("");
      return;
    } else if (cmd === "ps") {
      newHistory.push({ type: "system", text: "  PID TTY          TIME CMD\n    1 ?        00:00:02 init (justin-os)\n  402 ?        00:01:23 react-dom\n  503 ?        00:00:14 tailwindcss\n  892 ?        00:00:42 framer-motion\n 1337 ?        00:00:00 ps" });
    } else if (cmd === "whoami") {
      newHistory.push({ type: "system", text: "guest\n(But you're looking at Justin's portfolio)" });
    } else if (cmd === "date") {
      newHistory.push({ type: "system", text: new Date().toString() });
    } else if (cmd === "ls") {
      newHistory.push({ type: "system", text: "projects/\nresume.pdf\nskills.txt\nabout.md\ncontact.sh" });
    } else if (cmd === "pwd") {
      newHistory.push({ type: "system", text: "/home/guest/justin-os" });
    } else if (cmd.startsWith("sudo ")) {
      newHistory.push({ type: "error", text: "guest is not in the sudoers file. This incident will be reported." });
    } else if (cmd === "sudo") {
      newHistory.push({ type: "system", text: "usage: sudo command" });
    } else {
      newHistory.push({ type: "error", text: `Command not found: ${cmd}` });
    }
    
    setHistory(newHistory);
    setInput("");
    
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 10);
  };

  return (
    <footer className="text-theme-text pt-20 pb-12 border-t border-theme-border relative overflow-hidden z-10">
      <div className="max-w-container-max mx-auto px-gutter relative z-10">
        
        <section aria-label="Terminal" className="max-w-3xl mx-auto mb-20 focus-within:ring-2 focus-within:ring-theme-cerulean rounded-2xl transition-shadow">
          <FadeUp>
            <div className="glass-card rounded-2xl border border-theme-border bg-theme-bg/80 backdrop-blur-md overflow-hidden shadow-glass-extrusion">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-theme-border bg-theme-card">
                <div className="w-3 h-3 rounded-full bg-theme-crimson"></div>
                <div className="w-3 h-3 rounded-full bg-theme-honey"></div>
                <div className="w-3 h-3 rounded-full bg-theme-mint"></div>
                <div className="ml-2 text-xs font-mono text-theme-text-muted">guest@justin-os:~</div>
              </div>
              <div 
                className="p-6 font-mono text-sm min-h-[250px] max-h-[400px] overflow-y-auto flex flex-col cursor-text" 
                onClick={() => inputRef.current?.focus()}
              >
                {history.map((line, i) => (
                  <div key={i} className={`mb-2 whitespace-pre-wrap ${line.type === 'error' ? 'text-theme-crimson' : line.type === 'user' ? 'text-theme-text' : 'text-theme-mint'}`}>
                    {line.text}
                  </div>
                ))}
                <form onSubmit={handleCommand} className="flex items-center mt-2">
                  <span className="text-theme-cerulean mr-2">guest@justin-os:~$</span>
                  <input 
                    ref={inputRef}
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-theme-text border-none focus:ring-0 p-0"
                    autoComplete="off"
                    aria-label="Terminal Input"
                  />
                </form>
              </div>
            </div>
          </FadeUp>
        </section>
        
        <div className="border-t border-theme-border pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-bold text-lg text-theme-text tracking-tighter flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-theme-accent-1 text-deep-navy flex items-center justify-center text-[10px]">JV</div>
            Justin Varghese
          </div>
          <div className="text-theme-text-muted text-xs font-medium">
            © {new Date().getFullYear()} Engineered by Justin Varghese.
          </div>
          <div className="flex gap-4">
            <a aria-label="GitHub Profile" className="text-theme-text-muted hover:text-theme-text transition-colors" href="https://github.com/Justinvcj" target="_blank" rel="noreferrer">
              <span className="material-symbols-outlined text-lg">code</span>
            </a>
            <a aria-label="LinkedIn Profile" className="text-theme-text-muted hover:text-theme-text transition-colors" href="https://linkedin.com/in/justinvcj" target="_blank" rel="noreferrer">
              <span className="material-symbols-outlined text-lg">work</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}



function Portfolio() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [ghData, setGhData] = useState<any>(null);
  const [lcData, setLcData] = useState<any>(null);

  useEffect(() => {
    // Ensure the page always starts at the top
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    Promise.all([
      fetch("https://api.github.com/users/Justinvcj").then(r => r.json()).catch(() => ({})),
      fetch("https://alfa-leetcode-api.onrender.com/Justinvcj/solved").then(r => r.json()).catch(() => ({}))
    ]).then(([gh, lc]) => {
      setGhData(gh);
      setLcData(lc);
      setIsLoaded(true);
    });
  }, []);

  return (
    <div className="bg-theme-bg text-theme-text font-body-md selection:bg-theme-cerulean selection:text-white overflow-x-hidden min-h-screen relative transition-colors duration-500">
      
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <Grainient color1="#171723" color2="#3b82f6" color3="#ef4444" blendSoftness={0.4} noiseScale={2.0} />
      </div>

      <div className="relative z-10">
        <Preloader isLoaded={isLoaded} />
        <Navigation />
        <main>
          <HeroDashboard ghData={ghData} lcData={lcData} />
          <TechStack />
          <Projects />
          <Process />
          <Experience />
        </main>
        <Footer />
      </div>
    </div>
  );
}
