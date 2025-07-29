import React, { useState } from "react";
import { motion } from "framer-motion";
interface DataTagProps {
  title: string;
  content: string;
  position: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  colorClasses: string;
  delay: number;
}
export function DataTag({
  title,
  content,
  position,
  colorClasses,
  delay,
}: DataTagProps) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <motion.div
      className="absolute z-20 hidden md:block"
      style={position}
      initial={{
        opacity: 0,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        delay,
        duration: 0.5,
      }}
    >
      <motion.div
        className={`relative rounded bg-gradient-to-r ${colorClasses} backdrop-blur-sm border border-white/10`}
        style={{ padding: "1rem", borderRadius: "1rem" }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchStart={() => setIsHovering(true)}
        onTouchEnd={() => setIsHovering(false)}
        animate={{
          scale: isHovering ? 1.05 : 1,
          boxShadow: isHovering
            ? "0 0 20px rgba(255,255,255,0.2)"
            : "0 0 0px rgba(255,255,255,0)",
        }}
        transition={{
          duration: 0.2,
        }}
        whileTap={{ scale: 1.05 }}
      >
        <div className="text-xs sm:text-responsive-xs font-medium opacity-70">
          {title}
        </div>
        <div className="text-sm sm:text-responsive-sm font-bold">{content}</div>
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded pointer-events-none"
          animate={{
            opacity: isHovering ? 0.6 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0) 70%)",
            filter: "blur(10px)",
          }}
        />
        {/* Connection line */}
        <div
          className="absolute w-16 h-px bg-gradient-to-r from-white/50 to-transparent"
          style={{
            transform: "rotate(0deg)",
            transformOrigin: position.left ? "left center" : "right center",
            left: position.left ? "100%" : "auto",
            right: position.right ? "100%" : "auto",
            top: "50%",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
