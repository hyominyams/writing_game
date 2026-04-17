"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useGame } from "@/components/GameProvider";
import { questions } from "@/data/questions";
import { shuffle } from "@/lib/shuffle";
import { Clock, Image as ImageIcon, Sparkles, Play } from "lucide-react";

const TIME_OPTIONS = [
  { label: "30초", seconds: 30 },
  { label: "1분", seconds: 60 },
  { label: "1분 30초", seconds: 90 },
  { label: "2분", seconds: 120 },
];

const QUESTION_COUNTS = [10, 20, 30, 50];

export default function StartPage() {
  const router = useRouter();
  const { actions } = useGame();
  const [selectedCount, setSelectedCount] = useState(10);
  const [selectedTime, setSelectedTime] = useState(60);
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    setIsStarting(true);
    // Select requested number of questions randomly (with extra buffer for skipping)
    const shuffled = shuffle(questions);

    actions.startGame(shuffled, selectedTime, selectedCount);

    setTimeout(() => {
      router.push("/game");
    }, 600);
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden bg-slate-950">
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-600/20 blur-[120px]" />
      </div>

      <motion.div
        className="w-full max-w-lg z-10 space-y-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-center space-y-4 shadow-sm">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-xl shadow-indigo-500/30"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            글쓰기 챌린지
          </h1>
          <p className="text-slate-400 text-lg">
            이미지를 보고 가장 멋진 문장을 만들어보세요!
          </p>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-8">
          {/* Question Count Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-300 font-medium">
              <ImageIcon className="w-5 h-5 text-indigo-400" />
              <span>문항 수 선택</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {QUESTION_COUNTS.map((count) => (
                <button
                  key={count}
                  onClick={() => setSelectedCount(count)}
                  className={`py-3 rounded-xl text-sm font-semibold transition-all ${
                    selectedCount === count
                      ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 scale-105"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                  }`}
                >
                  {count}문제
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-300 font-medium">
              <Clock className="w-5 h-5 text-purple-400" />
              <span>문제당 시간</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {TIME_OPTIONS.map((opt) => (
                <button
                  key={opt.seconds}
                  onClick={() => setSelectedTime(opt.seconds)}
                  className={`py-3 rounded-xl text-sm font-semibold transition-all ${
                    selectedTime === opt.seconds
                      ? "bg-purple-500 text-white shadow-lg shadow-purple-500/25 scale-105"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStart}
            disabled={isStarting}
            className="w-full flex items-center justify-center gap-2 py-4 mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white font-bold text-lg shadow-xl shadow-indigo-500/20 disabled:opacity-50 transition-opacity"
          >
            {isStarting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : (
              <>
                게임 시작하기
                <Play className="w-5 h-5 fill-current" />
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}
