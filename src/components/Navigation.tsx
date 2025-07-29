import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close menu when switching from mobile to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  const navItems = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#" },
    { name: "Gallery", href: "#" },
    { name: "About", href: "#" },
  ];

  return (
    <nav className="fixed top-0 right-0 z-50 p-4 md:p-6">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-white/80 hover:text-white transition-colors duration-300 text-sm font-medium"
          >
            {item.name}
          </a>
        ))}
        <button className="px-4 py-2 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity duration-300">
          Synthesize
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 w-10 h-10 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <div className="relative flex overflow-hidden items-center justify-center w-8 h-8">
            <div className="flex flex-col justify-between w-6 h-5 transform transition-all duration-300">
              <span
                className={`bg-white h-0.5 w-6 transform transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`bg-white h-0.5 w-6 transform transition-all duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`bg-white h-0.5 w-6 transform transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </div>
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 bg-black/95 backdrop-blur-md z-40 flex flex-col items-center justify-center"
            >
              <div className="flex flex-col items-center space-y-8">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="text-white/80 hover:text-white transition-colors duration-300 text-2xl font-medium"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * navItems.indexOf(item) }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <motion.button
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 rounded-lg text-white text-lg font-medium hover:opacity-90 transition-opacity duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => setIsOpen(false)}
                >
                  Synthesize
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
