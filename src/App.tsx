import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BackgroundDecoration } from './components/BackgroundDecoration';
import { IntroScreen } from './components/IntroScreen';
import { QuestionScreen, QUESTIONS } from './components/QuestionScreen';
import { AfterYesModal } from './components/AfterYesModal';
import { RakhiProcessScreen } from './components/RakhiProcessScreen';
import { MithaiScreen } from './components/MithaiScreen';
import { GiftScreen } from './components/GiftScreen';
import { FinalScreen } from './components/FinalScreen';

export type AppStage = 'INTRO' | 'QUESTION' | 'AFTER_YES' | 'RAKHI_PROCESS' | 'MITHAI' | 'GIFT' | 'FINAL_MESSAGE';

export function App() {
  const [stage, setStage] = useState<AppStage>('INTRO');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  // Transitions:
  const handleStartIntro = () => {
    setCurrentQuestionIdx(0);
    setStage('QUESTION');
  };

  const handleAnswerYes = () => {
    setStage('AFTER_YES');
  };

  const handleNextAfterYes = () => {
    if (currentQuestionIdx < QUESTIONS.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setStage('QUESTION');
    } else {
      setStage('RAKHI_PROCESS');
    }
  };

  const handleRakhiComplete = () => {
    setStage('MITHAI');
  };

  const handleMithaiComplete = () => {
    setStage('GIFT');
  };

  const handleGiftNext = () => {
    setStage('FINAL_MESSAGE');
  };

  const handleRestart = () => {
    setCurrentQuestionIdx(0);
    setStage('INTRO');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-4 sm:p-6 md:p-8 overflow-x-hidden">
      {/* Background Animated Atmosphere */}
      <BackgroundDecoration />

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-4xl flex-1 flex flex-col justify-center my-auto">
        <AnimatePresence mode="wait">
          {stage === 'INTRO' && (
            <motion.div key="intro" className="w-full flex justify-center">
              <IntroScreen onStart={handleStartIntro} />
            </motion.div>
          )}

          {stage === 'QUESTION' && (
            <motion.div key={`question-${currentQuestionIdx}`} className="w-full flex justify-center">
              <QuestionScreen
                currentQuestionIndex={currentQuestionIdx}
                onAnswerYes={handleAnswerYes}
              />
            </motion.div>
          )}

          {stage === 'AFTER_YES' && (
            <motion.div key={`afteryes-${currentQuestionIdx}`} className="w-full flex justify-center">
              <AfterYesModal
                questionIndex={currentQuestionIdx}
                totalQuestions={QUESTIONS.length}
                responseMessage={QUESTIONS[currentQuestionIdx].afterYesText}
                onNext={handleNextAfterYes}
              />
            </motion.div>
          )}

          {stage === 'RAKHI_PROCESS' && (
            <motion.div key="rakhi" className="w-full flex justify-center">
              <RakhiProcessScreen onComplete={handleRakhiComplete} />
            </motion.div>
          )}

          {stage === 'MITHAI' && (
            <motion.div key="mithai" className="w-full flex justify-center">
              <MithaiScreen onComplete={handleMithaiComplete} />
            </motion.div>
          )}

          {stage === 'GIFT' && (
            <motion.div key="gift" className="w-full flex justify-center">
              <GiftScreen onNext={handleGiftNext} />
            </motion.div>
          )}

          {stage === 'FINAL_MESSAGE' && (
            <motion.div key="final" className="w-full flex justify-center">
              <FinalScreen onRestart={handleRestart} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Branding */}
      <footer className="relative z-10 py-3 text-center text-xs font-semibold text-rose-400/80">
        Crafted with 💀 for Raksha Bandhan
      </footer>
    </div>
  );
}

export default App;
