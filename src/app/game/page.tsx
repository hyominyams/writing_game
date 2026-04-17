"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useGame, AnswerResult } from "@/components/GameProvider";
import { Timer, Send, AlertCircle, Loader2 } from "lucide-react";

export default function GamePage() {
  const router = useRouter();
  const { selectedQuestions, timeLimit, actions } = useGame();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // If entered directly without questions, redirect to home
    if (selectedQuestions.length === 0) {
      router.replace("/");
    }
    inputRef.current?.focus();
  }, [selectedQuestions, router]);

  useEffect(() => {
    if (selectedQuestions.length === 0 || isSubmitting) return;

    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isSubmitting, selectedQuestions.length]);

  const handleAutoSubmit = async () => {
    if (isSubmitting) return;
    await submitAnswer(answer);
  };

  const handleManualSubmit = async () => {
    if (isSubmitting || answer.trim() === "") return;
    await submitAnswer(answer);
  };

  const submitAnswer = async (userAnswer: string) => {
    setIsSubmitting(true);
    setFeedbackError("");
    
    const currentQuestion = selectedQuestions[currentIndex];

    try {
      if (userAnswer.trim() === "") {
        actions.addResult({
          questionId: currentQuestion.id,
          userAnswer: "시간 초과 / 미입력",
          score: 0,
          feedback: "답변을 입력하지 못했습니다."
        });
      } else {
        // Call API
        const res = await fetch("/api/grade", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            answer: userAnswer,
            hint: currentQuestion.answerHint,
            category: currentQuestion.category
          }),
        });
        
        if (!res.ok) {
          let errMessage = "API call failed";
          try {
            const errData = await res.json();
            if (errData?.feedback) errMessage = errData.feedback;
          } catch (e) {}
          throw new Error(errMessage);
        }
        
        const data = await res.json();
        
        actions.addResult({
          questionId: currentQuestion.id,
          userAnswer,
          score: data.score || 0,
          feedback: data.feedback || "평가가 완료되었습니다."
        });
      }

      // Next question or result
      if (currentIndex < selectedQuestions.length - 1) {
        setAnswer("");
        setCurrentIndex((prev) => prev + 1);
        setTimeLeft(timeLimit);
        setIsSubmitting(false);
        setTimeout(() => inputRef.current?.focus(), 100);
      } else {
        router.push("/result");
      }
    } catch (error: any) {
      console.error(error);
      setFeedbackError(error.message || "채점 중 오류가 발생했습니다. 다시 시도해주세요.");
      setIsSubmitting(false);
    }
  };

  if (selectedQuestions.length === 0) return null;

  const currentQuestion = selectedQuestions[currentIndex];
  const progress = ((currentIndex + 1) / selectedQuestions.length) * 100;
  const timeProgress = (timeLeft / timeLimit) * 100;
  const isTimeLow = timeLeft <= 10;

  return (
    <main className="flex-1 flex flex-col p-4 md:p-8 bg-slate-950">
      <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col pb-20">
        
        {/* Header & Progress */}
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-full px-4 py-2 font-semibold text-slate-300">
            문제 <span className="text-white">{currentIndex + 1}</span> / {selectedQuestions.length}
          </div>
          
          <div className={`flex items-center gap-2 font-mono text-xl md:text-2xl font-bold px-4 py-2 rounded-full border ${isTimeLow ? 'bg-red-500/20 text-red-400 border-red-500/50 animate-pulse' : 'bg-slate-900 text-indigo-400 border-slate-800'}`}>
            <Timer className="w-6 h-6" />
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
        </div>

        {/* Dynamic Timeline progress block */}
        <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden mb-6">
          <motion.div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Content Area */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 flex-1">
          
          {/* Image Side */}
          <motion.div 
            key={currentQuestion.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 aspect-video md:aspect-auto shadow-2xl flex items-center justify-center group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/80 z-10 pointers-events-none" />
            <img 
              src={currentQuestion.imageUrl} 
              alt={currentQuestion.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <div className="inline-block bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white/80 border border-white/10 uppercase tracking-wider">
                {currentQuestion.category}
              </div>
            </div>
          </motion.div>

          {/* Input Side */}
          <div className="flex flex-col flex-1">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex-1 flex flex-col justify-between shadow-xl relative overflow-hidden">
              {/* Decorative element */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <h3 className="text-xl font-bold text-slate-200 mb-2">이 이미지를 우리말로 묘사해보세요</h3>
                <p className="text-slate-400 text-sm mb-6">생생하고 구체적이며 시각적으로 잘 드러나게 적어보세요.</p>
                
                <textarea
                  ref={inputRef}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="예: 따스한 햇살이 나뭇잎 사이로 스며드는 울창한 푸른 숲..."
                  className="w-full h-40 md:h-56 bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all text-lg leading-relaxed shadow-inner"
                  disabled={isSubmitting}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                      handleManualSubmit();
                    }
                  }}
                />
                
                <AnimatePresence>
                  {feedbackError && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-3 flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20"
                    >
                      <AlertCircle className="w-4 h-4" />
                      {feedbackError}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <p className="text-xs text-slate-500 text-center flex-1">Press <kbd className="font-mono bg-slate-800 px-1 py-0.5 rounded text-slate-300 mx-1">Ctrl+Enter</kbd> to submit instantly</p>
                
                <button
                  onClick={handleManualSubmit}
                  disabled={isSubmitting || answer.trim() === ""}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      AI가 문장을 평가 중입니다...
                    </>
                  ) : (
                    <>
                      제출하기
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Global Time indicator at very bottom or top */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-slate-900">
        <motion.div 
          className={`h-full ${isTimeLow ? 'bg-red-500' : 'bg-indigo-500'}`}
          style={{ width: `${timeProgress}%` }}
        />
      </div>
    </main>
  );
}
