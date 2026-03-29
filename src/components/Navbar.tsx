import React from "react";
import { motion } from "motion/react";
import { BookOpen, Triangle, Gamepad2, Briefcase } from "lucide-react";

interface NavbarProps {
  currentView: string;
  onNavigate: (view: any) => void;
}

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 w-full bg-near-black/80 backdrop-blur-md border-b border-gold/20 z-50 px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate("welcome")}
        >
          <Triangle className="w-6 h-6 text-cyan-vibrant group-hover:rotate-180 transition-transform duration-500" />
          <span className="font-oswald text-2xl text-gold tracking-tighter uppercase">ColorMind</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <NavLink active={currentView === "theory"} onClick={() => onNavigate("theory")} icon={<BookOpen className="w-4 h-4" />} label="Teoría" />
          <NavLink active={currentView === "laboratory"} onClick={() => onNavigate("laboratory")} icon={<Triangle className="w-4 h-4" />} label="Laboratorio" />
          <NavLink active={currentView === "games"} onClick={() => onNavigate("games")} icon={<Gamepad2 className="w-4 h-4" />} label="Juegos" />
          <NavLink active={currentView === "branding"} onClick={() => onNavigate("branding")} icon={<Briefcase className="w-4 h-4" />} label="Tu Marca" />
        </div>

        <div className="md:hidden">
          {/* Mobile menu could go here, but keeping it simple for now */}
          <Triangle className="w-6 h-6 text-gold" />
        </div>
      </div>
    </nav>
  );
}

function NavLink({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 font-montserrat text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer ${active ? 'text-cyan-vibrant' : 'text-warm-gray hover:text-off-white'}`}
    >
      {icon}
      {label}
      {active && <motion.div layoutId="nav-active" className="absolute -bottom-4 left-0 w-full h-[2px] bg-cyan-vibrant" />}
    </button>
  );
}
