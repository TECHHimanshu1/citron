import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, ArrowRight, Wallet, Check, RotateCcw } from 'lucide-react';
import { playPop, playGiftUnbox, playSuccess, playEmptyWallet } from '../utils/sound';
import { fireConfetti } from '../utils/confetti';

interface GiftScreenProps {
  onNext: () => void;
}

export type GiftStage = 'UNWRAP' | 'STAGE1_NO_MONEY' | 'STAGE2_ELEEE' | 'STAGE3_REAL_GIFT';

export const GiftScreen: React.FC<GiftScreenProps> = ({ onNext }) => {
  const [giftStage, setGiftStage] = useState<GiftStage>('UNWRAP');
  const [isRealGiftOpened, setIsRealGiftOpened] = useState(false);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  const handleOpenInitialBox = () => {
    if (giftStage !== 'UNWRAP') return;
    playGiftUnbox();

    // Comedic pause before revealing Stage 1 (No money bro)
    setTimeout(() => {
      setGiftStage('STAGE1_NO_MONEY');
      playEmptyWallet();
      fireConfetti();
    }, 1100);
  };

  const handleOpenRealGift = () => {
    if (isRealGiftOpened) return;
    setIsRealGiftOpened(true);
    playSuccess();
    fireConfetti();
  };

  const handleProceedToFinal = () => {
    playPop();
    onNext();
  };

  const handleImgError = (key: string) => {
    setImgError((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl mx-auto glass-card rounded-3xl p-6 sm:p-10 text-center shadow-2xl relative my-auto select-none overflow-hidden min-h-[500px]"
    >
      {/* Top Stage Indicator */}
      <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <span className="px-3.5 py-1 rounded-full bg-rose-100 text-rose-800 font-bold text-xs uppercase tracking-wider border border-rose-200">
          Step 3: The Gift Sequence 🎁
        </span>
        <h2 className="font-fredoka text-3xl sm:text-4xl font-extrabold text-rose-600 mt-3 mb-1">
          {giftStage === 'STAGE3_REAL_GIFT' ? "Okay fine... 🎁🥹" : "Okay... your turn! 🎁"}
        </h2>
        <p className="text-slate-600 font-medium text-lg mb-6">
          {giftStage === 'UNWRAP' && "Tap or click the gift box to open your surprise!"}
          {giftStage === 'STAGE1_NO_MONEY' && "Inspecting contents inside..."}
          {giftStage === 'STAGE2_ELEEE' && "A message from your brother... 💀"}
          {giftStage === 'STAGE3_REAL_GIFT' && "Here's the ACTUAL gift!"}
        </p>
      </motion.div>

      {/* STAGE 0: Initial Gift Box Unwrapping */}
      {giftStage === 'UNWRAP' && (
        <motion.div
          onClick={handleOpenInitialBox}
          whileHover={{ scale: 1.06, rotate: [0, -3, 3, 0] }}
          whileTap={{ scale: 0.95 }}
          className="relative w-52 h-52 sm:w-60 sm:h-60 mx-auto my-6 bg-gradient-to-tr from-amber-400 via-rose-500 to-pink-600 rounded-3xl shadow-2xl flex flex-col items-center justify-center cursor-pointer border-4 border-amber-300 group"
        >
          {/* Animated Ribbon Cross */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-10 bg-gradient-to-r from-amber-300 to-yellow-200 border-y-2 border-amber-400 opacity-90 shadow-sm" />
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-10 bg-gradient-to-b from-amber-300 to-yellow-200 border-x-2 border-amber-400 opacity-90 shadow-sm" />

          {/* Bow on Top */}
          <div className="absolute -top-6 text-5xl drop-shadow-lg group-hover:scale-125 transition-transform duration-300">
            🎀
          </div>

          <div className="z-10 bg-white/90 px-4 py-2 rounded-2xl shadow-md border border-rose-200 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
            <span className="font-extrabold text-rose-600 text-lg">Tap to Unwrap!</span>
          </div>
        </motion.div>
      )}

      {/* STAGE 1: NO MONEY 😂 */}
      {giftStage === 'STAGE1_NO_MONEY' && (
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 240, damping: 20 }}
          className="space-y-5 my-2"
        >
          <div className="glass-card rounded-3xl p-6 border-2 border-rose-300 bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50 shadow-xl text-center">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-800 font-extrabold text-xs mb-3 border border-rose-200">
              <Wallet className="w-3.5 h-3.5 text-rose-600" />
              <span>Brother's Wallet Status: ₹0.00 💀</span>
            </div>

            {/* Core Message 1 */}
            <h3 className="font-fredoka text-2xl sm:text-3xl font-extrabold text-rose-600 mb-3 leading-snug">
              “Main kaha se gift du? 😭<br />
              Me no money bro… 💀😂”
            </h3>

            {/* GIF 1 Placeholder Container (/public/no-money.gif or /src/assets/no-money.gif) */}
            <div className="my-4 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md max-w-xs sm:max-w-sm mx-auto bg-white p-2">
              {!imgError['no-money'] ? (
                <img
                  src="/no-money.gif"
                  alt="No Money GIF"
                  onError={() => handleImgError('no-money')}
                  className="w-full h-48 sm:h-56 object-contain rounded-xl"
                />
              ) : (
                <div className="h-48 flex flex-col items-center justify-center p-4 bg-amber-50 text-slate-600">
                  <span className="text-4xl mb-2">💸💀</span>
                  <span className="text-xs font-bold text-rose-600">[ GIF Placeholder: /src/assets/no-money.gif ]</span>
                </div>
              )}
            </div>

            {/* Stage 1 -> Stage 2 Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                playPop();
                setGiftStage('STAGE2_ELEEE');
              }}
              className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-extrabold text-lg rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-3"
            >
              <span>Wait... see what happens next 💀 →</span>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* STAGE 2: “ELEEE FIR BHI GIFT PAKAD” 😂💀 */}
      {giftStage === 'STAGE2_ELEEE' && (
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 240, damping: 20 }}
          className="space-y-5 my-2"
        >
          <div className="glass-card rounded-3xl p-6 border-2 border-rose-300 bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50 shadow-xl text-center">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs mb-3 border border-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Paise nahi hai, but still... 💀</span>
            </div>

            {/* Core Message 2 */}
            <h3 className="font-fredoka text-2xl sm:text-3xl font-extrabold text-rose-600 mb-3 leading-snug">
              “Eleee fir bhi gift pakad… 🥹😂🎁”
            </h3>

            {/* GIF 2 Placeholder Container (/public/gift-pakad.gif or /src/assets/gift-pakad.gif) */}
            <div className="my-4 rounded-2xl overflow-hidden border-2 border-rose-300 shadow-md max-w-xs sm:max-w-sm mx-auto bg-white p-2">
              {!imgError['gift-pakad'] ? (
                <img
                  src="/gift-pakad.gif"
                  alt="Gift Pakad GIF"
                  onError={() => handleImgError('gift-pakad')}
                  className="w-full h-48 sm:h-56 object-contain rounded-xl"
                />
              ) : (
                <div className="h-48 flex flex-col items-center justify-center p-4 bg-rose-50 text-slate-600">
                  <span className="text-4xl mb-2">🎁🐒</span>
                  <span className="text-xs font-bold text-rose-600">[ GIF Placeholder: /src/assets/gift-pakad.gif ]</span>
                </div>
              )}
            </div>

            {/* Stage 2 -> Stage 3 Real Gift Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                playPop();
                setGiftStage('STAGE3_REAL_GIFT');
              }}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-extrabold text-lg rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-3"
            >
              <span>Wait... THERE'S ONE MORE THING! 🎁 →</span>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* STAGE 3: ACTUAL FINAL GIFT 🎁 */}
      {giftStage === 'STAGE3_REAL_GIFT' && (
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 240, damping: 20 }}
          className="space-y-6 my-2"
        >
          {/* Header Banner */}
          <div className="py-3 px-6 bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 rounded-2xl text-white shadow-lg border border-amber-300">
            <h3 className="font-fredoka text-2xl sm:text-3xl font-extrabold tracking-wide">
              Okay fine… HERE'S THE ACTUAL GIFT 🎁🥹
            </h3>
            <p className="text-amber-100 font-medium text-xs sm:text-sm mt-1">
              After all the jokes, tap below to unwrap your real surprise! ✨
            </p>
          </div>

          {/* New Visually Distinct Golden Real Gift Box */}
          {!isRealGiftOpened ? (
            <motion.div
              onClick={handleOpenRealGift}
              whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
              whileTap={{ scale: 0.95 }}
              className="relative w-56 h-56 sm:w-64 sm:h-64 mx-auto my-6 bg-gradient-to-tr from-amber-300 via-yellow-400 to-amber-500 rounded-3xl shadow-2xl flex flex-col items-center justify-center cursor-pointer border-4 border-yellow-200 group animate-pulse-glow"
            >
              {/* Golden Ribbon Cross */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-12 bg-gradient-to-r from-rose-500 to-pink-500 border-y-2 border-rose-300 opacity-90 shadow-sm" />
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-12 bg-gradient-to-b from-rose-500 to-pink-500 border-x-2 border-rose-300 opacity-90 shadow-sm" />

              {/* Sparkling Bow */}
              <div className="absolute -top-7 text-6xl drop-shadow-xl group-hover:scale-125 transition-transform duration-300">
                👑🎁
              </div>

              <div className="z-10 bg-white/95 px-5 py-2.5 rounded-2xl shadow-lg border border-amber-300 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600 animate-spin" />
                <span className="font-extrabold text-amber-700 text-lg">Tap to Reveal Real Gift!</span>
              </div>
            </motion.div>
          ) : (
            /* Revealed Actual Final Gift Asset Container (/public/final-gift.png or /src/assets/final-gift.png) */
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              className="glass-card rounded-3xl p-6 border-2 border-amber-300 bg-gradient-to-b from-amber-50 to-white shadow-xl text-center space-y-4"
            >
              <div className="w-16 h-16 bg-amber-100 border-2 border-amber-300 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner animate-bounce">
                👑
              </div>

              <h4 className="font-fredoka text-2xl font-extrabold text-rose-600">
                Your Real Raksha Bandhan Gift! 🎁✨
              </h4>

              {/* Real Gift Asset Display Container (/final-gift.png) */}
              <div className="relative w-full max-w-md mx-auto bg-white p-3 rounded-2xl border-2 border-amber-300 shadow-md">
                {!imgError['final-gift'] ? (
                  <img
                    src="/final-gift.png"
                    alt="Final Gift"
                    onError={() => handleImgError('final-gift')}
                    className="w-full h-56 sm:h-64 object-contain rounded-xl"
                  />
                ) : (
                  /* Tasteful Placeholder if final-gift.png isn't added yet */
                  <div className="h-56 sm:h-64 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-amber-50 to-rose-50 rounded-xl border border-dashed border-amber-400 text-center">
                    <span className="text-5xl mb-3">🎁🌟</span>
                    <h5 className="font-bold text-rose-700 text-base mb-1">
                      [ Final Gift Asset Placeholder ]
                    </h5>
                    <p className="text-xs text-slate-600 max-w-xs">
                      Replace with your own gift image at <code className="bg-amber-100 px-1 py-0.5 rounded text-rose-800 font-bold">/src/assets/final-gift.png</code> or <code className="bg-amber-100 px-1 py-0.5 rounded text-rose-800 font-bold">/public/final-gift.png</code>!
                    </p>
                  </div>
                )}
              </div>

              {/* Continue Button to Final Screen */}
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleProceedToFinal}
                className="w-full py-4 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-extrabold text-xl rounded-2xl shadow-xl shadow-rose-500/25 flex items-center justify-center gap-3 cursor-pointer mt-4"
              >
                <span>See Sibling Memories & Vouchers! 💀</span>
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};
