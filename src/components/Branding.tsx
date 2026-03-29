import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Upload, Download, Copy, Check, Sparkles, Eye, Layout } from "lucide-react";

interface BrandingProps {
  onBack: () => void;
}

const PALETTE_RECOMMENDATIONS: Record<string, string[]> = {
  "elegante": ["#0D0D0D", "#E6B34B", "#F5F5F5", "#6B6B6B", "#1A2C3E"],
  "lujo": ["#000000", "#D4AF37", "#FFFFFF", "#2F2F2F", "#1A1A1A"],
  "energia": ["#FF0000", "#0D0D0D", "#FFFFFF", "#FF7F00", "#E6B34B"],
  "pasion": ["#8B0000", "#000000", "#F5F5F5", "#FF4D4D", "#1A2C3E"],
  "confianza": ["#1A2C3E", "#2AF9C0", "#F5F5F5", "#6B6B6B", "#0D0D0D"],
  "tecnologia": ["#000000", "#00F2FF", "#FFFFFF", "#1A1A1A", "#333333"],
  "naturaleza": ["#00704A", "#F5F5F5", "#E6B34B", "#2D5A27", "#0D0D0D"],
  "salud": ["#2AF9C0", "#FFFFFF", "#1A2C3E", "#00704A", "#F5F5F5"],
  "creatividad": ["#9400D3", "#FFC72C", "#0D0D0D", "#FF00FF", "#2AF9C0"],
  "diversion": ["#FFC72C", "#FF0000", "#0000FF", "#00FF00", "#FFFFFF"],
};

export default function Branding({ onBack }: BrandingProps) {
  const [logo, setLogo] = useState<string | null>(null);
  const [values, setValues] = useState("");
  const [recommendations, setRecommendations] = useState<string[][]>([]);
  const [selectedPalette, setSelectedPalette] = useState<string[]>(["#1A2C3E", "#E6B34B", "#2AF9C0", "#0D0D0D", "#F5F5F5"]);
  const [previewBg, setPreviewBg] = useState("#0D0D0D");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateRecommendations = () => {
    const keywords = values.toLowerCase().split(",").map(v => v.trim()).filter(v => v !== "");
    const foundPalettes: string[][] = [];
    
    keywords.forEach(kw => {
      if (PALETTE_RECOMMENDATIONS[kw]) {
        foundPalettes.push(PALETTE_RECOMMENDATIONS[kw]);
      }
    });

    if (foundPalettes.length === 0) {
      // Default recommendations if no keywords match
      setRecommendations([
        PALETTE_RECOMMENDATIONS["elegante"],
        PALETTE_RECOMMENDATIONS["confianza"],
        PALETTE_RECOMMENDATIONS["energia"],
        PALETTE_RECOMMENDATIONS["creatividad"]
      ]);
    } else {
      // Ensure we have 4 recommendations
      const final = [...foundPalettes];
      const defaults = Object.values(PALETTE_RECOMMENDATIONS);
      while (final.length < 4) {
        const random = defaults[Math.floor(Math.random() * defaults.length)];
        if (!final.includes(random)) final.push(random);
      }
      setRecommendations(final.slice(0, 4));
    }
  };

  const copyHex = () => {
    navigator.clipboard.writeText(selectedPalette.join(", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPreview = () => {
    // In a real app, we'd use html2canvas or similar. 
    // For this demo, we'll simulate the download.
    alert("Simulando descarga de imagen de marca...");
  };

  return (
    <div className="min-h-screen bg-near-black p-8 font-lato relative z-10">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gold hover:text-cyan-vibrant transition-colors mb-12 uppercase font-montserrat text-sm tracking-widest cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Inicio
        </button>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Controls Panel */}
          <div className="lg:col-span-5 space-y-10">
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-[1px] bg-gold" />
                <span className="text-gold font-oswald uppercase tracking-widest text-sm">Herramienta de Identidad</span>
              </div>
              <h2 className="text-4xl md:text-5xl mb-6 text-off-white">
                Tu <span className="text-cyan-vibrant">Marca</span>
              </h2>
              <p className="text-warm-gray mb-8">
                Sube tu logo y define tus valores para encontrar la armonía visual perfecta.
              </p>

              {/* Logo Upload */}
              <div className="space-y-4">
                <label className="block text-xs uppercase tracking-widest font-montserrat text-off-white/60">1. Sube tu Logotipo</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gold/30 p-8 text-center cursor-pointer hover:border-cyan-vibrant transition-all bg-midnight/20 group"
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleLogoUpload} 
                    accept="image/*" 
                    className="hidden" 
                  />
                  {logo ? (
                    <div className="flex flex-col items-center gap-2">
                      <img src={logo} alt="Logo preview" className="max-h-24 object-contain mb-2" />
                      <span className="text-xs text-cyan-vibrant font-montserrat uppercase">Cambiar Imagen</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <Upload className="w-8 h-8 text-gold group-hover:text-cyan-vibrant transition-colors" />
                      <span className="text-xs text-warm-gray font-montserrat uppercase">Arrastra o haz clic para subir</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Brand Values */}
              <div className="mt-10 space-y-4">
                <label className="block text-xs uppercase tracking-widest font-montserrat text-off-white/60">2. Valores de Marca (Máx 3)</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={values}
                    onChange={(e) => setValues(e.target.value)}
                    placeholder="Ej: Elegante, Tecnología, Energía"
                    className="w-full bg-midnight/40 border border-gold/20 p-4 text-off-white font-lato focus:border-cyan-vibrant outline-none transition-all"
                  />
                  <button 
                    onClick={generateRecommendations}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-cyan-vibrant hover:text-off-white transition-colors"
                  >
                    <Sparkles className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-[10px] text-warm-gray italic">Separa los valores por comas.</p>
              </div>

              {/* Recommendations */}
              {recommendations.length > 0 && (
                <div className="mt-12 space-y-6">
                  <label className="block text-xs uppercase tracking-widest font-montserrat text-off-white/60">3. Recomendaciones para ti</label>
                  <div className="grid grid-cols-2 gap-4">
                    {recommendations.map((pal, i) => (
                      <div 
                        key={i} 
                        onClick={() => setSelectedPalette(pal)}
                        className={`p-2 border cursor-pointer transition-all ${selectedPalette === pal ? 'border-cyan-vibrant bg-cyan-vibrant/5' : 'border-off-white/10 hover:border-gold/50'}`}
                      >
                        <div className="flex h-8 w-full">
                          {pal.map((c, j) => (
                            <div key={j} className="flex-1" style={{ backgroundColor: c }} />
                          ))}
                        </div>
                        <div className="mt-2 text-[10px] text-center text-warm-gray uppercase font-montserrat">Opción {i + 1}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Visualizer Panel */}
          <div className="lg:col-span-7">
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-gold" />
                  <span className="text-xs uppercase tracking-widest font-montserrat text-gold">Visualizador en Tiempo Real</span>
                </div>
                <div className="flex gap-2">
                  {selectedPalette.map((c, i) => (
                    <button 
                      key={i} 
                      onClick={() => setPreviewBg(c)}
                      className={`w-6 h-6 border transition-all ${previewBg === c ? 'border-cyan-vibrant scale-110' : 'border-off-white/20'}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div className="art-deco-border p-4 bg-midnight/20">
                <div 
                  className="aspect-video w-full flex items-center justify-center relative transition-colors duration-500 overflow-hidden"
                  style={{ backgroundColor: previewBg }}
                >
                  {/* Decorative background patterns */}
                  <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  </div>

                  {logo ? (
                    <motion.img 
                      key={logo + previewBg}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      src={logo} 
                      alt="Logo Brand" 
                      className="max-w-[60%] max-h-[60%] object-contain drop-shadow-2xl"
                    />
                  ) : (
                    <div className="text-center space-y-4 opacity-30">
                      <Layout className="w-16 h-16 mx-auto text-off-white" />
                      <p className="font-oswald uppercase tracking-widest text-off-white">Sube tu logo para visualizar</p>
                    </div>
                  )}

                  {/* Contrast check indicator */}
                  <div className="absolute top-4 right-4 bg-near-black/60 px-3 py-1 backdrop-blur-md text-[10px] text-off-white font-montserrat uppercase tracking-widest border border-off-white/10">
                    Contraste: {previewBg === "#0D0D0D" || previewBg === "#000000" ? "Alto" : "Variable"}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={copyHex}
                  className="py-4 border border-gold/30 text-gold hover:bg-gold hover:text-near-black transition-all flex items-center justify-center gap-2 font-montserrat uppercase tracking-widest text-sm"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copiado" : "Copiar HEX"}
                </button>
                <button 
                  onClick={downloadPreview}
                  className="py-4 bg-cyan-vibrant text-near-black hover:bg-off-white transition-all flex items-center justify-center gap-2 font-montserrat font-bold uppercase tracking-widest text-sm glow-cyan"
                >
                  <Download className="w-4 h-4" /> Exportar
                </button>
              </div>

              {/* Palette Breakdown */}
              <div className="bg-midnight/30 p-6 border border-off-white/5">
                <h4 className="text-[10px] uppercase tracking-widest font-montserrat text-warm-gray mb-4">Desglose de Paleta Seleccionada</h4>
                <div className="flex gap-2">
                  {selectedPalette.map((c, i) => (
                    <div key={i} className="flex-1 group relative">
                      <div className="h-12 w-full" style={{ backgroundColor: c }} />
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-near-black text-[8px] p-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-mono text-off-white border border-gold/20">
                        {c}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

