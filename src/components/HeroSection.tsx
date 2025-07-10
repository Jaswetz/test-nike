import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import { SneakerModel } from "./SneakerModel";
import { DataTag } from "./DataTag";
import { AIStatusReadout } from "./AIStatusReadout";
import { ParticleBackground } from "./ParticleBackground";
export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHoveringTitle, setIsHoveringTitle] = useState(false);
  const [showInactivityTooltip, setShowInactivityTooltip] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
      resetInactivityTimer();
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  // Load animations
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);
  // Inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    setShowInactivityTooltip(false);
    inactivityTimerRef.current = setTimeout(() => {
      setShowInactivityTooltip(true);
    }, 10000); // 10 seconds
  };
  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);
  // Data tags configuration
  const dataTags = [
    {
      id: "material",
      title: "Material Composition",
      content: "Nano-fiber • Liquid Polymer",
      position: {
        top: "25%",
        left: "35%",
      },
      color: "from-red-500/30 to-red-500/10",
    },
    {
      id: "ai",
      title: "AI Confidence",
      content: "98.7%",
      position: {
        top: "28%",
        right: "25%",
      },
      color: "from-green-500/30 to-green-500/10",
    },
    {
      id: "design",
      title: "Design Parameters",
      content: "Aerodynamic • Responsive",
      position: {
        bottom: "25%",
        right: "32%",
      },
      color: "from-blue-500/30 to-blue-500/10",
    },
  ];
  // Headline text animation variants
  const headlineVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.2 + i * 0.15,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    }),
  };
  const titleLines = [
    "WHAT",
    "IF",
    "YOUR",
    "NEXT",
    "NIKE",
    "WASN'T",
    "DESIGNED",
    "—",
    "BUT",
  ];
  return (
    <div
      ref={heroRef}
      className="relative w-full h-screen flex items-center overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(9,9,15,1) 100%)",
      }}
    >
      {/* Vertical line with dot on the right side of the headline */}
      <div className="vertical-line absolute top-0 right-0 h-full flex flex-col items-end z-50 pr-8">
        {/* Dot at the top */}
        <div
          className="w-3 h-3 rounded-full bg-white mb-1"
          style={{ boxShadow: "0 0 8px 2px rgba(255,255,255,0.5)" }}
        />
        {/* Vertical line */}
        <div className="w-px flex-1 bg-gradient-to-b from-white/80 to-white/10 border-r border-white" />
      </div>
      {/* Grid lines */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          transform: `translateX(${mousePosition.x * 10}px) translateY(${
            mousePosition.y * 10
          }px)`,
        }}
      />
      {/* Particle background */}
      <ParticleBackground mousePosition={mousePosition} />
      {/* Project title */}
      <motion.div
        className="absolute top-6 left-8 text-red-600 font-mono text-xl tracking-tighter z-20"
        initial={{
          opacity: 0,
          x: -20,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        transition={{
          delay: 0.5,
          duration: 0.8,
        }}
      >
        <div className="text-red-600">PROJECT</div>
        <div className="text-blue-500">CHIMERA</div>
      </motion.div>
      {/* Main sneaker display */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <SneakerModel mousePosition={mousePosition} isLoaded={isLoaded} />
      </div>
      {/* Data tags */}
      <AnimatePresence>
        {isLoaded &&
          dataTags.map((tag) => (
            <DataTag
              key={tag.id}
              title={tag.title}
              content={tag.content}
              position={tag.position}
              colorClasses={tag.color}
              delay={dataTags.findIndex((t) => t.id === tag.id) * 0.2 + 1.5}
            />
          ))}
      </AnimatePresence>
      {/* AI Status readout */}
      <div className="absolute bottom-[20%] left-[10%] z-20">
        <AIStatusReadout isActive={isLoaded} />
      </div>
      {/* Main headline */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 text-right z-20">
        <div className="flex flex-col items-end">
          {titleLines.map((line, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={headlineVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-2"
            >
              {line}
            </motion.div>
          ))}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={
              isLoaded
                ? {
                    opacity: 1,
                  }
                : {
                    opacity: 0,
                  }
            }
            transition={{
              delay: 2.8,
              duration: 0.5,
            }}
            onMouseEnter={() => setIsHoveringTitle(true)}
            onMouseLeave={() => setIsHoveringTitle(false)}
            className="relative text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter"
          >
            <span
              className={`
              inline-block transition-all duration-300
              ${isHoveringTitle ? "text-green-400 glitch-effect" : "text-white"}
            `}
            >
              SYNTHE
            </span>
            <span
              className={`
              inline-block transition-all duration-300
              ${isHoveringTitle ? "text-green-400 glitch-effect" : "text-white"}
            `}
            >
              SIZED?
            </span>
            {/* Glitch effect overlay */}
            {isHoveringTitle && (
              <div className="absolute inset-0 overflow-hidden opacity-80 pointer-events-none">
                <div className="absolute inset-0 glitch-overlay"></div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      {/* Scroll prompt */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          y: isLoaded ? 0 : 20,
        }}
        transition={{
          delay: 3.2,
          duration: 0.5,
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
      >
        <motion.p className="text-gray-400 mb-2 text-sm">
          Scroll to begin
        </motion.p>
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="relative cursor-pointer hover:scale-110 transition-transform"
        >
          <div className="absolute inset-0 bg-white/20 rounded-full blur-md transform scale-75 animate-pulse"></div>
          <ChevronDownIcon className="h-8 w-8 text-white" />
        </motion.div>
      </motion.div>
      {/* Inactivity tooltip */}
      <AnimatePresence>
        {showInactivityTooltip && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -10,
            }}
            className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-md text-white z-30"
          >
            Try moving your cursor or scroll to begin synthesis.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
