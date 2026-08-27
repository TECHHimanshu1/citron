import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { playPop } from '../utils/sound';

interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart }) => {
  const handleClick = () => {
    playPop();
    onStart();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-lg mx-auto glass-card rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden my-auto"
    >
      {/* Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/80 text-rose-700 font-semibold text-sm mb-6 border border-rose-200/60"
      >
        <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
        <span>Raksha Bandhan Special 🪔</span>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="font-fredoka text-4xl sm:text-5xl font-bold text-rose-600 mb-4 tracking-tight"
      >
        Hey Sister 👀
      </motion.h1>

      {/* Subtitles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-2 mb-8 text-slate-700 font-medium text-lg sm:text-xl"
      >
        <p>Before you get your Rakhi gift... 🎁</p>
        <p className="text-rose-500 font-semibold">Answer a few very important questions! 😌</p>
      </motion.div>

      {/* Rakhi Graphic Illustration */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        className="w-24 h-24 mx-auto mb-8 bg-gradient-to-tr from-amber-100 to-rose-100 rounded-full flex items-center justify-center border-4 border-amber-300/60 shadow-inner text-4xl animate-pulse"
      >
        🏵️
      </motion.div>

      {/* Action Button */}
      <motion.button
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-xl rounded-2xl shadow-lg shadow-rose-500/30 flex items-center justify-center gap-3 mx-auto transition-all cursor-pointer border border-rose-400/30"
      >
        <span>Let's Go 💀</span>
      </motion.button>

      {/* Subtle footer tip */}
      <p className="text-xs text-rose-400 font-medium mt-6">
        (Warning: Sibling comedy ahead! 😂)
      </p>
    </motion.div>
  );
};
