import React from "react";
import { motion } from "motion/react";
import { Triangle, Play, BookOpen, Gamepad2, Briefcase } from "lucide-react";

interface WelcomeProps {
  onStart: () => void;
  onNavigate: (view: any) => void;
}

export default function Welcome({ onStart, onNavigate }: WelcomeProps) {
  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center p-6 bg-radial-[at_50%_30%] from-midnight to-near-black overflow-hidden relative z-10">
      {/* Animated Logo / Prism Placeholder */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative mb-12"
      >
        <div className="w-48 h-48 flex items-center justify-center relative">
          <motion.div
            animate={{ 
              rotate: 360,
              boxShadow: ["0 0 20px #2AF9C0", "0 0 40px #E6B34B", "0 0 20px #2AF9C0"]
            }}
            transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, boxShadow: { duration: 4, repeat: Infinity } }}
            className="absolute inset-0 border-2 border-gold/30 rounded-full"
          />
          <Triangle className="w-24 h-24 text-cyan-vibrant" />
          
          {/* Light rays effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-transparent via-off-white to-transparent opacity-20 rotate-45" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-transparent via-cyan-vibrant to-transparent opacity-20 -rotate-45" />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center max-w-2xl"
      >
        <h1 className="text-5xl md:text-7xl mb-4 text-gold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          ColorMind
        </h1>
        <h2 className="text-xl md:text-2xl font-montserrat text-cyan-vibrant mb-8 tracking-[0.2em] uppercase">
          La Psicología del Color
        </h2>
        <p className="text-lg text-off-white/80 mb-12 font-lato leading-relaxed">
          Explora la ciencia, el arte y el impacto emocional de cada tono. 
          Un viaje interactivo desde la física de la luz hasta el diseño moderno.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            onStart();
          }}
          className="bg-cyan-vibrant text-near-black px-10 py-4 rounded-none font-montserrat font-semibold uppercase tracking-widest flex items-center gap-3 mx-auto glow-cyan transition-all hover:bg-off-white cursor-pointer relative z-20"
        >
          <Play className="w-5 h-5 fill-current" />
          Empezar
        </motion.button>
      </motion.div>

      {/* Quick Access Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 w-full max-w-4xl"
      >
        <QuickCard onClick={() => onNavigate("theory")} icon={<BookOpen />} title="Teoría" color="border-gold/50" />
        <QuickCard onClick={() => onNavigate("laboratory")} icon={<Triangle />} title="Laboratorio" color="border-cyan-vibrant/50" />
        <QuickCard onClick={() => onNavigate("games")} icon={<Gamepad2 />} title="Juegos" color="border-gold/50" />
        <QuickCard onClick={() => onNavigate("branding")} icon={<Briefcase />} title="Tu Marca" color="border-cyan-vibrant/50" />
      </motion.div>
    </div>
  );
}

function QuickCard({ icon, title, color, onClick }: { icon: React.ReactNode, title: string, color: string, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`p-6 bg-midnight/40 border ${color} flex flex-col items-center gap-3 hover:bg-midnight/60 transition-colors cursor-pointer group relative z-20`}
    >
      <div className="text-off-white group-hover:text-cyan-vibrant transition-colors">
        {icon}
      </div>
      <span className="font-montserrat text-xs uppercase tracking-tighter text-warm-gray group-hover:text-off-white">
        {title}
      </span>
    </div>
  );
}
