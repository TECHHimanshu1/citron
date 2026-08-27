import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

interface GifContainerProps {
  /**
   * Path to the GIF file.
   * Place your GIF in public/gift.gif (or update gifSrc prop)
   */
  gifSrc?: string;
  altText?: string;
}

export const GifContainer: React.FC<GifContainerProps> = ({
  gifSrc = '/gift.gif',
  altText = 'Rakhi Gift Animation',
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 15 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20, delay: 0.5 }}
      className="relative w-full max-w-sm mx-auto my-5 p-4 glass-card rounded-3xl border-2 border-rose-300 shadow-lg text-center overflow-hidden bg-gradient-to-b from-white/90 to-rose-50/80"
    >
      {/* Subtle Floating Hearts & Sparkles decoration */}
      <motion.div
        animate={{ y: [-4, 4, -4], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-2 right-3 text-lg pointer-events-none"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ scale: [0.9, 1.15, 0.9] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-2 left-3 text-lg pointer-events-none text-rose-500"
      >
        💀
      </motion.div>

      {/* GIF Container / Image Display */}
      <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-rose-100/60 border border-rose-200 shadow-inner flex flex-col items-center justify-center">
        {!hasError ? (
          <img
            src={gifSrc}
            alt={altText}
            onError={() => setHasError(true)}
            className="w-full h-full object-contain rounded-2xl"
          />
        ) : (
          /* Tasteful Placeholder when gift.gif is missing */
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-2 drop-shadow-md"
            >
              🎁✨
            </motion.div>
            <p className="text-xs font-bold text-rose-600">
              [ Drop your custom <code className="bg-rose-100 px-1 py-0.5 rounded text-rose-800">public/gift.gif</code> here! ]
            </p>
            <span className="text-[11px] text-slate-500 mt-1">
              (GIF Placeholder Container ready)
            </span>
          </div>
        )}
      </div>

      {/* Sweet & Funny Follow-up Message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
        className="mt-4 pt-3 border-t border-rose-200/80"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 rounded-full font-bold text-xs mb-2 border border-amber-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Still... Here's your real gift! 💀</span>
        </div>

        <h4 className="font-fredoka text-xl sm:text-2xl font-extrabold text-rose-600 tracking-wide leading-snug">
          “Eleee fir bhi gift pakad… 🥹😂🎁”
        </h4>
      </motion.div>
    </motion.div>
  );
};
