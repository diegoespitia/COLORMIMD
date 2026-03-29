import React, { useState } from "react";
import Welcome from "./components/Welcome";
import Theory from "./components/Theory";
import Laboratory from "./components/Laboratory";
import Games from "./components/Games";
import Branding from "./components/Branding";
import Navbar from "./components/Navbar";
import { motion, AnimatePresence } from "motion/react";

type View = "welcome" | "theory" | "laboratory" | "games" | "branding";

export default function App() {
  const [view, setView] = useState<View>("welcome");

  const renderView = () => {
    switch (view) {
      case "welcome": return <Welcome onStart={() => setView("theory")} onNavigate={setView} />;
      case "theory": return <Theory onBack={() => setView("welcome")} />;
      case "laboratory": return <Laboratory onBack={() => setView("welcome")} />;
      case "games": return <Games onBack={() => setView("welcome")} />;
      case "branding": return <Branding onBack={() => setView("welcome")} />;
      default: return <Welcome onStart={() => setView("theory")} onNavigate={setView} />;
    }
  };

  return (
    <div className="min-h-screen bg-near-black selection:bg-cyan-vibrant selection:text-near-black overflow-x-hidden">
      <Navbar currentView={view} onNavigate={setView} />
      
      <main className="pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative z-10"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Footer */}
      <footer className="py-12 border-t border-gold/10 text-center bg-near-black relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-gold/30" />
            <span className="font-oswald text-gold uppercase tracking-widest text-sm">ColorMind</span>
            <div className="w-8 h-[1px] bg-gold/30" />
          </div>
          <p className="text-warm-gray text-xs font-lato">
            © 2026 ColorMind: La Psicología del Color. <br />
            Explorando la intersección entre la luz, la mente y el diseño.
          </p>
        </div>
      </footer>

      {/* Global decorative elements */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-cyan-vibrant to-gold opacity-30 z-[60] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-cyan-vibrant to-gold opacity-30 z-[60] pointer-events-none" />
    </div>
  );
}
