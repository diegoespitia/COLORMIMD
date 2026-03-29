import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowLeft, RotateCcw, Info } from "lucide-react";

interface TheoryProps {
  onBack: () => void;
}

export default function Theory({ onBack }: TheoryProps) {
  const [speed, setSpeed] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const angleRef = useRef(0);
  const requestRef = useRef<number>(null);

  const render = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (!isPaused) {
      angleRef.current += 0.01 * speed;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const size = 100;

    // Draw Prism (Triangle)
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angleRef.current);
    
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(size, size / 2);
    ctx.lineTo(-size, size / 2);
    ctx.closePath();
    
    ctx.strokeStyle = "#E6B34B";
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Glass effect
    ctx.fillStyle = "rgba(26, 44, 62, 0.4)";
    ctx.fill();
    ctx.restore();

    // Incoming White Light
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(centerX - 40, centerY);
    ctx.strokeStyle = "rgba(245, 245, 245, 0.8)";
    ctx.lineWidth = 4;
    ctx.stroke();

    // Rainbow decomposition
    const colors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#9400D3"];
    colors.forEach((color, i) => {
      ctx.beginPath();
      ctx.moveTo(centerX + 40, centerY);
      ctx.lineTo(canvas.width, centerY - 60 + i * 20);
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.6;
      ctx.stroke();
    });

    requestRef.current = requestAnimationFrame(() => render(ctx, canvas));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    requestRef.current = requestAnimationFrame(() => render(ctx, canvas));

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [speed, isPaused]); // We still need these to update the closure or just use refs for everything

  return (
    <div className="min-h-screen bg-near-black p-8 font-lato relative z-10">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={(e) => {
            e.preventDefault();
            onBack();
          }}
          className="flex items-center gap-2 text-gold hover:text-cyan-vibrant transition-colors mb-12 uppercase font-montserrat text-sm tracking-widest cursor-pointer relative z-20"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Inicio
        </button>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[1px] bg-gold" />
              <span className="text-gold font-oswald uppercase tracking-widest text-sm">Sección Teórica</span>
            </div>
            <h2 className="text-4xl md:text-6xl mb-6 text-off-white leading-tight">
              El Origen de <br />
              <span className="text-cyan-vibrant">lo que Vemos</span>
            </h2>
            
            <div className="space-y-6 text-warm-gray text-lg leading-relaxed">
              <p>
                En 1666, Isaac Newton realizó un experimento que cambiaría nuestra comprensión del universo. 
                Al pasar un rayo de luz blanca a través de un prisma de cristal, descubrió que la luz no es 
                incolora, sino que está compuesta por todos los colores del espectro visible.
              </p>
              <div className="bg-midnight/30 p-6 border-l-4 border-gold italic">
                "Todo color es luz." — Sir Isaac Newton
              </div>
              <p>
                Este fenómeno, conocido como dispersión, ocurre porque cada color tiene una longitud de onda 
                diferente y se refracta (se dobla) en un ángulo distinto al entrar en el cristal.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <div className="art-deco-border p-4 bg-midnight/20">
              <div className="bg-near-black/80 aspect-square flex items-center justify-center overflow-hidden relative">
                <canvas 
                  ref={canvasRef} 
                  width={500} 
                  height={500} 
                  className="w-full h-full pointer-events-none"
                />
                
                <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-4 bg-near-black/60 p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-gold font-montserrat">Control de Velocidad</span>
                    <span className="text-[10px] text-cyan-vibrant font-mono">{speed.toFixed(1)}x</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="5" 
                    step="0.1" 
                    value={speed}
                    onChange={(e) => {
                      setSpeed(parseFloat(e.target.value));
                    }}
                    className="w-full accent-cyan-vibrant h-1 bg-warm-gray/30 appearance-none cursor-pointer relative z-30"
                  />
                  <div className="flex justify-center gap-4">
                    <button 
                      onClick={() => setIsPaused(!isPaused)}
                      className="px-4 py-2 border border-gold/30 text-gold hover:bg-gold hover:text-near-black transition-all cursor-pointer relative z-30 text-xs font-montserrat"
                    >
                      {isPaused ? "REANUDAR" : "PAUSAR"}
                    </button>
                    <button 
                      onClick={() => { setSpeed(1); setIsPaused(false); angleRef.current = 0; }}
                      className="p-2 border border-cyan-vibrant/30 text-cyan-vibrant hover:bg-cyan-vibrant hover:text-near-black transition-all cursor-pointer relative z-30"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex items-start gap-3 text-xs text-warm-gray">
              <Info className="w-4 h-4 text-gold shrink-0" />
              <p>Interactúa con el slider para observar cómo la rotación del prisma afecta la refracción de la luz.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
