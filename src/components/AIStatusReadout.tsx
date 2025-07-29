import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
interface AIStatusReadoutProps {
  isActive: boolean;
}
export function AIStatusReadout({ isActive }: AIStatusReadoutProps) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const messages = [
    "> Analyzing mesh integrity...",
    "> AI Confidence recalculating...",
    "> Synthesis queue initialized...",
    "> Material properties optimized",
    "> Checking structural stability...",
    "> Neural network analysis complete",
  ];
  useEffect(() => {
    if (!isActive) return;
    const rotateMessages = () => {
      setIsTyping(true);
      // Clear the current message
      setCurrentMessage("");
      // Type the new message
      const nextMessage = messages[messageIndex];
      let charIndex = 0;
      const typingInterval = setInterval(() => {
        if (charIndex < nextMessage.length) {
          setCurrentMessage((prev) => prev + nextMessage.charAt(charIndex));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          // Schedule the next message
          setTimeout(() => {
            setMessageIndex((messageIndex + 1) % messages.length);
          }, 800); // Wait 0.8 seconds before showing the next message
        }
      }, 60); // Type each character with a 60ms delay for smoother feel
      return () => clearInterval(typingInterval);
    };
    const timer = setTimeout(rotateMessages, 500);
    return () => clearTimeout(timer);
  }, [messageIndex, isActive]);
  if (!isActive) return null;
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay: 2,
      }}
      className="font-mono text-sm synth-text"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMessage}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="text-green-400"
        >
          {currentMessage}
          {isTyping && (
            <motion.span
              animate={{
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
              }}
              className="inline-block ml-1 w-2 h-4 bg-green-400"
            />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
