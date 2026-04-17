"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useGame } from "@/components/GameProvider";
import { questions } from "@/data/questions";
import { RefreshCw, Trophy, Target, Award, ArrowRight } from "lucide-react";

export default function ResultPage() {
  const router = useRouter();
  const { results, actions } = useGame();
  
  const total = results.reduce((acc, curr) => acc + curr.score, 0);
  const average = results.length > 0 ? Math.round(total / results.length) : 0;

  useEffect(() => {
    if (results.length === 0) {
      router.replace("/");
      return;
    }

    // Fire confetti for wow effect
    if (average > 0) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const interval: ReturnType<typeof setInterval> = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: Math.random(), y: Math.random() - 0.2 },
          })
        );
      }, 250);
      
      return () => clearInterval(interval);
    }
  }, [results, router]);

  if (results.length === 0) return null;

  const handleRestart = () => {
    actions.resetGame();
    router.push("/");
  };

  const getRankMessage = (score: number) => {
    if (score >= 90) return "훌륭한 작가예요! 🏆";
    if (score >= 70) return "아주 잘했어요! 🌟";
    if (score >= 50) return "멋진 시도예요! 👏";
    return "조금 더 연습해봐요! 💪";
  };

  return (
    <main className="flex-1 overflow-y-auto bg-slate-950 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Top Summary Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl"
        >
          {/* Glassmorphism accents */}
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="text-center md:text-left space-y-2">
              <h1 className="text-4xl font-extrabold text-white">결과를 확인하세요!</h1>
              <p className="text-slate-400 text-lg">참여하신 {results.length}개의 문항에 대한 종합 평가입니다.</p>
            </div>

            <div className="flex gap-6">
              <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center min-w-[140px] shadow-inner">
                <Target className="w-8 h-8 text-indigo-400 mb-2" />
                <span className="text-slate-400 text-sm font-medium">평균 점수</span>
                <span className="text-4xl font-black text-white">{average}</span>
              </div>
              
              <div className="bg-slate-950/50 rounded-2xl p-6 border border-slate-800 flex flex-col items-center justify-center min-w-[140px] shadow-inner">
                <Award className="w-8 h-8 text-purple-400 mb-2" />
                <span className="text-slate-400 text-sm font-medium">종합 랭크</span>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 text-center mt-1">
                  {getRankMessage(average)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Detailed Results List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-200 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            문항별 상세 피드백
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {results.map((res, idx) => {
              const q = questions.find((x) => x.id === res.questionId);
              if (!q) return null;
              
              const isHigh = res.score >= 80;
              const isLow = res.score < 50;

              return (
                <motion.div 
                  key={res.questionId}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-lg"
                >
                  <div className="h-40 relative">
                    <img src={q.imageUrl} alt={q.alt} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <span className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10 uppercase">
                        문제 {idx + 1}
                      </span>
                    </div>
                    
                    {/* Score Ribbon */}
                    <div className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-xl shadow-black/50 border-4 border-slate-900 ${
                      isHigh ? 'bg-green-500 text-white' : isLow ? 'bg-red-500 text-white' : 'bg-yellow-500 text-slate-900'
                    }`}>
                      {res.score}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col gap-4">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">내 답변</h4>
                      <p className="text-slate-200 bg-slate-950 p-3 rounded-lg border border-slate-800/50 text-sm leading-relaxed">
                        {res.userAnswer}
                      </p>
                    </div>

                    <div className="flex-1">
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1 mt-2 flex items-center gap-1">
                        <ArrowRight className="w-3 h-3" /> AI 피드백
                      </h4>
                      <p className={`text-sm font-medium ${isHigh ? 'text-green-400' : isLow ? 'text-red-400' : 'text-yellow-400'}`}>
                        {res.feedback}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Action Bottom */}
        <div className="flex justify-center pt-8 pb-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRestart}
            className="flex items-center gap-2 bg-slate-100 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-white transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            다시 시작하기
          </motion.button>
        </div>

      </div>
    </main>
  );
}
