import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Pipette, Info, RefreshCw } from "lucide-react";

interface LaboratoryProps {
  onBack: () => void;
}

export default function Laboratory({ onBack }: LaboratoryProps) {
  const [r, setR] = useState(42);
  const [g, setG] = useState(249);
  const [b, setB] = useState(192);

  const bgColor = `rgb(${r}, ${g}, ${b})`;
  
  const getPalette = (r: number, g: number, b: number) => {
    const clamp = (val: number) => Math.max(0, Math.min(255, val));
    
    return [
      { r, g, b }, // Base
      { r: clamp(r + 40), g: clamp(g + 40), b: clamp(b + 40) }, // Lighter
      { r: clamp(r - 40), g: clamp(g - 40), b: clamp(b - 40) }, // Darker
      { r: clamp(255 - r), g: clamp(255 - g), b: clamp(255 - b) }, // Complementary
      { r: clamp(g), g: clamp(b), b: clamp(r) }, // Triadic/Shifted
    ];
  };

  const palette = getPalette(r, g, b);

  const getPsychology = () => {
    if (r > 200 && g < 120 && b < 120) return { title: "Pasión e Intensidad", desc: "Esta paleta vibrante evoca fuerza, deseo y una energía incontrolable." };
    if (b > 180 && r < 120 && g < 200) return { title: "Serenidad Profunda", desc: "Tonos que transmiten paz, estabilidad y una calma oceánica." };
    if (g > 180 && r < 150) return { title: "Vitalidad Orgánica", desc: "La frescura de la naturaleza que promueve el crecimiento y la salud." };
    if (r > 200 && g > 180 && b < 100) return { title: "Optimismo Radiante", desc: "Calidez solar que despierta la alegría y la creatividad." };
    if (r > 100 && b > 150 && g < 100) return { title: "Misterio Elegante", desc: "Una combinación sofisticada que sugiere magia, lujo y espiritualidad." };
    return { title: "Armonía Cromática", desc: "Una mezcla equilibrada que crea una atmósfera única y personalizada." };
  };

  const psych = getPsychology();

  return (
    <div className="min-h-screen bg-near-black p-8 font-lato relative z-10">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gold hover:text-cyan-vibrant transition-colors mb-12 uppercase font-montserrat text-sm tracking-widest cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Inicio
        </button>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[1px] bg-cyan-vibrant" />
              <span className="text-cyan-vibrant font-oswald uppercase tracking-widest text-sm">Laboratorio de Paletas</span>
            </div>
            <h2 className="text-4xl md:text-6xl mb-6 text-off-white">
              Generador de <span className="text-gold">Emociones</span>
            </h2>
            
            <p className="text-warm-gray mb-12 max-w-md">
              Manipula los niveles de luz para crear una paleta de 5 tonos que capturen una atmósfera emocional específica.
            </p>

            <div className="space-y-8 mt-12">
              <ColorSlider label="Rojo (R)" value={r} onChange={setR} color="bg-red-500" />
              <ColorSlider label="Verde (G)" value={g} onChange={setG} color="bg-green-500" />
              <ColorSlider label="Azul (B)" value={b} onChange={setB} color="bg-blue-500" />
            </div>

            <div className="mt-12 p-8 bg-midnight/30 border border-gold/20 art-deco-border relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <Pipette className="w-12 h-12" />
              </div>
              <h3 className="text-gold text-xl mb-3 flex items-center gap-2 font-oswald uppercase tracking-wider">
                <Info className="w-5 h-5" /> {psych.title}
              </h3>
              <p className="text-off-white/70 leading-relaxed italic">"{psych.desc}"</p>
            </div>
          </motion.div>

          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="lg:sticky lg:top-24">
            <div className="art-deco-border p-2 bg-midnight/20">
              <div className="flex flex-col md:flex-row h-[400px] w-full overflow-hidden">
                {palette.map((color, i) => {
                  const hex = `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`;
                  return (
                    <motion.div 
                      key={i}
                      initial={{ flexGrow: 1 }}
                      whileHover={{ flexGrow: 2 }}
                      className="relative group cursor-pointer h-full flex items-end p-4 transition-all duration-500"
                      style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}
                    >
                      <div className="bg-near-black/80 p-3 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity w-full text-center">
                        <span className="block font-mono text-xs text-off-white uppercase">{hex}</span>
                        <span className="text-[8px] text-warm-gray font-montserrat uppercase tracking-tighter">
                          {i === 0 ? 'Base' : `Tono ${i + 1}`}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
            <div className="mt-8 flex gap-4">
              <button 
                onClick={() => { 
                  setR(Math.floor(Math.random()*256)); 
                  setG(Math.floor(Math.random()*256)); 
                  setB(Math.floor(Math.random()*256)); 
                }}
                className="flex-1 py-4 border border-cyan-vibrant/30 text-cyan-vibrant hover:bg-cyan-vibrant hover:text-near-black transition-all flex items-center justify-center gap-2 font-montserrat uppercase tracking-widest text-sm glow-cyan"
              >
                <RefreshCw className="w-4 h-4" /> Aleatorio
              </button>
              
              <button 
                className="px-6 py-4 border border-gold/30 text-gold hover:bg-gold hover:text-near-black transition-all font-montserrat uppercase tracking-widest text-sm"
                onClick={() => {
                  const hexPalette = palette.map(c => `#${c.r.toString(16).padStart(2, '0')}${c.g.toString(16).padStart(2, '0')}${c.b.toString(16).padStart(2, '0')}`).join(', ');
                  navigator.clipboard.writeText(hexPalette);
                  alert("¡Paleta copiada al portapapeles!");
                }}
              >
                Copiar HEX
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ColorSlider({ label, value, onChange, color }: { label: string, value: number, onChange: (v: number) => void, color: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs uppercase tracking-widest font-montserrat">
        <span className="text-off-white/60">{label}</span>
        <span className="text-off-white font-mono">{value}</span>
      </div>
      <div className="relative h-6 flex items-center">
        <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-near-black border border-off-white/10`} />
        <input 
          type="range" min="0" max="255" value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full appearance-none bg-transparent cursor-pointer relative z-10 accent-off-white"
        />
      </div>
    </div>
  );
}
