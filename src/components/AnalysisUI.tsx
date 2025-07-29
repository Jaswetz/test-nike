import React from "react";
import { motion } from "framer-motion";

export function AnalysisUI() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />
      {/* Scanning line */}
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-cyan-400/50"
        style={{ filter: "blur(4px)" }}
        animate={{
          y: ["0%", "100%", "0%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: [0.25, 0.1, 0.25, 1.0],
        }}
      />
      {/* Secondary scanning line with different timing */}
      <motion.div
        className="absolute top-0 left-0 w-full h-0.5 bg-cyan-300/30"
        style={{ filter: "blur(2px)" }}
        animate={{
          y: ["0%", "100%", "0%"],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: [0.25, 0.1, 0.25, 1.0],
          delay: 1,
        }}
      />
      {/* Corner brackets */}
      <div className="absolute bottom-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-400" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-400" />
      <div className="absolute top-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-400" />
      <div className="absolute top-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-400" />
    </div>
  );
}
