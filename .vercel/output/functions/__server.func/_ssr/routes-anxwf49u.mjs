import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as motion, r as AnimatePresence, t as useScroll } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-anxwf49u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Preloader({ isLoaded }) {
	const [stage, setStage] = (0, import_react.useState)("loading");
	(0, import_react.useEffect)(() => {
		if (isLoaded && stage === "loading") {
			setStage("slicing");
			setTimeout(() => {
				setStage("zooming");
				setTimeout(() => {
					setStage("done");
				}, 1e3);
			}, 800);
		}
	}, [isLoaded, stage]);
	if (stage === "done") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: stage !== "zooming" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "fixed inset-0 z-[9999] bg-[#010203] flex items-center justify-center overflow-hidden",
		initial: {
			opacity: 1,
			scale: 1
		},
		exit: {
			opacity: 0,
			scale: 2,
			filter: "blur(20px)"
		},
		transition: {
			duration: 1,
			ease: [
				.76,
				0,
				.24,
				1
			]
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative font-display-hero text-8xl md:text-9xl font-bold tracking-tighter text-white",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						y: 50,
						opacity: 0
					},
					animate: stage === "loading" ? {
						y: 0,
						opacity: 1
					} : {
						y: "-100%",
						x: -50,
						opacity: 0,
						rotate: -10
					},
					transition: {
						duration: .8,
						ease: [
							.76,
							0,
							.24,
							1
						]
					},
					style: { clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" },
					className: "absolute inset-0",
					children: "JV"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						y: -50,
						opacity: 0
					},
					animate: stage === "loading" ? {
						y: 0,
						opacity: 1
					} : {
						y: "100%",
						x: 50,
						opacity: 0,
						rotate: 10
					},
					transition: {
						duration: .8,
						ease: [
							.76,
							0,
							.24,
							1
						]
					},
					style: { clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" },
					children: "JV"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						scaleX: 0,
						opacity: 0
					},
					animate: stage === "slicing" ? {
						scaleX: 1.5,
						opacity: [
							0,
							1,
							0
						]
					} : {
						scaleX: 0,
						opacity: 0
					},
					transition: { duration: .6 },
					className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-electric-blue shadow-[0_0_20px_#2D65FF] z-10"
				})
			]
		})
	}, "preloader") });
}
var Grainient = ({ color1 = "#171723", color2 = "#3b82f6", color3 = "#ef4444", className = "" }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `grainient-container ${className}`.trim(),
		style: {
			"--color1": color1,
			"--color2": color2,
			"--color3": color3
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grainient-blob" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grainient-noise" })]
	});
};
function MagneticButton({ children, className, onClick }) {
	const ref = (0, import_react.useRef)(null);
	const [position, setPosition] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const handleMouse = (e) => {
		const { clientX, clientY } = e;
		const { height, width, left, top } = ref.current.getBoundingClientRect();
		const middleX = clientX - (left + width / 2);
		const middleY = clientY - (top + height / 2);
		setPosition({
			x: middleX * .15,
			y: middleY * .15
		});
	};
	const reset = () => setPosition({
		x: 0,
		y: 0
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
		ref,
		onMouseMove: handleMouse,
		onMouseLeave: reset,
		animate: {
			x: position.x,
			y: position.y
		},
		transition: {
			type: "spring",
			stiffness: 150,
			damping: 15,
			mass: .1
		},
		className,
		onClick,
		children
	});
}
function FadeUp({ children, className, delay = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: 30
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-50px"
		},
		transition: {
			duration: .7,
			ease: [
				.21,
				.47,
				.32,
				.98
			],
			delay
		},
		className,
		children
	});
}
function Navigation() {
	const { scrollY } = useScroll();
	const [isScrolled, setIsScrolled] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		return scrollY.on("change", (y) => setIsScrolled(y > 50));
	}, [scrollY]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.nav, {
		className: `fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-theme-bg/80 backdrop-blur-xl border-b border-theme-border" : "bg-transparent border-transparent"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex justify-between items-center px-gutter py-4 max-w-container-max mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						x: -20
					},
					animate: {
						opacity: 1,
						x: 0
					},
					transition: { duration: .6 },
					className: "font-bold text-headline-sm tracking-tighter text-theme-text flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-8 h-8 rounded-full bg-theme-accent-1 text-deep-navy flex items-center justify-center text-xs",
						children: "JV"
					}), "Justin Varghese"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden md:flex gap-8 items-center",
					children: [
						"Stack",
						"Projects",
						"Process",
						"Experience"
					].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.a, {
						initial: {
							opacity: 0,
							y: -10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .6,
							delay: .1 + i * .1
						},
						className: "text-theme-text-muted font-body-md text-sm hover:text-theme-accent-1 transition-colors duration-300",
						href: `#${item.toLowerCase()}`,
						children: item
					}, item))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						x: 20
					},
					animate: {
						opacity: 1,
						x: 0
					},
					transition: { duration: .6 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/resume.pdf",
						target: "_blank",
						rel: "noreferrer",
						"aria-label": "Open Resume",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MagneticButton, {
							className: "bg-theme-card/80 border border-theme-border text-theme-text px-5 py-2 rounded-full font-label-caps text-xs hover:bg-white hover:text-deep-navy transition-colors",
							children: "Resume"
						})
					})
				})
			]
		})
	});
}
function GitHubWidget({ ghData }) {
	const days = Array.from({ length: 119 }, () => Math.floor(Math.random() * 5));
	const colors = [
		"bg-surface-container-low/50",
		"bg-theme-mint/20",
		"bg-theme-mint/50",
		"bg-theme-mint/80",
		"bg-theme-mint"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		whileHover: {
			y: -5,
			scale: 1.02
		},
		className: "glass-card p-6 rounded-2xl border border-theme-border h-full flex flex-col justify-between hover:border-theme-mint/50 hover:shadow-[0_0_30px_color-mix(in_srgb,var(--theme-mint)_20%,transparent)] transition-all bg-theme-card backdrop-blur-2xl shadow-glass-extrusion relative overflow-hidden group",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-0 right-0 p-4 opacity-10 pointer-events-none group-hover:text-theme-mint transition-colors",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "material-symbols-outlined text-8xl",
					children: "terminal"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 mb-4 text-theme-text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "material-symbols-outlined text-theme-mint text-sm",
					children: "commit"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-label-caps tracking-widest uppercase text-xs",
					children: "GitHub Activity"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "font-bold text-3xl text-theme-text mb-6",
				children: [
					"340",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-normal text-theme-text-muted block mt-1",
						children: "Commits this year"
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-[repeat(17,minmax(0,1fr))] gap-1.5 opacity-80 z-10",
				children: days.map((level, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						scale: 0
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					transition: { delay: 1 + i * .005 },
					className: `w-full aspect-square rounded-[2px] ${colors[level]}`
				}, i))
			})
		]
	});
}
function LeetCodeWidget({ lcData }) {
	const totalSolved = lcData?.solvedProblem || 0;
	const easy = lcData?.easySolved || 0;
	const medium = lcData?.mediumSolved || 0;
	const hard = lcData?.hardSolved || 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		whileHover: {
			y: -5,
			scale: 1.02
		},
		className: "glass-card p-6 rounded-2xl border border-theme-border h-full flex flex-col justify-between hover:border-theme-honey/50 hover:shadow-[0_0_30px_color-mix(in_srgb,var(--theme-honey)_20%,transparent)] transition-all bg-theme-card backdrop-blur-2xl shadow-glass-extrusion relative overflow-hidden group",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute -right-5 -bottom-5 text-[150px] text-theme-honey/5 group-hover:text-theme-honey/10 transition-colors material-symbols-outlined pointer-events-none",
				children: "code_blocks"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 mb-4 text-theme-text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "material-symbols-outlined text-theme-honey text-sm",
					children: "emoji_events"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-label-caps tracking-widest uppercase text-xs",
					children: "Problem Solving"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "font-bold text-3xl text-theme-text mb-6",
				children: [
					totalSolved || "...",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-normal text-theme-text-muted block mt-1",
						children: "DSA Problems Solved"
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4 relative z-10",
				children: [
					{
						label: "Easy",
						count: easy,
						color: "bg-theme-mint",
						percent: `${easy / (totalSolved || 1) * 100}%`
					},
					{
						label: "Medium",
						count: medium,
						color: "bg-theme-honey",
						percent: `${medium / (totalSolved || 1) * 100}%`
					},
					{
						label: "Hard",
						count: hard,
						color: "bg-theme-crimson",
						percent: `${hard / (totalSolved || 1) * 100}%`
					}
				].map((stat, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between text-xs mb-1.5 text-theme-text/80 font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: stat.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-theme-text",
						children: stat.count || "..."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1.5 w-full bg-theme-border rounded-full overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: { width: 0 },
						animate: { width: stat.percent },
						transition: {
							duration: 1.5,
							delay: 1.2 + i * .2,
							ease: "easeOut"
						},
						className: `h-full ${stat.color}`
					})
				})] }, stat.label))
			})
		]
	});
}
function HeroDashboard({ ghData, lcData }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "relative min-h-screen flex items-center justify-center pt-32 pb-16 overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative z-10 w-full max-w-container-max mx-auto px-gutter",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[280px] md:auto-rows-[300px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 30
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { duration: .6 },
						className: "md:col-span-8 md:row-span-2 glass-card border border-theme-border rounded-[2rem] p-6 sm:p-8 md:p-12 bg-theme-card backdrop-blur-xl shadow-glass-extrusion flex flex-col justify-center relative overflow-hidden group hover:border-theme-cerulean/30 transition-colors duration-500",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-theme-cerulean via-theme-mint to-theme-honey opacity-50 group-hover:opacity-100 transition-opacity" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-card border border-theme-border text-xs text-theme-mint font-label-caps mb-6 uppercase tracking-widest w-max shadow-[0_0_15px_color-mix(in_srgb,var(--theme-mint)_20%,transparent)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-theme-mint animate-pulse" }), "Available for Hire"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-theme-text mb-4 tracking-tight",
								children: "Justin Varghese"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg sm:text-xl md:text-3xl text-theme-text-muted font-medium mb-8",
								children: "System Architect & Software Developer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-theme-text/70 leading-relaxed max-w-xl text-sm sm:text-base md:text-lg",
								children: "Computer Science student building real-time distributed systems, backend services, and AI-driven applications. Turning complex problems into scalable, production-ready software solutions."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-4 row-span-2 flex flex-col gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								x: 30
							},
							animate: {
								opacity: 1,
								x: 0
							},
							transition: {
								duration: .6,
								delay: .1
							},
							className: "rounded-[2rem] overflow-hidden relative shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-theme-border group flex-[1.6]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/profile.png",
								alt: "Profile",
								className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								x: 30
							},
							animate: {
								opacity: 1,
								x: 0
							},
							transition: {
								duration: .6,
								delay: .2
							},
							className: "glass-card border border-theme-border rounded-[2rem] p-6 lg:p-8 bg-theme-card backdrop-blur-xl shadow-glass-extrusion flex flex-col items-center justify-center hover:border-theme-crimson/30 transition-colors flex-[1]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center justify-center gap-6 w-full h-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "mailto:justinvcj@gmail.com",
									className: "w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
										className: "w-full bg-theme-text text-theme-bg px-8 py-4 rounded-full font-label-caps text-sm hover:bg-theme-crimson hover:text-white shadow-[0_0_20px_color-mix(in_srgb,var(--theme-crimson)_30%,transparent)] transition-all flex items-center justify-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "material-symbols-outlined text-sm",
											children: "mail"
										}), " Contact"]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-4 justify-center w-full",
									children: [
										{
											icon: "code",
											link: "github.com/Justinvcj"
										},
										{
											icon: "work",
											link: "linkedin.com/in/justinvcj"
										},
										{
											icon: "terminal",
											link: "leetcode.com/u/Justinvcj"
										}
									].map((social, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.a, {
										whileHover: {
											y: -5,
											backgroundColor: "rgba(255,255,255,0.2)"
										},
										className: "w-14 h-14 rounded-full border border-theme-border flex items-center justify-center text-theme-text/90 hover:text-theme-text transition-colors bg-theme-card/80",
										href: `https://${social.link}`,
										target: "_blank",
										rel: "noreferrer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "material-symbols-outlined text-lg",
											children: social.icon
										})
									}, i))
								})]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 30
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .6,
							delay: .3
						},
						className: "md:col-span-6 h-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitHubWidget, { ghData })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: {
							opacity: 0,
							y: 30
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .6,
							delay: .4
						},
						className: "md:col-span-6 h-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeetCodeWidget, { lcData })
					})
				]
			})
		})
	});
}
function TechStack() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "stack",
		className: "py-section-gap border-y border-theme-border relative z-10 overflow-hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-container-max mx-auto px-gutter",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FadeUp, {
				className: "mb-8 relative z-20 text-center md:text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-theme-cerulean font-label-caps text-xs mb-2 block tracking-widest uppercase",
					children: "Arsenal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl md:text-4xl font-bold text-theme-text",
					children: "Technical Ecosystem"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-full max-w-4xl mx-auto h-[400px] md:h-[600px] flex items-center justify-center scale-[0.55] sm:scale-75 md:scale-100 mt-10 md:mt-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute z-30 w-24 h-24 rounded-full border border-theme-crimson bg-theme-bg flex items-center justify-center shadow-[0_0_30px_color-mix(in_srgb,var(--theme-crimson)_40%,transparent)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-theme-crimson tracking-widest text-sm font-label-caps uppercase",
						children: "Core"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 rounded-full border border-theme-crimson animate-ping opacity-20" })]
				}), [
					{
						radius: 120,
						speed: 20,
						items: [
							"React",
							"TypeScript",
							"Tailwind",
							"Framer Motion"
						],
						borderClass: "border-theme-cerulean/30",
						textClass: "text-theme-cerulean",
						shadowVar: "--theme-cerulean"
					},
					{
						radius: 200,
						speed: 25,
						reverse: true,
						items: [
							"Node.js",
							"Python",
							"Supabase",
							"PostgreSQL",
							"WebSockets"
						],
						borderClass: "border-theme-honey/30",
						textClass: "text-theme-honey",
						shadowVar: "--theme-honey"
					},
					{
						radius: 280,
						speed: 30,
						items: [
							"Git",
							"Docker",
							"LLMs",
							"Figma",
							"OSRM",
							"Vercel"
						],
						borderClass: "border-theme-mint/30",
						textClass: "text-theme-mint",
						shadowVar: "--theme-mint"
					}
				].map((ring, i) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: `absolute rounded-full border border-dashed opacity-50 ${ring.borderClass}`,
						style: {
							width: ring.radius * 2,
							height: ring.radius * 2
						},
						animate: { rotate: ring.reverse ? -360 : 360 },
						transition: {
							duration: ring.speed,
							repeat: Infinity,
							ease: "linear"
						},
						children: ring.items.map((item, j) => {
							const angle = j / ring.items.length * Math.PI * 2;
							const x = Math.cos(angle) * ring.radius;
							const y = Math.sin(angle) * ring.radius;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								className: `absolute whitespace-nowrap bg-theme-bg border ${ring.borderClass} px-4 py-2 rounded-full text-xs font-bold shadow-[0_0_15px_color-mix(in_srgb,var(${ring.shadowVar})_20%,transparent)] flex items-center justify-center ${ring.textClass}`,
								style: {
									left: "50%",
									top: "50%",
									marginLeft: -40,
									marginTop: -16,
									x,
									y
								},
								animate: { rotate: ring.reverse ? 360 : -360 },
								transition: {
									duration: ring.speed,
									repeat: Infinity,
									ease: "linear"
								},
								children: item
							}, item);
						})
					}, i);
				})]
			})]
		})
	});
}
function Projects() {
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const projects = [
		{
			id: "equinox",
			title: "Equinox",
			tag: "Ride-Hailing Ecosystem",
			tech: [
				"Node.js",
				"WebSockets",
				"Supabase",
				"Flutter",
				"OSRM"
			],
			desc: "Event-driven backend utilizing Node.js and WebSockets for instantaneous, bidirectional communication. Integrated OSRM routing engine to bypass paid API dependencies and developed a dynamic fare calculation engine.",
			icon: "local_taxi",
			fullDesc: "Equinox is a fully functional ride-hailing ecosystem built to demonstrate extreme scalability. The backend uses Node.js with WebSockets for real-time location streaming and dispatching. By integrating the open-source OSRM routing engine, it calculates complex ETAs and fares entirely independently of paid APIs. The driver and rider clients were built in Flutter for a unified cross-platform experience.",
			githubUrl: "https://github.com/Justinvcj/Equinox-EcoSystem"
		},
		{
			id: "knowledge-engine",
			title: "Developer Knowledge Engine",
			tag: "AI & Data Pipeline",
			tech: [
				"Python",
				"LLMs",
				"NetworkX",
				"SQLite",
				"GitHub API"
			],
			desc: "Engineered an ETL pipeline to scrape and standardize documentation. Leveraged OpenAI LLMs to extract technical entities and built an interactive, localized knowledge graph using NetworkX.",
			icon: "account_tree",
			fullDesc: "This knowledge engine operates by scraping disparate developer documentation sources, structuring the data via an ETL pipeline in Python, and passing it through an LLM to extract semantic technical entities (APIs, paradigms, libraries). These nodes are then mapped into a localized graph database using NetworkX and SQLite, allowing developers to query relationship webs rather than linear text.",
			githubUrl: "https://github.com/Justinvcj/Developer-Knowledge-Engine"
		},
		{
			id: "reporoast",
			title: "RepoRoast",
			tag: "AI Code Review System",
			tech: [
				"React",
				"Node.js",
				"TypeScript",
				"Gemini API"
			],
			desc: "Full-stack code analysis platform utilizing React and Node.js. Integrated the Gemini API as an automated code reviewer with a sophisticated multi-file parsing system and token optimization.",
			icon: "bug_report",
			fullDesc: "RepoRoast parses GitHub repositories through the GitHub API, intelligently chunks and optimizes the AST payload, and streams it to the Gemini API for deep-context code review. It identifies anti-patterns, security flaws, and performance bottlenecks, presenting the findings in a highly interactive, split-pane React dashboard.",
			githubUrl: "https://github.com/Justinvcj/RepooRoast"
		},
		{
			id: "intent-pay",
			title: "Intent Pay",
			tag: "Expense Management App",
			tech: [
				"Kotlin",
				"Jetpack Compose",
				"Room DB"
			],
			desc: "Native offline Android app that interprets incoming bank SMS alerts via Broadcast Receivers. Implemented a local rule-based classification engine and a unique 'Reflection' overlay to prevent impulse spending.",
			icon: "account_balance_wallet",
			fullDesc: "Intent Pay solves the problem of manual expense tracking by automatically reading bank SMS alerts using Android Broadcast Receivers. Built fully natively with Kotlin and Jetpack Compose, it features a unique psychological 'Reflection' overlay that triggers before registered payment apps are launched, forcing a 5-second cooldown to reduce impulse spending.",
			githubUrl: "https://github.com/Justinvcj/Intent_Pay"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "projects",
		className: "py-section-gap relative z-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-container-max mx-auto px-gutter relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FadeUp, {
					className: "mb-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-theme-accent-1 font-label-caps text-xs mb-2 block tracking-widest uppercase",
						children: "Showcase"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl md:text-4xl font-bold text-theme-text",
						children: "Engineering Projects"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid md:grid-cols-2 gap-8 relative z-10",
					children: projects.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FadeUp, {
						delay: i * .1,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							layoutId: `project-${p.id}`,
							onClick: () => setSelectedId(p.id),
							role: "button",
							tabIndex: 0,
							onKeyDown: (e) => {
								if (e.key === "Enter" || e.key === " ") {
									e.preventDefault();
									setSelectedId(p.id);
								}
							},
							whileHover: { scale: 1.02 },
							className: "group glass-card rounded-3xl border border-theme-border bg-theme-card backdrop-blur-xl shadow-glass-extrusion p-8 md:p-10 hover:border-theme-honey/40 hover:bg-theme-card/80 transition-all duration-500 h-full flex flex-col cursor-pointer relative z-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-start mb-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										layoutId: `icon-${p.id}`,
										className: "w-14 h-14 rounded-2xl bg-surface-container-low flex items-center justify-center border border-theme-border group-hover:bg-theme-honey group-hover:border-theme-honey group-hover:text-theme-bg transition-colors duration-300",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "material-symbols-outlined text-theme-text group-hover:text-theme-bg text-2xl",
											children: p.icon
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-10 h-10 rounded-full border border-theme-border flex items-center justify-center group-hover:bg-theme-text group-hover:text-theme-bg text-theme-text-muted transition-colors",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "material-symbols-outlined text-sm",
											children: "open_in_full"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h3, {
									layoutId: `title-${p.id}`,
									className: "text-2xl font-bold text-theme-text mb-2",
									children: p.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									layoutId: `tag-${p.id}`,
									className: "text-theme-honey text-sm font-bold mb-6",
									children: p.tag
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
									layoutId: `desc-${p.id}`,
									className: "text-theme-text-muted text-sm leading-relaxed mb-8 flex-grow",
									children: p.desc
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-2 pt-6 border-t border-theme-border mt-auto",
									children: p.tech.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-label-caps uppercase tracking-wider text-theme-text/50 bg-theme-card px-2 py-1 rounded",
										children: t
									}, t))
								})
							]
						})
					}, p.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: selectedId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					exit: { opacity: 0 },
					onClick: () => setSelectedId(null),
					className: "fixed inset-0 bg-theme-bg/80 backdrop-blur-md z-50 cursor-pointer"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 pointer-events-none",
					children: projects.map((p) => p.id === selectedId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						layoutId: `project-${p.id}`,
						className: "glass-card rounded-[2rem] border border-theme-border bg-theme-bg/90 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_24px_64px_rgba(0,0,0,0.8)] p-8 md:p-12 w-full max-w-5xl max-h-[90vh] overflow-y-auto pointer-events-auto relative flex flex-col",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSelectedId(null),
							className: "absolute top-6 right-6 w-10 h-10 rounded-full bg-theme-card/80 flex items-center justify-center text-theme-text hover:bg-white hover:text-deep-navy transition-colors z-10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-symbols-outlined",
								children: "close"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col md:flex-row gap-8 md:gap-12 mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										layoutId: `icon-${p.id}`,
										className: "w-20 h-20 rounded-3xl bg-theme-honey text-theme-bg flex items-center justify-center mb-8 shadow-[0_0_30px_color-mix(in_srgb,var(--theme-honey)_40%,transparent)]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "material-symbols-outlined text-theme-bg text-4xl",
											children: p.icon
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h3, {
										layoutId: `title-${p.id}`,
										className: "text-4xl md:text-5xl font-bold text-theme-text mb-3 tracking-tight",
										children: p.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										layoutId: `tag-${p.id}`,
										className: "text-theme-honey text-lg font-bold mb-8",
										children: p.tag
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
										layoutId: `desc-${p.id}`,
										className: "text-theme-text-muted text-lg leading-relaxed mb-8",
										children: p.fullDesc
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-full md:w-1/3 bg-theme-card rounded-3xl p-8 border border-theme-border h-fit",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-theme-text font-bold mb-6 font-label-caps tracking-widest text-sm",
										children: "Tech Stack"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-col gap-3",
										children: p.tech.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 rounded-full bg-theme-accent-1 shadow-[0_0_10px_color-mix(in_srgb,var(--theme-accent-1)_60%,transparent)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-theme-text-muted text-sm font-medium",
												children: t
											})]
										}, t))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-10 pt-8 border-t border-theme-border",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: p.githubUrl,
											target: "_blank",
											rel: "noreferrer",
											className: "block w-full",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MagneticButton, {
												className: "w-full bg-white text-deep-navy px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-theme-cerulean hover:text-white transition-all",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "material-symbols-outlined text-xl",
													children: "github"
												}), "View Source"]
											})
										})
									})
								]
							})]
						})]
					}, p.id))
				})] }) })
			]
		})
	});
}
function Process() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "process",
		className: "py-section-gap border-y border-theme-border relative z-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-container-max mx-auto px-gutter",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FadeUp, {
				className: "text-center mb-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-theme-accent-1 font-label-caps text-xs mb-2 block tracking-widest uppercase",
					children: "Methodology"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl md:text-4xl font-bold text-theme-text",
					children: "How I Engineer Solutions"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden lg:block absolute top-10 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-electric-blue/30 to-transparent z-0" }), [
					{
						num: "01",
						title: "Requirement Analysis",
						desc: "Understanding the core business problem and constraints before writing a single line of code."
					},
					{
						num: "02",
						title: "System Design",
						desc: "Architecting scalable backend structures, defining database schemas, and mapping out API contracts."
					},
					{
						num: "03",
						title: "Modular Development",
						desc: "Applying OOP principles and clean code practices to build robust, maintainable components."
					},
					{
						num: "04",
						title: "Testing & Deployment",
						desc: "Rigorous debugging, validation, and integrating real-world workflows to ensure production readiness."
					}
				].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FadeUp, {
					delay: i * .15,
					className: "relative z-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative group p-6 rounded-2xl bg-theme-card backdrop-blur-xl shadow-glass-extrusion border border-theme-border hover:border-theme-border hover:bg-theme-card/80 transition-all h-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display-hero text-6xl md:text-7xl text-theme-text/5 absolute -top-8 -right-4 group-hover:text-theme-text group-hover:-translate-y-1 transition-all duration-500 pointer-events-none z-20",
								children: s.num
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-lg font-bold text-theme-text mb-3 relative z-10 mt-4",
								children: s.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-theme-text-muted text-sm leading-relaxed relative z-10",
								children: s.desc
							})
						]
					})
				}, i))]
			})]
		})
	});
}
function Experience() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "experience",
		className: "py-section-gap relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full h-full",
				style: { background: "radial-gradient(circle at 70% 30%, #2D65FF, transparent 60%)" }
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-container-max mx-auto px-gutter relative z-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-2 gap-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FadeUp, {
					className: "mb-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-theme-accent-1 font-label-caps text-xs mb-2 block tracking-widest uppercase",
						children: "Career"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl md:text-4xl font-bold text-theme-text",
						children: "Experience"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FadeUp, {
					delay: .1,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative pl-8 border-l border-theme-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute w-4 h-4 rounded-full bg-theme-accent-1 -left-[8.5px] top-1 shadow-[0_0_10px_color-mix(in_srgb,var(--theme-accent-1)_80%,transparent)]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm text-theme-accent-1 font-bold mb-1",
								children: "June 2025"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl font-bold text-theme-text mb-1",
								children: "Software Development Intern"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-theme-text-muted text-sm mb-4",
								children: "Nxtlogic Software Solutions, Coimbatore"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "space-y-3 text-theme-text-muted text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "material-symbols-outlined text-theme-accent-2 text-[16px]",
											children: "chevron_right"
										}), " Assisted in integration of scalable RESTful backend APIs, improving data retrieval efficiency."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "material-symbols-outlined text-theme-accent-2 text-[16px]",
											children: "chevron_right"
										}), " Collaborated on real-world workflows including requirement analysis, debugging, and testing."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "material-symbols-outlined text-theme-accent-2 text-[16px]",
											children: "chevron_right"
										}), " Applied best practices including modular code design and Git version control."]
									})
								]
							})
						]
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FadeUp, {
					className: "mb-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-emerald-500 font-label-caps text-xs mb-2 block tracking-widest uppercase",
						children: "Academic"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl md:text-4xl font-bold text-theme-text",
						children: "Education"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FadeUp, {
						delay: .2,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative pl-8 border-l border-theme-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute w-4 h-4 rounded-full bg-emerald-500 -left-[8.5px] top-1 shadow-[0_0_10px_rgba(16,185,129,0.8)]" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-emerald-500 font-bold mb-1",
									children: "Expected May 2026"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-bold text-theme-text mb-1",
									children: "B.E. Computer Science and Engineering"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-theme-text-muted text-sm mb-2",
									children: "Dr. N.G.P Institute of Technology"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "inline-block px-3 py-1 rounded bg-theme-card text-theme-text/80 text-xs font-bold border border-theme-border",
									children: "CGPA: 8.6"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FadeUp, {
						delay: .3,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative pl-8 border-l border-theme-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute w-3 h-3 rounded-full border-2 border-theme-border bg-background -left-[6.5px] top-1.5" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-theme-text-muted font-bold mb-1",
									children: "March 2023"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-bold text-theme-text mb-1",
									children: "HSC (12th Grade)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-theme-text-muted text-sm",
									children: "Sacred Heart M.H.S.S | 83%"
								})
							]
						})
					})]
				})] })]
			})
		})]
	});
}
function Footer() {
	const [input, setInput] = (0, import_react.useState)("");
	const [history, setHistory] = (0, import_react.useState)([{
		type: "system",
		text: "Justin OS v1.0. Type 'help' for commands."
	}]);
	const inputRef = (0, import_react.useRef)(null);
	const handleCommand = (e) => {
		e.preventDefault();
		if (!input.trim()) return;
		const cmd = input.trim().toLowerCase();
		const newHistory = [...history, {
			type: "user",
			text: `> ${input}`
		}];
		if (cmd === "help") newHistory.push({
			type: "system",
			text: "Available commands: help, contact, github, clear, ps, whoami, date, ls, pwd, sudo"
		});
		else if (cmd === "contact") {
			newHistory.push({
				type: "system",
				text: "Opening email client... (justinvcj@gmail.com)"
			});
			window.location.href = "mailto:justinvcj@gmail.com";
		} else if (cmd === "github") {
			newHistory.push({
				type: "system",
				text: "Opening GitHub profile..."
			});
			window.open("https://github.com/Justinvcj", "_blank");
		} else if (cmd === "clear") {
			setHistory([{
				type: "system",
				text: "Justin OS v1.0. Type 'help' for commands."
			}]);
			setInput("");
			return;
		} else if (cmd === "ps") newHistory.push({
			type: "system",
			text: "  PID TTY          TIME CMD\n    1 ?        00:00:02 init (justin-os)\n  402 ?        00:01:23 react-dom\n  503 ?        00:00:14 tailwindcss\n  892 ?        00:00:42 framer-motion\n 1337 ?        00:00:00 ps"
		});
		else if (cmd === "whoami") newHistory.push({
			type: "system",
			text: "guest\n(But you're looking at Justin's portfolio)"
		});
		else if (cmd === "date") newHistory.push({
			type: "system",
			text: (/* @__PURE__ */ new Date()).toString()
		});
		else if (cmd === "ls") newHistory.push({
			type: "system",
			text: "projects/\nresume.pdf\nskills.txt\nabout.md\ncontact.sh"
		});
		else if (cmd === "pwd") newHistory.push({
			type: "system",
			text: "/home/guest/justin-os"
		});
		else if (cmd.startsWith("sudo ")) newHistory.push({
			type: "error",
			text: "guest is not in the sudoers file. This incident will be reported."
		});
		else if (cmd === "sudo") newHistory.push({
			type: "system",
			text: "usage: sudo command"
		});
		else newHistory.push({
			type: "error",
			text: `Command not found: ${cmd}`
		});
		setHistory(newHistory);
		setInput("");
		setTimeout(() => {
			if (inputRef.current) inputRef.current.scrollIntoView({ behavior: "smooth" });
		}, 10);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "text-theme-text pt-20 pb-12 border-t border-theme-border relative overflow-hidden z-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-container-max mx-auto px-gutter relative z-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				"aria-label": "Terminal",
				className: "max-w-3xl mx-auto mb-20 focus-within:ring-2 focus-within:ring-theme-cerulean rounded-2xl transition-shadow",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FadeUp, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass-card rounded-2xl border border-theme-border bg-theme-bg/80 backdrop-blur-xl overflow-hidden shadow-glass-extrusion",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 px-4 py-3 border-b border-theme-border bg-theme-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3 h-3 rounded-full bg-theme-crimson" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3 h-3 rounded-full bg-theme-honey" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3 h-3 rounded-full bg-theme-mint" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ml-2 text-xs font-mono text-theme-text-muted",
								children: "guest@justin-os:~"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 font-mono text-sm min-h-[250px] max-h-[400px] overflow-y-auto flex flex-col cursor-text",
						onClick: () => inputRef.current?.focus(),
						children: [history.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `mb-2 whitespace-pre-wrap ${line.type === "error" ? "text-theme-crimson" : line.type === "user" ? "text-theme-text" : "text-theme-mint"}`,
							children: line.text
						}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleCommand,
							className: "flex items-center mt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-theme-cerulean mr-2",
								children: "guest@justin-os:~$"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: inputRef,
								type: "text",
								value: input,
								onChange: (e) => setInput(e.target.value),
								className: "flex-1 bg-transparent outline-none text-theme-text border-none focus:ring-0 p-0",
								autoComplete: "off",
								"aria-label": "Terminal Input"
							})]
						})]
					})]
				}) })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-theme-border pt-8 flex flex-col md:flex-row justify-between items-center gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-bold text-lg text-theme-text tracking-tighter flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-6 h-6 rounded-full bg-theme-accent-1 text-deep-navy flex items-center justify-center text-[10px]",
							children: "JV"
						}), "Justin Varghese"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-theme-text-muted text-xs font-medium",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" Engineered by Justin Varghese."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							"aria-label": "GitHub Profile",
							className: "text-theme-text-muted hover:text-theme-text transition-colors",
							href: "https://github.com/Justinvcj",
							target: "_blank",
							rel: "noreferrer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-symbols-outlined text-lg",
								children: "code"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							"aria-label": "LinkedIn Profile",
							className: "text-theme-text-muted hover:text-theme-text transition-colors",
							href: "https://linkedin.com/in/justinvcj",
							target: "_blank",
							rel: "noreferrer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "material-symbols-outlined text-lg",
								children: "work"
							})
						})]
					})
				]
			})]
		})
	});
}
function Portfolio() {
	const [isLoaded, setIsLoaded] = (0, import_react.useState)(false);
	const [ghData, setGhData] = (0, import_react.useState)(null);
	const [lcData, setLcData] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if ("scrollRestoration" in history) history.scrollRestoration = "manual";
		window.scrollTo(0, 0);
		Promise.all([fetch("https://api.github.com/users/Justinvcj").then((r) => r.json()).catch(() => ({})), fetch("https://alfa-leetcode-api.onrender.com/Justinvcj/solved").then((r) => r.json()).catch(() => ({}))]).then(([gh, lc]) => {
			setGhData(gh);
			setLcData(lc);
			setIsLoaded(true);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-theme-bg text-theme-text font-body-md selection:bg-theme-cerulean selection:text-white overflow-x-hidden min-h-screen relative transition-colors duration-500",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-0 pointer-events-none opacity-40",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grainient, {
				color1: "#171723",
				color2: "#3b82f6",
				color3: "#ef4444",
				blendSoftness: .4,
				noiseScale: 2
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Preloader, { isLoaded }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroDashboard, {
						ghData,
						lcData
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TechStack, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Projects, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Process, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Experience, {})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			]
		})]
	});
}
//#endregion
export { Portfolio as component };
