import React from "react";
import { motion } from "framer-motion";

interface AnalysisUIProps {
  isAnalyzing: boolean;
}

export function AnalysisUI({ isAnalyzing }: AnalysisUIProps) {
  const transition = { duration: 1.5, ease: "easeInOut" };

  // A single, dynamic variant for all brackets.
  // It takes position properties from the `custom` prop.
  const bracketVariants = {
    initial: (props: {
      top?: string;
      bottom?: string;
      left?: string;
      right?: string;
    }) => ({
      top: props.top,
      bottom: props.bottom,
      left: props.left,
      right: props.right,
    }),
    analyzing: (props: {
      top?: string;
      bottom?: string;
      left?: string;
      right?: string;
    }) => {
      const horizontal = props.left ? { left: "25%" } : { right: "25%" };
      const vertical = props.top ? { top: "45%" } : { bottom: "45%" };
      return { ...horizontal, ...vertical };
    },
  };

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
        className="absolute left-0 w-full h-1 bg-cyan-400/50"
        style={{ filter: "blur(4px)" }}
        animate={{
          top: isAnalyzing ? ["45%", "55%", "45%"] : ["0%", "100%", "0%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: [0.25, 0.1, 0.25, 1.0],
        }}
      />
      {/* Secondary scanning line */}
      <motion.div
        className="absolute left-0 w-full h-0.5 bg-cyan-300/30"
        style={{ filter: "blur(2px)" }}
        animate={{
          top: isAnalyzing ? ["45%", "55%", "45%"] : ["0%", "100%", "0%"],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: [0.25, 0.1, 0.25, 1.0],
          delay: 1,
        }}
      />

      {/* Corner brackets - The className defines the SHAPE, the `custom` prop defines the POSITION */}
      {/* Top-Left Corner (using a bottom-left shaped border) */}
      <motion.div
        className="absolute w-8 h-8 border-b-2 border-l-2 border-cyan-400"
        custom={{ top: "1rem", left: "1rem" }}
        variants={bracketVariants}
        initial="initial"
        animate={isAnalyzing ? "analyzing" : "initial"}
        transition={transition}
      />
      {/* Top-Right Corner (using a bottom-right shaped border) */}
      <motion.div
        className="absolute w-8 h-8 border-b-2 border-r-2 border-cyan-400"
        custom={{ top: "1rem", right: "1rem" }}
        variants={bracketVariants}
        initial="initial"
        animate={isAnalyzing ? "analyzing" : "initial"}
        transition={transition}
      />
      {/* Bottom-Left Corner (using a top-left shaped border) */}
      <motion.div
        className="absolute w-8 h-8 border-t-2 border-l-2 border-cyan-400"
        custom={{ bottom: "1rem", left: "1rem" }}
        variants={bracketVariants}
        initial="initial"
        animate={isAnalyzing ? "analyzing" : "initial"}
        transition={transition}
      />
      {/* Bottom-Right Corner (using a top-right shaped border) */}
      <motion.div
        className="absolute w-8 h-8 border-t-2 border-r-2 border-cyan-400"
        custom={{ bottom: "1rem", right: "1rem" }}
        variants={bracketVariants}
        initial="initial"
        animate={isAnalyzing ? "analyzing" : "initial"}
        transition={transition}
      />
    </div>
  );
}
