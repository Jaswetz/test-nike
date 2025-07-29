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
  const tagTargetRef = useRef<HTMLDivElement>(null);
  const infoSectionRef = useRef<HTMLDivElement>(null);
  const [tagTargets, setTagTargets] = useState<{
    [key: string]: { x: number; y: number };
  }>({});

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

  // Update target positions when the window is resized
  useEffect(() => {
    const updateTargetPositions = () => {
      if (tagTargetRef.current) {
        const rect = tagTargetRef.current.getBoundingClientRect();
        setTagTargets({
          center: {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          },
        });
      }
    };

    updateTargetPositions();
    window.addEventListener("resize", updateTargetPositions);
    return () => window.removeEventListener("resize", updateTargetPositions);
  }, [isLoaded, isSynthesizing]);
  // Load animations - synthesis starts immediately
  useEffect(() => {
    const loadTimer = setTimeout(() => setIsLoaded(true), 200);

    // Stop synthesis after a shorter, more dynamic duration
    const synthesisTimer = setTimeout(() => {
      setIsSynthesizing(false);
      // Update data tags with new random data after synthesis completes
      setDataTags([
        {
          id: "material",
          title: "Material Composition",
          content: `Flex-weave ${Math.floor(Math.random() * 100)} • React Foam`,
          position: { top: "25%", left: "25%" },
          color: "from-red-500/30 to-red-500/10",
        },
        {
          id: "ai",
          title: "AI Confidence",
          content: `${(Math.random() * (99.9 - 95) + 95).toFixed(1)}%`,
          position: { top: "28%", right: "25%" },
          color: "from-green-500/30 to-green-500/10",
        },
        {
          id: "design",
          title: "Design Parameters",
          content: `Lightweight • ${
            Math.random() > 0.5 ? "Durable" : "Flexible"
          }`,
          position: { bottom: "25%", right: "32%" },
          color: "from-blue-500/30 to-blue-500/10",
        },
      ]);
    }, 4000); // 4 seconds for a more engaging intro

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

  const scrollToInfoSection = () => {
    infoSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
    <>
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
          ref={tagTargetRef}
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
                delay={dataTags.findIndex((t) => t.id === tag.id) * 0.2 + 0.5}
                targetPosition={tagTargets.center}
              />
            ))}
        </AnimatePresence>
        {/* Main headline - adjusted positioning to ensure "WHAT" is visible */}
        <div
          className="absolute right-12 top-0 h-full flex flex-col justify-center text-right z-20"
          style={{ paddingTop: "5vh" }}
        >
          <div className="flex flex-col items-end">
            {titleLines.map((line, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={headlineVariants}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                className="text-[9vh] font-bold tracking-tighter leading-[0.9] mb-2 font-space-grotesk"
              >
                {line}
              </motion.div>
            ))}
            {/* SYNTHESIZED? text with Learn More functionality */}
            <motion.button
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
              onClick={scrollToInfoSection}
              onMouseEnter={() => setIsHoveringTitle(true)}
              onMouseLeave={() => setIsHoveringTitle(false)}
              className="relative flex flex-col items-end cursor-pointer mb-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Halo sparkle background for the synthesized text */}
              <div className="absolute inset-0 -m-8 overflow-hidden">
                <img
                  src="/halo-sparkle.png"
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-80 transition-transform duration-300 ease-out"
                  style={{
                    transform: `translateX(${
                      mousePosition.x * 2
                    }px) translateY(${mousePosition.y * 2}px)`,
                  }}
                />
                <ParticleBackground mousePosition={mousePosition} />
              </div>

              <div
                className={`
                text-[9vh] font-bold tracking-tighter leading-[0.9] synth-sized-text
                relative z-10 transition-all duration-300
                ${
                  isHoveringTitle
                    ? "text-green-400 glitch-effect"
                    : "text-white"
                }
              `}
              >
                SYNTHE
              </div>
              <div
                className={`
                text-[9vh] font-bold tracking-tighter leading-[0.9] synth-sized-text
                relative z-10 transition-all duration-300
                ${
                  isHoveringTitle
                    ? "text-green-400 glitch-effect"
                    : "text-white"
                }
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
            </motion.button>
          </div>
        </div>

        {/* Standalone Learn More button - positioned for visibility on all screen sizes */}
        <motion.div
          className="absolute bottom-8 left-8 z-50 flex items-center space-x-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10 shadow-lg shadow-orange-500/20"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isLoaded && !isSynthesizing ? 1 : 0,
            y: isLoaded && !isSynthesizing ? 0 : 20,
          }}
          transition={{
            duration: 0.4,
            delay: 1.6,
          }}
          onClick={scrollToInfoSection}
          onMouseEnter={() => setIsHoveringTitle(true)}
          onMouseLeave={() => setIsHoveringTitle(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ cursor: "pointer" }}
        >
          <span className="text-base font-bold bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 bg-clip-text text-transparent">
            Learn More
          </span>
          <motion.div
            animate={{
              y: [0, 4, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: [0.25, 0.1, 0.25, 1.0],
            }}
          >
            <ChevronDownIcon size={20} className="text-orange-500" />
          </motion.div>
        </motion.div>

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
            className="relative cursor-pointer transition-all duration-300 ease-out px-6 py-3 bg-gradient-to-r
          from-orange-500
          via-red-500
          to-purple-600 text-white font-semibold rounded-lg backdrop-blur-md border border-white/20 hover:bg-white/20 disabled:opacity-50"
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

      {/* Info Section */}
      <div
        ref={infoSectionRef}
        className="w-full min-h-screen flex flex-col items-center justify-center py-24 px-8"
        style={{
          background:
            "linear-gradient(180deg, rgba(9,9,15,1) 0%, rgba(15,15,25,1) 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight"
          >
            THE FUTURE OF FOOTWEAR
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-gray-300 text-center mb-20 max-w-3xl mx-auto"
          >
            Project Chimera represents a paradigm shift in athletic footwear
            design, where artificial intelligence doesn't just assist—it creates
            entirely new possibilities that human designers never imagined.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10"
            >
              <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 bg-clip-text text-transparent">
                AI-Driven Design
              </h3>
              <p className="text-gray-300">
                Machine learning algorithms analyze thousands of performance
                metrics to generate optimal shoe geometries.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10"
            >
              <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 bg-clip-text text-transparent">
                Material Innovation
              </h3>
              <p className="text-gray-300">
                Nano-engineered materials that adapt to your unique biomechanics
                and performance requirements.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10"
            >
              <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 bg-clip-text text-transparent">
                Personalized Synthesis
              </h3>
              <p className="text-gray-300">
                Every shoe is uniquely synthesized based on your individual
                movement patterns and athletic goals.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
