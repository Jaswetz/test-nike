import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnalysisUI } from "./AnalysisUI";

interface SneakerModelProps {
  mousePosition: {
    x: number;
    y: number;
  };
  isLoaded: boolean;
  isSynthesizing: boolean;
}

const shoeImages = ["/shoe1.png", "/shoe2.png", "/shoe3.png"];

export function SneakerModel({
  mousePosition,
  isLoaded,
  isSynthesizing,
}: SneakerModelProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [currentShoeIndex, setCurrentShoeIndex] = useState(0);

  useEffect(() => {
    if (!isSynthesizing) {
      const randomIndex = Math.floor(Math.random() * shoeImages.length);
      setCurrentShoeIndex(randomIndex);
    }
  }, [isSynthesizing]);

  return (
    <motion.div
      className="relative"
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: isLoaded ? 1 : 0,
        scale: isLoaded ? 1 : 0.9,
        rotateY: isHovering ? mousePosition.x * 2 : mousePosition.x * 0.8,
        rotateX: isHovering ? -mousePosition.y * 2 : -mousePosition.y * 0.8,
      }}
      whileTap={{
        scale: 1.05,
        transition: { duration: 0.2 },
      }}
      transition={{
        opacity: {
          duration: 1.2,
          delay: 0.5,
          ease: [0.25, 0.1, 0.25, 1.0],
        },
        scale: {
          duration: 1.5,
          delay: 0.5,
          ease: [0.25, 0.1, 0.25, 1.0],
        },
        rotateX: {
          type: "spring",
          stiffness: 60,
          damping: 50,
          mass: 1.2,
        },
        rotateY: {
          type: "spring",
          stiffness: 60,
          damping: 50,
          mass: 1.2,
        },
      }}
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Sneaker image with mask to isolate it */}
      <motion.div
        className="relative w-full md:w-[700px] lg:w-[800px] xl:w-[900px] max-w-[95vw] px-4 md:px-0"
        animate={{
          scale: isHovering ? 1.02 : 1,
        }}
        transition={{
          scale: {
            type: "spring",
            stiffness: 300,
            damping: 25,
          },
        }}
      >
        {/* Soft shadow ellipse under the sneaker */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-2 z-0"
          style={{
            width: "70%",
            height: "48px",
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.08) 80%, transparent 100%)",
            filter: "blur(6px)",
          }}
        />
        {/* To use the 3D model, replace the image below with a 3D viewer (e.g., @react-three/fiber + @react-three/drei GLTF loader) */}
        <AnimatePresence mode="wait">
          {isSynthesizing ? (
            <motion.div
              key="loader"
              className="absolute inset-0 flex items-center justify-center z-20"
              initial={{ opacity: 0, scale: 0.3, rotateY: 180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.3, rotateY: -180 }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.1, 0.25, 1.0],
                rotateY: {
                  duration: 1.2,
                  ease: [0.25, 0.1, 0.25, 1.0],
                },
              }}
            >
              {/* Outer rotating ring */}
              <motion.div
                className="absolute w-20 h-20 border-2 border-transparent border-t-cyan-400 border-r-cyan-400/50 rounded-full"
                initial={{ scale: 0, rotate: 0 }}
                animate={{
                  scale: 1,
                  rotate: 360,
                }}
                transition={{
                  scale: {
                    duration: 0.8,
                    delay: 0.4,
                    ease: [0.25, 0.1, 0.25, 1.0],
                  },
                  rotate: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.4,
                  },
                }}
              />
              {/* Inner pulsing core */}
              <motion.div
                className="w-8 h-8 bg-cyan-400/30 rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 1.2, 1],
                  opacity: [0, 0.3, 0.8, 0.3],
                }}
                transition={{
                  scale: {
                    duration: 1,
                    delay: 0.6,
                    ease: [0.25, 0.1, 0.25, 1.0],
                  },
                  opacity: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.2,
                  },
                }}
              />
              {/* Middle ring */}
              <motion.div
                className="absolute w-14 h-14 border border-cyan-400/40 rounded-full"
                initial={{ scale: 0, rotate: 0 }}
                animate={{
                  scale: 1,
                  rotate: -360,
                }}
                transition={{
                  scale: {
                    duration: 0.6,
                    delay: 0.8,
                    ease: [0.25, 0.1, 0.25, 1.0],
                  },
                  rotate: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.8,
                  },
                }}
              />
            </motion.div>
          ) : (
            <motion.img
              key={currentShoeIndex}
              src={shoeImages[currentShoeIndex]}
              alt="AI Synthesized Sneaker"
              className="w-full h-auto object-contain relative z-10 max-h-[50vh] md:max-h-none"
              initial={{ opacity: 0, scale: 0.95, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{
                opacity: 0,
                scale: 0.3,
                rotateY: 20,
                filter: "blur(4px)",
              }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1.0],
                exit: {
                  duration: 1.0,
                  ease: [0.25, 0.1, 0.25, 1.0],
                },
              }}
              style={{
                filter: `drop-shadow(0 0 10px rgba(255,255,255,0.2))`,
              }}
            />
          )}
        </AnimatePresence>
        {isSynthesizing && <AnalysisUI />}
        {/* Example placeholder for 3D model:
        <Canvas>
          <Suspense fallback={null}>
            <Model url="/models/synth.gltf" />
          </Suspense>
        </Canvas>
        */}
        {/* Dynamic lighting effect based on cursor position */}
        <div
          className="absolute inset-0 pointer-events-none z-20"
          style={{
            background: `radial-gradient(
              circle at ${50 + mousePosition.x * 50}% ${
              50 + mousePosition.y * 50
            }%, 
              rgba(255,255,255,0.1) 0%, 
              rgba(0,0,0,0) 60%
            )`,
            mixBlendMode: "overlay",
          }}
        />
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none z-0"
          animate={{
            opacity: isHovering ? 0.6 : 0.3,
            scale: isHovering ? 1.1 : 1,
          }}
          transition={{
            duration: 0.5,
          }}
          style={{
            background: `radial-gradient(
              circle at center, 
              rgba(255,255,255,0.3) 0%, 
              rgba(0,0,0,0) 70%
            )`,
            filter: "blur(20px)",
          }}
        />
      </motion.div>
      {/* Particle effect for sneaker materialization */}
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 z-30"
          initial={{
            opacity: 1,
          }}
          animate={{
            opacity: 0,
          }}
          transition={{
            duration: 1.5,
            delay: 0.2,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-[400px] h-[300px]">
              {Array.from({
                length: 50,
              }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-white rounded-full"
                  initial={{
                    x: Math.random() * 400 - 200,
                    y: Math.random() * 300 - 150,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: 0,
                    y: 0,
                    opacity: [0, 0.8, 0],
                    scale: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: Math.random() * 0.5,
                    ease: "easeInOut",
                  }}
                  style={{
                    width: Math.random() * 6 + 2,
                    height: Math.random() * 6 + 2,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
