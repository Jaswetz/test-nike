import React from "react";
import { HeroSection } from "./components/HeroSection";
import { Navigation } from "./components/Navigation";

export function App() {
  return (
    <main className="w-full min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />
      <HeroSection />
    </main>
  );
}
