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

function MagneticButton({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
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
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
    hidden: { opacity: 0, y: 20, transition: { type: "spring", damping: 12, stiffness: 100 } },
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
    <motion.nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-theme-bg/80 backdrop-blur-xl border-b border-theme-border' : 'bg-transparent border-transparent'}`}>
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
          <a href="/resume.pdf" target="_blank" rel="noreferrer" aria-label="Open Resume">
            <MagneticButton className="bg-theme-card/80 border border-theme-border text-theme-text px-5 py-2 rounded-full font-label-caps text-xs hover:bg-white hover:text-deep-navy transition-colors">
              Resume
            </MagneticButton>
          </a>
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
    <motion.div whileHover={{ y: -5, scale: 1.02 }} className="glass-card p-6 rounded-2xl border border-theme-border h-full flex flex-col justify-between hover:border-theme-mint/50 hover:shadow-[0_0_30px_color-mix(in_srgb,var(--theme-mint)_20%,transparent)] transition-all bg-theme-card backdrop-blur-2xl shadow-glass-extrusion relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none group-hover:text-theme-mint transition-colors">
        <span className="material-symbols-outlined text-8xl">terminal</span>
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
    <motion.div whileHover={{ y: -5, scale: 1.02 }} className="glass-card p-6 rounded-2xl border border-theme-border h-full flex flex-col justify-between hover:border-theme-honey/50 hover:shadow-[0_0_30px_color-mix(in_srgb,var(--theme-honey)_20%,transparent)] transition-all bg-theme-card backdrop-blur-2xl shadow-glass-extrusion relative overflow-hidden group">
      <div className="absolute -right-5 -bottom-5 text-[150px] text-theme-honey/5 group-hover:text-theme-honey/10 transition-colors material-symbols-outlined pointer-events-none">code_blocks</div>
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px] md:auto-rows-[300px]">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="md:col-span-8 md:row-span-2 glass-card border border-theme-border rounded-[2rem] p-8 md:p-12 bg-theme-card backdrop-blur-xl shadow-glass-extrusion flex flex-col justify-center relative overflow-hidden group hover:border-theme-cerulean/30 transition-colors duration-500"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-theme-cerulean via-theme-mint to-theme-honey opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-card border border-theme-border text-xs text-theme-mint font-label-caps mb-6 uppercase tracking-widest w-max shadow-[0_0_15px_color-mix(in_srgb,var(--theme-mint)_20%,transparent)]">
              <span className="w-2 h-2 rounded-full bg-theme-mint animate-pulse"></span>
              Available for Hire
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-theme-text mb-4 tracking-tight">Justin Varghese</h1>
            <h2 className="text-xl md:text-3xl text-theme-text-muted font-medium mb-8">System Architect & Software Developer</h2>
            <p className="text-theme-text/70 leading-relaxed max-w-xl text-base md:text-lg">
              Computer Science student building real-time distributed systems, backend services, and AI-driven applications. Turning complex problems into scalable, production-ready software solutions.
            </p>
          </motion.div>

          <div className="md:col-span-4 row-span-2 flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-[2rem] overflow-hidden relative shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-theme-border group flex-[1.6]"
            >
              <img src="/profile.png" alt="Profile" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card border border-theme-border rounded-[2rem] p-6 lg:p-8 bg-theme-card backdrop-blur-xl shadow-glass-extrusion flex flex-col items-center justify-center hover:border-theme-crimson/30 transition-colors flex-[1]"
            >
               <div className="flex flex-col items-center justify-center gap-6 w-full h-full">
                <a href="mailto:justinvcj@gmail.com" className="w-full">
                  <MagneticButton className="w-full bg-theme-text text-theme-bg px-8 py-4 rounded-full font-label-caps text-sm hover:bg-theme-crimson hover:text-white shadow-[0_0_20px_color-mix(in_srgb,var(--theme-crimson)_30%,transparent)] transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-sm">mail</span> Contact
                  </MagneticButton>
                </a>
                <div className="flex gap-4 justify-center w-full">
                  {[
                    { icon: "code", link: "github.com/Justinvcj" },
                    { icon: "work", link: "linkedin.com/in/justinvcj" },
                    { icon: "terminal", link: "leetcode.com/u/Justinvcj" }
                  ].map((social, i) => (
                    <motion.a 
                      key={i}
                      whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.2)" }}
                      className="w-14 h-14 rounded-full border border-theme-border flex items-center justify-center text-theme-text/90 hover:text-theme-text transition-colors bg-theme-card/80"
                      href={`https://${social.link}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="material-symbols-outlined text-lg">{social.icon}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-6 h-full"
          >
            <GitHubWidget ghData={ghData} />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-6 h-full"
          >
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
        
        <div className="relative w-full max-w-4xl mx-auto h-[600px] flex items-center justify-center scale-75 md:scale-100 mt-10 md:mt-0">
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
      desc: "Event-driven backend utilizing Node.js and WebSockets for instantaneous, bidirectional communication. Integrated OSRM routing engine to bypass paid API dependencies and developed a dynamic fare calculation engine.",
      icon: "local_taxi",
      fullDesc: "Equinox is a fully functional ride-hailing ecosystem built to demonstrate extreme scalability. The backend uses Node.js with WebSockets for real-time location streaming and dispatching. By integrating the open-source OSRM routing engine, it calculates complex ETAs and fares entirely independently of paid APIs. The driver and rider clients were built in Flutter for a unified cross-platform experience.",
      githubUrl: "https://github.com/Justinvcj/Equinox-EcoSystem"
    },
    {
      id: "knowledge-engine",
      title: "Developer Knowledge Engine",
      tag: "AI & Data Pipeline",
      tech: ["Python", "LLMs", "NetworkX", "SQLite", "GitHub API"],
      desc: "Engineered an ETL pipeline to scrape and standardize documentation. Leveraged OpenAI LLMs to extract technical entities and built an interactive, localized knowledge graph using NetworkX.",
      icon: "account_tree",
      fullDesc: "This knowledge engine operates by scraping disparate developer documentation sources, structuring the data via an ETL pipeline in Python, and passing it through an LLM to extract semantic technical entities (APIs, paradigms, libraries). These nodes are then mapped into a localized graph database using NetworkX and SQLite, allowing developers to query relationship webs rather than linear text.",
      githubUrl: "https://github.com/Justinvcj/Developer-Knowledge-Engine"
    },
    {
      id: "reporoast",
      title: "RepoRoast",
      tag: "AI Code Review System",
      tech: ["React", "Node.js", "TypeScript", "Gemini API"],
      desc: "Full-stack code analysis platform utilizing React and Node.js. Integrated the Gemini API as an automated code reviewer with a sophisticated multi-file parsing system and token optimization.",
      icon: "bug_report",
      fullDesc: "RepoRoast parses GitHub repositories through the GitHub API, intelligently chunks and optimizes the AST payload, and streams it to the Gemini API for deep-context code review. It identifies anti-patterns, security flaws, and performance bottlenecks, presenting the findings in a highly interactive, split-pane React dashboard.",
      githubUrl: "https://github.com/Justinvcj/RepooRoast"
    },
    {
      id: "intent-pay",
      title: "Intent Pay",
      tag: "Expense Management App",
      tech: ["Kotlin", "Jetpack Compose", "Room DB"],
      desc: "Native offline Android app that interprets incoming bank SMS alerts via Broadcast Receivers. Implemented a local rule-based classification engine and a unique 'Reflection' overlay to prevent impulse spending.",
      icon: "account_balance_wallet",
      fullDesc: "Intent Pay solves the problem of manual expense tracking by automatically reading bank SMS alerts using Android Broadcast Receivers. Built fully natively with Kotlin and Jetpack Compose, it features a unique psychological 'Reflection' overlay that triggers before registered payment apps are launched, forcing a 5-second cooldown to reduce impulse spending.",
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
                className="group glass-card rounded-3xl border border-theme-border bg-theme-card backdrop-blur-xl shadow-glass-extrusion p-8 md:p-10 hover:border-theme-honey/40 hover:bg-theme-card/80 transition-all duration-500 h-full flex flex-col cursor-pointer relative z-10"
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
                      className="glass-card rounded-[2rem] border border-theme-border bg-theme-bg/90 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_24px_64px_rgba(0,0,0,0.8)] p-8 md:p-12 w-full max-w-5xl max-h-[90vh] overflow-y-auto pointer-events-auto relative flex flex-col"
                    >
                      <button 
                        onClick={() => setSelectedId(null)}
                        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-theme-card/80 flex items-center justify-center text-theme-text hover:bg-white hover:text-deep-navy transition-colors z-10"
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>

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
                            <a href={p.githubUrl} target="_blank" rel="noreferrer" className="block w-full">
                              <MagneticButton className="w-full bg-white text-deep-navy px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-theme-cerulean hover:text-white transition-all">
                                <span className="material-symbols-outlined text-xl">github</span>
                                View Source
                              </MagneticButton>
                            </a>
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
              <div className="relative group p-6 rounded-2xl bg-theme-card backdrop-blur-xl shadow-glass-extrusion border border-theme-border hover:border-theme-border hover:bg-theme-card/80 transition-all h-full">
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
            <div className="glass-card rounded-2xl border border-theme-border bg-theme-bg/80 backdrop-blur-xl overflow-hidden shadow-glass-extrusion">
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
