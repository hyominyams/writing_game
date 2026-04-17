"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Question } from "@/data/questions";

export type AnswerResult = {
  questionId: number;
  userAnswer: string;
  score: number;
  feedback: string;
};

type GameState = {
  selectedQuestions: Question[];
  timeLimit: number;
  results: AnswerResult[];
  actions: {
    startGame: (questions: Question[], timeLimit: number) => void;
    addResult: (result: AnswerResult) => void;
    resetGame: () => void;
  };
};

const GameContext = createContext<GameState | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [timeLimit, setTimeLimit] = useState(60);
  const [results, setResults] = useState<AnswerResult[]>([]);

  const startGame = (questions: Question[], timeLimit: number) => {
    setSelectedQuestions(questions);
    setTimeLimit(timeLimit);
    setResults([]);
  };

  const addResult = (result: AnswerResult) => {
    setResults((prev) => [...prev, result]);
  };

  const resetGame = () => {
    setSelectedQuestions([]);
    setResults([]);
  };

  return (
    <GameContext.Provider
      value={{
        selectedQuestions,
        timeLimit,
        results,
        actions: { startGame, addResult, resetGame },
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
