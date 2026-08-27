import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { playPop } from '../utils/sound';

interface AfterYesModalProps {
  questionIndex: number;
  totalQuestions: number;
  responseMessage: string;
  onNext: () => void;
}

export const AfterYesModal: React.FC<AfterYesModalProps> = ({
  questionIndex,
  totalQuestions,
  responseMessage,
  onNext,
}) => {
  const handleProceed = () => {
    playPop();
    onNext();
  };

  const isLastQuestion = questionIndex === totalQuestions - 1;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 250, damping: 22 }}
      className="w-full max-w-lg mx-auto glass-card rounded-3xl p-8 sm:p-10 text-center shadow-2xl relative border-2 border-rose-300 my-auto"
    >
      <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl shadow-inner">
        🥳
      </div>

      <motion.h2
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="font-fredoka text-3xl sm:text-4xl font-extrabold text-rose-600 mb-4"
      >
        YOU CHOSE YES! 😭
      </motion.h2>

      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg sm:text-xl text-slate-700 font-medium mb-8 leading-relaxed px-2"
      >
        "{responseMessage}"
      </motion.p>

      <motion.button
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleProceed}
        className="w-full py-4 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-rose-500/25 flex items-center justify-center gap-3 transition-all cursor-pointer"
      >
        <span>{isLastQuestion ? "Proceed to Rakhi Ceremony! 🏵️" : "Okay, whatever... →"}</span>
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};
