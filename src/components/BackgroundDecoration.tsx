import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundDecoration: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft Gradient Glowing Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-rose-300/30 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-300/30 rounded-full blur-3xl" />

      {/* Floating Marigold Petals (safely placed in outer bounds) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-xl opacity-60 select-none"
          style={{
            top: `${(i * 12) % 80 + 10}%`,
            left: i % 2 === 0 ? `${(i * 3) % 15 + 2}%` : `${85 + ((i * 3) % 12)}%`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 15, -15, 0],
            scale: [0.9, 1.05, 0.9],
          }}
          transition={{
            duration: 5 + (i % 3),
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        >
          {i % 2 === 0 ? '🌸' : '🌼'}
        </motion.div>
      ))}

      {/* Floating Diya Icons at Top Corners */}
      <div className="absolute top-4 left-4 text-2xl opacity-70 animate-float" style={{ animationDelay: '0s' }}>
        🪔
      </div>
      <div className="absolute top-4 right-4 text-2xl opacity-70 animate-float" style={{ animationDelay: '2s' }}>
        🪔
      </div>
    </div>
  );
};
