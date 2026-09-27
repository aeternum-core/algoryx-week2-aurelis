import { useEffect, useState } from "react";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Services from "./components/sections/Services";
import Stats from "./components/sections/Stats";
import ParallaxShowcase from "./components/sections/ParallaxShowcase";
import Timeline from "./components/sections/Timeline";
import FeaturedWork from "./components/sections/FeaturedWork";
import Testimonials from "./components/sections/Testimonials";
import Pricing from "./components/sections/Pricing";
import Contact from "./components/sections/Contact";
import OutroCTA from "./components/sections/OutroCTA";

import LiquidCrystal from "./components/experience/LiquidCrystal";
import ParticleField from "./components/experience/ParticleField";
import ScrollProgress from "./components/ui/ScrollProgress";
import { useActiveSection } from "./hooks/useActiveSection";

const sectionIds = [
  "home",
  "about",
  "services",
  "work",
  "process",
  "pricing",
  "contact",
];

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("aurelis-theme");
    if (saved !== null) {
      return saved === "dark";
    }
    // Default to dark cinematic base as requested in directive
    return true;
  });

  const activeSection = useActiveSection(sectionIds, 200);

  const sectionIndex = Math.max(
    1,
    sectionIds.indexOf(activeSection) + 1
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("aurelis-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div
      className={
        "relative min-h-screen overflow-x-clip transition-colors duration-500 font-sans " +
        (darkMode
          ? "bg-[#08080a] text-[#f4f4f5]"
          : "bg-[#f8f9fc] text-[#121214]")
      }
    >
      {/* Global Fixed Atmospheric Liquid Crystal Mesh Background */}
      <LiquidCrystal
        darkMode={darkMode}
        intensity="medium"
        className="fixed inset-0 z-0 pointer-events-none"
      />

      {/* Global Fixed Interactive Particle Constellation Background */}
      <ParticleField
        darkMode={darkMode}
        density="medium"
        interactive={true}
        className="fixed inset-0 z-0 pointer-events-none"
      />

      {/* Top and Floating Scroll Progress Indicators */}
      <ScrollProgress
        currentSectionIndex={sectionIndex}
        totalSections={sectionIds.length}
      />

      {/* Glassmorphic Navbar */}
      <Navbar
        darkMode={darkMode}
        toggleTheme={() => setDarkMode((prev) => !prev)}
        activeSection={activeSection}
      />

      <main className="relative z-10">
        {/* Hero with 4 materials: Crystal + Particles + Sculpture + Kinetic Typography */}
        <Hero darkMode={darkMode} />

        {/* About with kinetic statement & craft pillars */}
        <About />

        {/* Interactive Services Cards with Deliverables Accordions */}
        <Services darkMode={darkMode} />

        {/* Animated Counter Stats */}
        <Stats />

        {/* 3D Multi-Layer Parallax Depth Showcase */}
        <ParallaxShowcase darkMode={darkMode} />

        {/* Featured Work with Interactive Previews & Deep-Dive Modal */}
        <FeaturedWork darkMode={darkMode} />

        {/* Process Timeline with Deliverables */}
        <Timeline darkMode={darkMode} />

        {/* Quiet Editorial Testimonials Carousel */}
        <Testimonials darkMode={darkMode} />

        {/* Studio Pricing Tiers & Billing Switcher */}
        <Pricing darkMode={darkMode} />

        {/* Validated Contact Form with Schema Checking */}
        <Contact darkMode={darkMode} />

        {/* Final Outro Experience Section */}
        <OutroCTA darkMode={darkMode} />
      </main>

      {/* Studio Footer with Live UTC Clock */}
      <Footer />
    </div>
  );
}