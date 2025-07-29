import React, { useState, useRef, useLayoutEffect } from "react";
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
  const [lineStyle, setLineStyle] = useState({});
  const tagRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (tagRef.current) {
      const rect = tagRef.current.getBoundingClientRect();
      const tagX = rect.left + rect.width / 2;
      const tagY = rect.top + rect.height / 2;
      const screenCenterX = window.innerWidth / 2;
      const screenCenterY = window.innerHeight / 2;

      const deltaX = screenCenterX - tagX;
      const deltaY = screenCenterY - tagY;

      const angleRad = Math.atan2(deltaY, deltaX);
      const angleDeg = angleRad * (180 / Math.PI);
      const distance =
        Math.sqrt(deltaX * deltaX + deltaY * deltaY) - rect.width / 2;

      setLineStyle({
        width: `${distance}px`,
        transform: `rotate(${angleDeg}deg)`,
        transformOrigin: "left center",
        left: "50%",
        top: "50%",
      });
    }
  }, []);
  return (
    <motion.div
      ref={tagRef}
      className="absolute z-20"
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
        animate={{
          scale: isHovering ? 1.05 : 1,
          boxShadow: isHovering
            ? "0 0 20px rgba(255,255,255,0.2)"
            : "0 0 0px rgba(255,255,255,0)",
        }}
        transition={{
          duration: 0.2,
        }}
      >
        <div className="text-xs font-medium opacity-70">{title}</div>
        <div className="text-sm font-bold">{content}</div>
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
          className="absolute w-64 h-px bg-gradient-to-r from-white/50 to-transparent"
          style={lineStyle}
        />
      </motion.div>
    </motion.div>
  );
}
