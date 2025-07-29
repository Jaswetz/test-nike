import React, { useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";

/**
 * Calculates the closest point on a rectangle's border to a target point.
 * This is used to ensure the connector line starts from the edge of the
 * DataTag closest to the object it's pointing to.
 * @param rect - The DOMRect of the element.
 * @param target - The {x, y} coordinates of the target point.
 * @returns The {x, y} coordinates of the closest point on the rectangle's border.
 */
const getClosestPointOnRect = (
  rect: DOMRect,
  target: { x: number; y: number }
): { x: number; y: number } => {
  // Center of the rectangle
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  // Vector from center to target
  const dx = target.x - cx;
  const dy = target.y - cy;

  // Calculate the intersection point with the rectangle's edges
  const halfWidth = rect.width / 2;
  const halfHeight = rect.height / 2;

  // Determine the slope to find which edge is intersected
  const sx = dx !== 0 ? Math.sign(dx) : 0;
  const sy = dy !== 0 ? Math.sign(dy) : 0;

  if (dx === 0 && dy === 0) {
    return { x: cx, y: cy }; // Target is at the center
  }

  // Check for intersection with vertical vs. horizontal sides
  if (Math.abs(dy * halfWidth) < Math.abs(dx * halfHeight)) {
    // Intersection with a vertical side (left or right)
    const y = cy + (dy * halfWidth) / Math.abs(dx);
    return { x: cx + sx * halfWidth, y };
  } else {
    // Intersection with a horizontal side (top or bottom)
    const x = cx + (dx * halfHeight) / Math.abs(dy);
    return { x, y: cy + sy * halfHeight };
  }
};

interface DataTagProps {
  title: string;
  content: string;
  position: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
  // The target position in screen coordinates for the line to point to.
  targetPosition?: { x: number; y: number };
  colorClasses: string;
  delay: number;
}

export function DataTag({
  title,
  content,
  position,
  targetPosition,
  colorClasses,
  delay,
}: DataTagProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [lineStyle, setLineStyle] = useState({});
  const tagRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (tagRef.current && targetPosition) {
      const rect = tagRef.current.getBoundingClientRect();
      const closestPoint = getClosestPointOnRect(rect, targetPosition);

      // Calculate the line's properties based on the closest point
      const deltaX = targetPosition.x - closestPoint.x;
      const deltaY = targetPosition.y - closestPoint.y;
      const angleRad = Math.atan2(deltaY, deltaX);
      const angleDeg = angleRad * (180 / Math.PI);
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Position the line's origin on the tag's border
      const lineLeft = closestPoint.x - rect.left;
      const lineTop = closestPoint.y - rect.top;

      setLineStyle({
        width: `${distance}px`,
        transform: `rotate(${angleDeg}deg)`,
        transformOrigin: "left center",
        left: `${lineLeft}px`,
        top: `${lineTop}px`,
      });
    }
  }, [targetPosition]); // Rerun when targetPosition changes

  return (
    <motion.div
      ref={tagRef}
      className="absolute z-20"
      style={position}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <motion.div
        className={`relative rounded-lg bg-gradient-to-r ${colorClasses} backdrop-blur-sm border border-white/10 p-4`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        animate={{
          scale: isHovering ? 1.05 : 1,
          boxShadow: isHovering
            ? "0 0 20px rgba(255,255,255,0.2)"
            : "0 0 0px rgba(255,255,255,0)",
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="text-xs font-medium opacity-70">{title}</div>
        <div className="text-sm font-bold">{content}</div>
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          animate={{ opacity: isHovering ? 0.6 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0) 70%)",
            filter: "blur(10px)",
          }}
        />
        {/* Connection line */}
        <div
          className="absolute h-px bg-gradient-to-r from-white/50 to-transparent"
          style={lineStyle}
        />
      </motion.div>
    </motion.div>
  );
}
