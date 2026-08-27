import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Gift } from 'lucide-react';
import { playPop, playSuccess } from '../utils/sound';
import { fireConfetti } from '../utils/confetti';

interface MithaiScreenProps {
  onComplete: () => void;
}

export const MithaiScreen: React.FC<MithaiScreenProps> = ({ onComplete }) => {
  const [imgError, setImgError] = useState(false);

  const handleProceed = () => {
    playPop();
    playSuccess();
    fireConfetti();
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto glass-card rounded-3xl p-6 sm:p-10 text-center shadow-2xl relative my-auto select-none overflow-hidden"
    >
      {/* Top Header */}
      <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs uppercase tracking-wider border border-amber-300">
          Step 2: Mithai Time 😋🍬
        </span>
        
        <h2 className="font-fredoka text-3xl sm:text-4xl font-extrabold text-rose-600 mt-3 mb-2 leading-tight">
          “aa dee mithaii khilaa… 😋🍬”
        </h2>
        
        <p className="text-slate-600 font-medium text-base sm:text-lg mb-4">
          Come on, feed your brother some sweets first! 😂❤️
        </p>
      </motion.div>

      {/* Dedicated Mithai GIF Container (/mithai.gif) */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.2 }}
        className="my-5 rounded-3xl overflow-hidden border-2 border-amber-300 shadow-xl max-w-xs sm:max-w-sm mx-auto bg-gradient-to-br from-amber-50 to-rose-50 p-3 text-center"
      >
        {!imgError ? (
          <img
            src="/mithai.gif"
            alt="Feeding Sweets GIF"
            onError={() => setImgError(true)}
            className="w-full h-48 sm:h-56 object-contain rounded-2xl"
          />
        ) : (
          <div className="h-48 flex flex-col items-center justify-center p-4 bg-amber-50 text-slate-600 rounded-2xl">
            <span className="text-5xl mb-2">🍬😋</span>
            <span className="text-xs font-bold text-rose-600">
              [ GIF Placeholder: /src/assets/mithai.gif ]
            </span>
          </div>
        )}
      </motion.div>

      {/* Continue Button to Step 3 (Gift) */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleProceed}
        className="w-full py-4 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-extrabold text-xl rounded-2xl shadow-xl shadow-rose-500/25 flex items-center justify-center gap-3 cursor-pointer mt-4"
      >
        <span>Now where's my gift? 🎁 →</span>
        <Gift className="w-6 h-6 animate-bounce" />
      </motion.button>
    </motion.div>
  );
};
