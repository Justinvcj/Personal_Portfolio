import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader({ isLoaded }: { isLoaded: boolean }) {
  const [stage, setStage] = useState<"loading" | "slicing" | "zooming" | "done">("loading");

  useEffect(() => {
    if (isLoaded && stage === "loading") {
      setStage("slicing");
      setTimeout(() => {
        setStage("zooming");
        setTimeout(() => {
          setStage("done");
        }, 1000);
      }, 800);
    }
  }, [isLoaded, stage]);

  if (stage === "done") return null;

  return (
    <AnimatePresence>
      {stage !== "zooming" && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] bg-[#010203] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 2, filter: "blur(20px)" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="relative font-display-hero text-8xl md:text-9xl font-bold tracking-tighter text-white">
            {/* Top Half */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={stage === "loading" ? { y: 0, opacity: 1 } : { y: "-100%", x: -50, opacity: 0, rotate: -10 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)" }}
              className="absolute inset-0"
            >
              JV
            </motion.div>

            {/* Bottom Half */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={stage === "loading" ? { y: 0, opacity: 1 } : { y: "100%", x: 50, opacity: 0, rotate: 10 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              style={{ clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)" }}
            >
              JV
            </motion.div>
            
            {/* Glowing Line during slice */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={stage === "slicing" ? { scaleX: 1.5, opacity: [0, 1, 0] } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-electric-blue shadow-[0_0_20px_#2D65FF] z-10"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
