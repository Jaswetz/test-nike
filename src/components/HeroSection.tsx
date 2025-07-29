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
  const [isSynthesizing, setIsSynthesizing] = useState(true); // Start in synthesizing state
  const heroRef = useRef<HTMLDivElement>(null);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Load animations - synthesis starts immediately
  useEffect(() => {
    const loadTimer = setTimeout(() => setIsLoaded(true), 500);

    // Stop synthesis after 10 seconds and update data
    const synthesisTimer = setTimeout(() => {
      setIsSynthesizing(false);
      // Update data tags with new random data after synthesis completes
      setDataTags([
        {
          id: "material",
          title: "Material Composition",
          content: `Flex-weave ${Math.floor(Math.random() * 100)} • React Foam`,
          position: {
            top: "25%",
            left: "25%",
          },
          color: "from-red-500/30 to-red-500/10",
        },
        {
          id: "ai",
          title: "AI Confidence",
          content: `${(Math.random() * (99.9 - 95) + 95).toFixed(1)}%`,
          position: {
            top: "28%",
            right: "25%",
          },
          color: "from-green-500/30 to-green-500/10",
        },
        {
          id: "design",
          title: "Design Parameters",
          content: `Lightweight • ${
            Math.random() > 0.5 ? "Durable" : "Flexible"
          }`,
          position: {
            bottom: "25%",
            right: "32%",
          },
          color: "from-blue-500/30 to-blue-500/10",
        },
      ]);
    }, 10000); // 10 seconds

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(synthesisTimer);
    };
  }, []);

  const [dataTags, setDataTags] = useState([
    {
      id: "material",
      title: "Material Composition",
      content: "Nano-fiber • Liquid Polymer",
      position: {
        top: "25%",
        left: "25%",
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
  ]);

  const handleSynthesize = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      // Update data tags with new random data
      setDataTags([
        {
          id: "material",
          title: "Material Composition",
          content: `Flex-weave ${Math.floor(Math.random() * 100)} • React Foam`,
          position: {
            top: "25%",
            left: "25%",
          },
          color: "from-red-500/30 to-red-500/10",
        },
        {
          id: "ai",
          title: "AI Confidence",
          content: `${(Math.random() * (99.9 - 95) + 95).toFixed(1)}%`,
          position: {
            top: "28%",
            right: "25%",
          },
          color: "from-green-500/30 to-green-500/10",
        },
        {
          id: "design",
          title: "Design Parameters",
          content: `Lightweight • ${
            Math.random() > 0.5 ? "Durable" : "Flexible"
          }`,
          position: {
            bottom: "25%",
            right: "32%",
          },
          color: "from-blue-500/30 to-blue-500/10",
        },
      ]);
    }, 25360); // Wait for AIStatusReadout to complete
  };
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
        delay: 0.8 + i * 0.05,
        duration: 0.2,
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
      <div className="vertical-line absolute top-20 -right-3 flex flex-col items-center z-50 pr-8">
        {/* Dot at the top */}
        <div
          className="w-3 h-3 rounded-full bg-white/40"
          style={{ boxShadow: "0 0 8px 2px rgba(255,255,255,0.2)" }}
        />
        {/* Vertical line - shorter height */}
        <div className="w-px h-96 bg-gradient-to-b from-white/40 to-white/10" />
      </div>
      {/* Grid lines */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-300 ease-out"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          transform: `translateX(${mousePosition.x * 5}px) translateY(${
            mousePosition.y * 5
          }px)`,
        }}
      />
      {/* Particle background */}
      <ParticleBackground mousePosition={mousePosition} />
      {/* Project title */}
      <motion.div
        className="absolute top-6 left-8 font-mono text-4xl font-black tracking-tight z-20"
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
        {/* Halo sparkle background for Project Chimera */}
        <div className="absolute inset-0 -m-4 overflow-hidden">
          <img
            src="/halo-sparkle.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(${mousePosition.x * 2}px) translateY(${
                mousePosition.y * 2
              }px) scale(1.5)`,
            }}
          />
        </div>
        <div className="relative z-10 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 bg-clip-text text-transparent">
          PROJECT
        </div>
        <div className="relative z-10 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 bg-clip-text text-transparent">
          CHIMERA
        </div>
      </motion.div>
      {/* Main sneaker display */}
      <div
        className="absolute inset-0 flex items-center z-10"
        style={{ justifyContent: "center", transform: "translateX(-5%)" }}
      >
        <SneakerModel
          mousePosition={mousePosition}
          isLoaded={isLoaded}
          isSynthesizing={isSynthesizing}
        />
      </div>
      {/* Data tags */}
      <AnimatePresence>
        {isLoaded &&
          !isSynthesizing &&
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
      {/* Main headline */}
      <div className="absolute right-12 top-1/2 transform -translate-y-1/2 text-right z-20">
        <div className="flex flex-col items-end">
          {titleLines.map((line, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={headlineVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-2 font-space-grotesk"
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
              delay: 1.4,
              duration: 0.4,
            }}
            onMouseEnter={() => setIsHoveringTitle(true)}
            onMouseLeave={() => setIsHoveringTitle(false)}
            className="relative text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter"
          >
            {/* Halo sparkle background for the synthesized text */}
            <div className="absolute inset-0 -m-8 overflow-hidden">
              <img
                src="/halo-sparkle.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-300 ease-out"
                style={{
                  transform: `translateX(${mousePosition.x * 2}px) translateY(${
                    mousePosition.y * 2
                  }px)`,
                }}
              />
              <ParticleBackground mousePosition={mousePosition} />
            </div>

            <div
              className={`
              relative z-10 transition-all duration-300
              ${isHoveringTitle ? "text-green-400 glitch-effect" : "text-white"}
            `}
            >
              SYNTHE
            </div>
            <div
              className={`
              relative z-10 transition-all duration-300
              ${isHoveringTitle ? "text-green-400 glitch-effect" : "text-white"}
            `}
            >
              SIZED?
            </div>
            {/* Glitch effect overlay */}
            {isHoveringTitle && (
              <div className="absolute inset-0 overflow-hidden opacity-80 pointer-events-none z-20">
                <div className="absolute inset-0 glitch-overlay"></div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      {/* Synthesize Controls - replacing scroll prompt */}
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
          delay: 1.8,
          duration: 0.4,
        }}
        className="absolute bottom-8 flex flex-col items-center z-20"
        style={{ left: "45%", transform: "translateX(-50%)" }}
      >
        <motion.p className="text-gray-400 mb-2 text-sm">
          {isSynthesizing ? "Synthesizing..." : "Click to synthesize"}
        </motion.p>
        <motion.button
          onClick={handleSynthesize}
          animate={{
            y: [0, 6, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "loop",
            ease: [0.25, 0.1, 0.25, 1.0],
          }}
          className="relative cursor-pointer transition-all duration-300 ease-out px-6 py-3 bg-white/10 text-white font-semibold rounded-lg backdrop-blur-md border border-white/20 hover:bg-white/20 disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSynthesizing}
        >
          {/* Halo green background for the synthesize button */}
          <img
            src="/halo-green.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-60 rounded-lg transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(${mousePosition.x * 1.5}px) translateY(${
                mousePosition.y * 1.5
              }px) scale(2)`,
            }}
          />
          <motion.div
            className="absolute inset-0 bg-white/20 rounded-lg blur-md transform scale-75"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <span className="relative z-10">
            {isSynthesizing ? "Synthesizing..." : "Synthesize"}
          </span>
        </motion.button>
      </motion.div>

      {/* AI Status Readout - positioned just below middle of screen */}
      <div
        className="absolute top-[55%] z-30"
        style={{ left: "45%", transform: "translateX(-50%)" }}
      >
        <AIStatusReadout isActive={isSynthesizing} />
      </div>
    </div>
  );
}
