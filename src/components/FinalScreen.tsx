import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, RotateCcw, Share2 } from 'lucide-react';
import { playPop, playSuccess } from '../utils/sound';
import { fireConfetti } from '../utils/confetti';

interface FinalScreenProps {
  onRestart: () => void;
}

const PHOTOS = [
  {
    url: '/rakhi_2025_1.jpg',
    title: 'Raksha Bandhan Celebration 💀',
    caption: 'The strongest bond and best memories!',
    hasNativeText: true, // Photo 1 has Raksha Bandhan text
  },
  {
    url: '/rakhi_2018.jpg',
    title: 'Festival Memories 🌸',
    caption: 'Year after year, always smiling together!',
    overlayText: 'Raksha Bandhan', // Recreated matching Raksha Bandhan text treatment for Photo 2
  },
  {
    url: '/oldourphoto.jpg',
    title: 'Childhood Throwback 👦👧',
    caption: 'Partner in crime since day one!',
  },
];

export const FinalScreen: React.FC<FinalScreenProps> = ({ onRestart }) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleRestart = () => {
    playPop();
    onRestart();
  };

  const handleShare = () => {
    playSuccess();
    fireConfetti();
    const shareText = "Happy Raksha Bandhan Sister! 🥰 Check out our special interactive Rakhi story! 💀";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto glass-card rounded-3xl p-6 sm:p-10 text-center shadow-2xl relative my-auto select-none overflow-hidden"
    >
      <div className="space-y-6 my-2">
        {/* Celebration Dancing GIF Avatar (/dancee.gif) */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-2 rounded-full overflow-hidden border-4 border-amber-300 shadow-xl bg-white flex items-center justify-center p-1"
        >
          <img src="/dancee.gif" alt="Celebration Dance GIF" className="w-full h-full object-cover rounded-full" />
        </motion.div>

        {/* Celebration Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-4 px-6 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 rounded-2xl text-white shadow-lg border border-rose-300"
        >
          <h1 className="font-fredoka text-3xl sm:text-4xl font-extrabold tracking-wide">
            Happy Raksha Bandhan, Sister! 🥰
          </h1>
          <p className="text-amber-100 font-medium text-sm mt-1">
            Wishing you endless happiness, laughter & sweets! 🏵️✨
          </p>
        </motion.div>

        {/* Memory Polaroid Photo Gallery */}
        <div className="glass-card rounded-2xl p-4 sm:p-6 border border-rose-200 bg-gradient-to-br from-amber-50/50 to-rose-50/50 shadow-md">
          <div className="flex items-center justify-center gap-2 text-rose-700 font-extrabold text-lg mb-2">
            <span className="text-xl">💀</span>
            <span>Sibling Memory Gallery</span>
          </div>

          {/* Playful Teasing Header Note */}
          <div className="mb-5 bg-white/80 border border-amber-300 rounded-2xl p-3.5 sm:p-4 text-slate-700 text-sm sm:text-base font-medium shadow-sm leading-relaxed max-w-lg mx-auto">
            <p className="font-handwriting text-xl sm:text-2xl text-rose-600 font-bold mb-1">
              "We literally have so few photos together... 📸"
            </p>
            <p className="text-slate-600">
              and somehow almost all of them are from Raksha Bandhan 😂<br />
              <span className="font-semibold text-amber-700">So I guess this festival is basically our annual photoshoot.</span>
            </p>
          </div>

          {/* Main Active Polaroid with Natural Text Overlay for Photo 2 */}
          <div className="relative w-full max-w-sm mx-auto bg-white p-3 pt-3 pb-6 rounded-2xl shadow-xl border border-slate-200">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={PHOTOS[activePhotoIdx].url}
                alt={PHOTOS[activePhotoIdx].title}
                className="w-full h-56 sm:h-64 object-cover border border-slate-100"
              />
              
              {/* Recreated "Raksha Bandhan" text overlay for Photo 2 matching Photo 1 style */}
              {PHOTOS[activePhotoIdx].overlayText && (
                <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-lg border border-amber-300/60 shadow-lg flex items-center gap-1.5 pointer-events-none">
                  <span className="font-fredoka text-amber-300 font-extrabold text-xs sm:text-sm tracking-wide drop-shadow-md">
                    {PHOTOS[activePhotoIdx].overlayText} 🏵️
                  </span>
                </div>
              )}
            </div>

            <div className="mt-3 text-center">
              <h4 className="font-bold text-slate-800 text-base">{PHOTOS[activePhotoIdx].title}</h4>
              <p className="text-xs text-rose-500 font-medium">{PHOTOS[activePhotoIdx].caption}</p>
            </div>
          </div>

          {/* Thumbnail Selection Bar */}
          <div className="flex justify-center gap-3 mt-4">
            {PHOTOS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  playPop();
                  setActivePhotoIdx(idx);
                }}
                className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  activePhotoIdx === idx
                    ? 'border-rose-500 scale-110 shadow-md ring-2 ring-rose-300'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={p.url} alt="thumbnail" className="w-full h-full object-cover" />
                {p.overlayText && (
                  <span className="absolute bottom-0 inset-x-0 bg-amber-500/80 text-[8px] font-bold text-white py-0.2 truncate">
                    Raksha Bandhan
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Playful Teasing Line AFTER the 3 Photos */}
          <div className="mt-5 pt-3 border-t border-rose-200/60 text-center">
            <p className="font-fredoka text-base sm:text-lg text-rose-600 font-bold leading-snug">
              “Literally itne hi photos hai humare saath 😭<br />
              <span className="text-amber-700 font-extrabold">Aur woh bhi almost saare Raksha Bandhan ke 😂”</span>
            </p>
          </div>
        </div>

        {/* Action Buttons: Replay & Share */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleRestart}
            className="flex-1 py-3.5 px-6 bg-white hover:bg-rose-50 text-rose-600 font-bold text-base rounded-xl border-2 border-rose-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-5 h-5 text-rose-500" />
            <span>Replay Story 🔄</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleShare}
            className="flex-1 py-3.5 px-6 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold text-base rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all border border-rose-400"
          >
            {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
            <span>{copied ? "Copied to Clipboard! ✨" : "Share Celebration 💀"}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
