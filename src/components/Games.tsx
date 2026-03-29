import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Trophy, AlertCircle, CheckCircle2 } from "lucide-react";

interface GamesProps {
  onBack: () => void;
}

const QUESTIONS = [
  { emotion: "Confianza y Seguridad", color: "#1A2C3E", options: ["#1A2C3E", "#FF0000", "#FFFF00"] },
  { emotion: "Energía y Urgencia", color: "#FF0000", options: ["#00FF00", "#FF0000", "#0000FF"] },
  { emotion: "Creatividad y Lujo", color: "#9400D3", options: ["#9400D3", "#6B6B6B", "#F5F5F5"] },
  { emotion: "Naturaleza y Calma", color: "#00FF00", options: ["#E6B34B", "#00FF00", "#0D0D0D"] },
];

export default function Games({ onBack }: GamesProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

  const handleAnswer = (color: string) => {
    if (color === QUESTIONS[currentIdx].color) {
      setScore(score + 1);
      setFeedback("correct");
    } else {
      setFeedback("wrong");
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIdx < QUESTIONS.length - 1) {
        setCurrentIdx(currentIdx + 1);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-near-black p-8 font-lato relative z-10">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gold hover:text-cyan-vibrant transition-colors mb-12 uppercase font-montserrat text-sm tracking-widest cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al Inicio
        </button>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div 
              key="game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="mb-8">
                <span className="text-gold font-oswald uppercase tracking-widest text-sm">Desafío ColorMind</span>
                <div className="text-off-white/40 text-xs mt-2">Pregunta {currentIdx + 1} de {QUESTIONS.length}</div>
              </div>

              <h2 className="text-4xl md:text-5xl mb-12 text-off-white">
                ¿Qué color representa <br />
                <span className="text-cyan-vibrant italic">"{QUESTIONS[currentIdx].emotion}"</span>?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {QUESTIONS[currentIdx].options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => !feedback && handleAnswer(opt)}
                    className="aspect-square border-2 border-off-white/10 hover:border-gold transition-all relative overflow-hidden group"
                    style={{ backgroundColor: opt }}
                  >
                    <div className="absolute inset-0 bg-near-black/0 group-hover:bg-near-black/20 transition-all" />
                  </motion.button>
                ))}
              </div>

              {feedback && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`mt-12 flex items-center justify-center gap-3 text-2xl font-oswald uppercase ${feedback === 'correct' ? 'text-green-400' : 'text-red-400'}`}
                >
                  {feedback === 'correct' ? <CheckCircle2 /> : <AlertCircle />}
                  {feedback === 'correct' ? '¡Correcto!' : 'Incorrecto'}
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-midnight/20 p-12 art-deco-border"
            >
              <Trophy className="w-20 h-20 text-gold mx-auto mb-6" />
              <h2 className="text-5xl text-off-white mb-4">¡Juego Terminado!</h2>
              <p className="text-2xl text-cyan-vibrant font-oswald mb-8">Puntuación: {score} / {QUESTIONS.length}</p>
              
              <button 
                onClick={() => { setCurrentIdx(0); setScore(0); setShowResult(false); }}
                className="bg-gold text-near-black px-8 py-3 font-montserrat font-bold uppercase tracking-widest hover:bg-off-white transition-all"
              >
                Reintentar
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
