import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, CheckCircle2, Gift } from 'lucide-react';
import { playPop, playRakhiMagic } from '../utils/sound';
import { fireFlowerShower } from '../utils/confetti';

interface RakhiProcessScreenProps {
  onComplete: () => void;
}

export const RakhiProcessScreen: React.FC<RakhiProcessScreenProps> = ({ onComplete }) => {
  const [isTied, setIsTied] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrag = (_: any, info: { point: { x: number; y: number } }) => {
    if (isTied || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const targetY = containerRect.top + containerRect.height * 0.45; // Target wrist area height
    const currentY = info.point.y;

    // Calculate progress based on distance to target
    const dist = Math.abs(currentY - targetY);
    const progress = Math.max(0, Math.min(100, 100 - dist / 2.5));
    setDragProgress(progress);
  };

  const handleDragEnd = (_: any, info: { offset: { x: number; y: number } }) => {
    if (isTied) return;

    // Check if dragged sufficiently far upward or downward towards wrist target
    if (Math.abs(info.offset.y) > 70 || Math.abs(info.offset.x) > 80 || dragProgress > 60) {
      completeRakhiTie();
    } else {
      setDragProgress(0);
    }
  };

  const completeRakhiTie = () => {
    if (isTied) return;
    setIsTied(true);
    playRakhiMagic();
    fireFlowerShower();
  };

  const handleProceed = () => {
    playPop();
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
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-6"
      >
        <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-xs uppercase tracking-wider border border-amber-200">
          Step 1: Rakhi Ceremony 🏵️
        </span>
        <h2 className="font-fredoka text-3xl sm:text-4xl font-extrabold text-rose-600 mt-3 mb-1">
          First things first...
        </h2>
        <p className="text-slate-600 font-medium text-lg">
          Time to tie the Rakhi on your brother's wrist! 💀
        </p>
      </motion.div>

      {/* Interactive Dragging Canvas Arena */}
      <div
        ref={containerRef}
        className="relative w-full h-72 sm:h-80 bg-gradient-to-b from-rose-100/60 via-amber-50/40 to-rose-100/60 rounded-2xl border-2 border-dashed border-rose-300 flex flex-col items-center justify-between p-6 overflow-hidden my-4"
      >
        {/* Top Target Zone: Brother's Wrist Artwork */}
        <div className="relative w-full flex flex-col items-center">
          <div
            className={`transition-all duration-500 rounded-full px-6 py-2.5 flex items-center gap-3 border-2 ${
              isTied
                ? 'bg-amber-100 border-amber-400 text-amber-900 shadow-md scale-105'
                : 'bg-white/80 border-rose-300 text-slate-700 shadow-sm'
            }`}
          >
            <span className="text-2xl">{isTied ? '🦾' : '🖐️'}</span>
            <div className="text-left">
              <span className="font-bold text-sm block">Brother's Wrist Target</span>
              <span className="text-xs text-rose-500 font-semibold">
                {isTied ? 'Protected & Blessed! ✨' : 'Waiting for sacred thread...'}
              </span>
            </div>
          </div>

          {/* Target Glow ring */}
          {!isTied && (
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="w-16 h-16 rounded-full border-4 border-dashed border-amber-500 absolute -bottom-10 pointer-events-none"
            />
          )}
        </div>

        {/* Visual Thread Line connecting to Draggable Rakhi */}
        <div className="w-1 bg-gradient-to-b from-rose-500 via-amber-500 to-red-500 opacity-60 h-24 rounded-full my-auto pointer-events-none" />

        {/* Draggable Rakhi Ornament */}
        {!isTied ? (
          <motion.div
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            dragSnapToOrigin
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.05 }}
            className="cursor-grab active:cursor-grabbing z-20"
          >
            <div className="relative group">
              <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 via-rose-500 to-red-600 rounded-full flex items-center justify-center shadow-xl border-4 border-amber-300 text-3xl animate-pulse">
                🏵️
              </div>
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-extrabold bg-rose-600 text-white px-2.5 py-0.5 rounded-full shadow-sm">
                👆 Drag me up!
              </span>
            </div>
          </motion.div>
        ) : (
          /* Tied State Graphic */
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="z-20 text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-tr from-amber-300 via-rose-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-amber-200 text-5xl mx-auto mb-2 animate-bounce">
              🏵️
            </div>
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-sm border border-emerald-300 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Rakhi Tied Successfully! 💀</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Manual Tap Option for quick convenience */}
      {!isTied && (
        <button
          onClick={completeRakhiTie}
          className="text-xs text-rose-500 underline font-semibold hover:text-rose-700 transition-colors my-2 cursor-pointer"
        >
          (Or click here to tie automatically 🪄)
        </button>
      )}

      {/* Continue Button once tied */}
      {isTied && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleProceed}
            className="w-full py-4 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-extrabold text-xl rounded-2xl shadow-xl shadow-rose-500/25 flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>Next: Time for Mithai! 😋🍬 →</span>
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};
