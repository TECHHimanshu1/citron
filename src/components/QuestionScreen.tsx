import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Laugh } from 'lucide-react';
import { playPop, playEscape, playSuccess } from '../utils/sound';

export interface QuestionItem {
  id: number;
  text: string;
  emoji: string;
  afterYesText: string;
  gifSrc: string;
  assetPath: string;
}

export const QUESTIONS: QuestionItem[] = [
  {
    id: 1,
    text: "Am I the best brother in the whole world? 😎",
    emoji: "👑",
    afterYesText: "Even though I know you didn't really want to choose this... But never mind 😂",
    gifSrc: "/question-1.gif",
    assetPath: "/src/assets/question-1.gif",
  },
  {
    id: 2,
    text: "Am I your absolute favorite sibling? 👀",
    emoji: "🥇",
    afterYesText: "I knew it! Deep down in your heart, I'm your only favorite choice 😌",
    gifSrc: "/question-2.gif",
    assetPath: "/src/assets/question-2.gif",
  },
  {
    id: 3,
    text: "Do you think I'm annoying sometimes? 😭",
    emoji: "🤪",
    afterYesText: "Wait... you admitted I'm annoying?! Hey! 😤 ...Okay fine, fair enough 😂",
    gifSrc: "/question-3.gif",
    assetPath: "/src/assets/question-3.gif",
  },
  {
    id: 4,
    text: "Do I deserve an extra special Rakhi gift too? 🎁",
    emoji: "🍫",
    afterYesText: "Aha! Gift confirmation recorded in database! No refunds or takebacks allowed! 🎁",
    gifSrc: "/question-4.gif",
    assetPath: "/src/assets/question-4.gif",
  },
  {
    id: 5,
    text: "Okay... I'm at least a little bit cool, right? 😌",
    emoji: "✨",
    afterYesText: "Official Certification Granted: Coolest Brother in the Universe! 😎🔥",
    gifSrc: "/question-5.gif",
    assetPath: "/src/assets/question-5.gif",
  }
];

const ESCAPE_REACTIONS = [
  "Nice try 😂",
  "You really thought I'd let you click that? 😏",
  "NO is currently unavailable 😌",
  "Wrong answer detected 🚨",
  "System Error: 'NO' button malfunctioned 🤖",
  "Just click YES already! 💀",
  "Access Denied to 'NO'! 🚫"
];

interface QuestionScreenProps {
  currentQuestionIndex: number;
  onAnswerYes: () => void;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  currentQuestionIndex,
  onAnswerYes,
}) => {
  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const [escapeCount, setEscapeCount] = useState(0);
  const [reactionToast, setReactionToast] = useState<string | null>(null);
  const [imgError, setImgError] = useState<Record<string, boolean>>({});

  // Position offset for escaping NO button relative to standard position
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  // Reset NO button position when question changes
  useEffect(() => {
    setNoPosition({ x: 0, y: 0 });
    setEscapeCount(0);
    setReactionToast(null);
  }, [currentQuestionIndex]);

  const handleImgError = (key: string) => {
    setImgError((prev) => ({ ...prev, [key]: true }));
  };

  // Teleport NO button to a new random location inside container
  const handleEscape = () => {
    playEscape();

    const toastMsg = ESCAPE_REACTIONS[escapeCount % ESCAPE_REACTIONS.length];
    setReactionToast(toastMsg);
    setEscapeCount((prev) => prev + 1);

    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const maxX = Math.min(140, containerRect.width / 2 - 50);
    const minX = -maxX;
    
    const maxY = Math.min(120, containerRect.height / 2 - 40);
    const minY = -maxY;

    let newX = (Math.random() * (maxX - minX) + minX);
    let newY = (Math.random() * (maxY - minY) + minY);

    if (Math.abs(newX - noPosition.x) < 40) newX += 60 * (newX > 0 ? -1 : 1);
    if (Math.abs(newY - noPosition.y) < 30) newY += 50 * (newY > 0 ? -1 : 1);

    setNoPosition({ x: newX, y: newY });
  };

  // Mouse proximity check
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!noButtonRef.current) return;

    const btnRect = noButtonRef.current.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    const distance = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

    if (distance < 75) {
      handleEscape();
    }
  };

  const handleYesClick = () => {
    playSuccess();
    onAnswerYes();
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full max-w-xl mx-auto glass-card rounded-3xl p-6 sm:p-10 text-center shadow-2xl relative my-auto select-none overflow-hidden min-h-[500px] flex flex-col justify-between"
    >
      {/* Top Header / Question Progress Indicator */}
      <div>
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-rose-500 mb-3 px-2">
          <span>Question {currentQuestionIndex + 1} of {QUESTIONS.length}</span>
          <div className="flex gap-1.5">
            {QUESTIONS.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx === currentQuestionIndex
                    ? 'w-6 bg-rose-500'
                    : idx < currentQuestionIndex
                    ? 'w-2 bg-rose-300'
                    : 'w-2 bg-rose-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Reaction Toast popup */}
        <AnPresenceWrapper reactionToast={reactionToast} />

        {/* Question Text */}
        <motion.h2
          key={`text-${currentQuestion.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="font-fredoka text-2xl sm:text-3xl font-bold text-slate-800 my-2 leading-tight"
        >
          {currentQuestion.text}
        </motion.h2>

        {/* Dedicated Question GIF Container */}
        <motion.div
          key={`gif-${currentQuestion.id}`}
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="my-3 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md max-w-xs sm:max-w-sm mx-auto bg-white p-2"
        >
          {!imgError[`question-${currentQuestion.id}`] ? (
            <img
              src={currentQuestion.gifSrc}
              alt={`Question ${currentQuestion.id} GIF`}
              onError={() => handleImgError(`question-${currentQuestion.id}`)}
              className="w-full h-40 sm:h-48 object-contain rounded-xl"
            />
          ) : (
            <div className="h-40 flex flex-col items-center justify-center p-3 bg-amber-50 text-slate-600 rounded-xl text-center">
              <span className="text-3xl mb-1">🎬✨</span>
              <span className="text-xs font-bold text-rose-600">
                [ GIF Placeholder: {currentQuestion.assetPath} ]
              </span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Interactive Action Buttons */}
      <div className="relative py-4 flex items-center justify-center gap-6 sm:gap-10 min-h-[100px]">
        {/* YES Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleYesClick}
          className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-xl rounded-2xl shadow-lg shadow-emerald-500/30 flex items-center gap-2 cursor-pointer border border-emerald-400/40 animate-pulse-glow z-10"
        >
          <span>YES 💀</span>
        </motion.button>

        {/* Escaping NO Button */}
        <motion.button
          ref={noButtonRef}
          animate={{ x: noPosition.x, y: noPosition.y }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onMouseEnter={handleEscape}
          onTouchStart={(e) => {
            e.preventDefault();
            handleEscape();
          }}
          onClick={handleEscape}
          className="px-8 py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white font-extrabold text-xl rounded-2xl shadow-md border border-rose-300/40 cursor-pointer flex items-center gap-2"
        >
          <span>NO 😏</span>
        </motion.button>
      </div>

      {/* Bottom hints */}
      <p className="text-xs text-slate-400 font-medium italic mt-1">
        {escapeCount > 0
          ? `Attempts to click NO: ${escapeCount} (Result: Escaped!) 😜`
          : "Choose your answer wisely! 😏"}
      </p>
    </div>
  );
};

// Helper sub-component for animated toast
const AnPresenceWrapper: React.FC<{ reactionToast: string | null }> = ({ reactionToast }) => {
  return (
    <div className="h-8 mb-1 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {reactionToast && (
          <motion.div
            key={reactionToast}
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full font-bold text-sm shadow-sm"
          >
            <Laugh className="w-4 h-4 text-amber-600" />
            <span>{reactionToast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
