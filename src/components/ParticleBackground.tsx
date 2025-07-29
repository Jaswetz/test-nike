import React, { useEffect, useRef } from "react";
interface ParticleBackgroundProps {
  mousePosition?: {
    x: number;
    y: number;
  };
}
export function ParticleBackground({ mousePosition }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);
    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      constructor() {
        this.x = Math.random() * (canvas?.width || 0);
        this.y = Math.random() * (canvas?.height || 0);
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
        // Colors: blue, green, purple hints
        const colors = [
          "rgba(0,100,255,0.8)",
          "rgba(0,255,150,0.8)",
          "rgba(150,0,255,0.8)",
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        // Move based on speed only (no mouse influence)
        this.x += this.speedX;
        this.y += this.speedY;
        // Wrap around edges
        if (this.x < 0) this.x = canvas?.width || 0;
        if (this.x > (canvas?.width || 0)) this.x = 0;
        if (this.y < 0) this.y = canvas?.height || 0;
        if (this.y > (canvas?.height || 0)) this.y = 0;
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    // Create particles - increased count for more sparkles
    const particleCount = 150;
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      // Draw connections between nearby particles
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255,255,255,${0.3 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []); // Removed mousePosition dependency since we're not using it anymore
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{
        opacity: 0.6,
      }}
    />
  );
}
