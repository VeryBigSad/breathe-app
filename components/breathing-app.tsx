"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, X, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { TechniqueSelector } from "./breathing/technique-selector";
import { DurationSelector } from "./breathing/duration-selector";
import { BreathingCircle } from "./breathing/breathing-circle";
import { BreathingTechnique, Phase } from "@/types/breathing";

const techniques: BreathingTechnique[] = [
  {
    id: "4-7-8",
    name: "4-7-8 Дыхание",
    description: "Глубокое дыхание для расслабления",
    pattern: {
      inhale: 4,
      hold1: 7,
      exhale: 8,
    },
    duration: 19,
  },
  {
    id: "box",
    name: "Коробочное дыхание",
    description: "Равномерное дыхание для концентрации",
    pattern: {
      inhale: 4,
      hold1: 4,
      exhale: 4,
      hold2: 4,
    },
    duration: 16,
  },
  {
    id: "quick",
    name: "Быстрое восстановление",
    description: "Быстрое успокаивающее дыхание",
    pattern: {
      inhale: 3,
      exhale: 3,
    },
    duration: 6,
  },
];

const durationOptions = [
  { value: 1, label: "1 минута" },
  { value: 3, label: "3 минуты" },
  { value: 5, label: "5 минут" },
];

export default function BreathingApp() {
  const [selectedTechnique, setSelectedTechnique] = useState<BreathingTechnique | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const [isBreathing, setIsBreathing] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [phase, setPhase] = useState<"inhale" | "hold1" | "exhale" | "hold2">("inhale");
  const [timeLeft, setTimeLeft] = useState(0);
  const [sessionTimeLeft, setSessionTimeLeft] = useState(0);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isSessionComplete, setIsSessionComplete] = useState(false);
  const [audio] = useState(typeof Audio !== "undefined" ? new Audio("/nature-sound.mp3") : null);

  useEffect(() => {
    if (audio) {
      audio.loop = true;
      if (isBreathing && isSoundEnabled) {
        audio.play().catch(() => { });
      } else {
        audio.pause();
      }
    }
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, [isBreathing, isSoundEnabled, audio]);

  useEffect(() => {
    if (!isBreathing || !selectedTechnique) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          const pattern = selectedTechnique.pattern;
          switch (phase) {
            case "inhale":
              setPhase(pattern.hold1 ? "hold1" : "exhale");
              return pattern.hold1 || pattern.exhale;
            case "hold1":
              setPhase("exhale");
              return pattern.exhale;
            case "exhale":
              setPhase(pattern.hold2 ? "hold2" : "inhale");
              return pattern.hold2 || pattern.inhale;
            case "hold2":
              setPhase("inhale");
              return pattern.inhale;
          }
        }
        return prev - 1;
      });

      setSessionTimeLeft((prev) => {
        if (prev <= 0) {
          setIsSessionComplete(true);
          stopBreathing();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isBreathing, phase, selectedTechnique]);

  useEffect(() => {
    if (isCountingDown && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (isCountingDown && countdown === 0) {
      setIsCountingDown(false);
      setIsBreathing(true);
      setPhase("inhale");
      if (selectedTechnique) {
        setTimeLeft(selectedTechnique.pattern.inhale);
        setSessionTimeLeft(selectedDuration! * 60);
      }
    }
  }, [isCountingDown, countdown, selectedTechnique, selectedDuration]);

  const selectTechnique = (technique: BreathingTechnique) => {
    setSelectedTechnique(technique);
    setSelectedDuration(null);
    setIsSessionComplete(false);
  };

  const selectDuration = (duration: number) => {
    setSelectedDuration(duration);
  };

  const startBreathing = () => {
    if (!selectedTechnique || !selectedDuration || isBreathing || isCountingDown) return;
    setCountdown(3);
    setIsCountingDown(true);
  };

  const stopBreathing = () => {
    setIsBreathing(false);
    setIsCountingDown(false);
    setSelectedTechnique(null);
    setSelectedDuration(null);
    setCountdown(3);
    setSessionTimeLeft(0);
    setIsSessionComplete(false);
  };

  const restartSession = () => {
    setIsSessionComplete(false);
    startBreathing();
  };

  const getInstructions = () => {
    if (!isBreathing && !isCountingDown) {
      return "Нажмите, чтобы начать";
    }
    if (isCountingDown) {
      return countdown.toString();
    }
    switch (phase) {
      case "inhale":
        return "Вдохните";
      case "hold1":
      case "hold2":
        return "Задержите дыхание";
      case "exhale":
        return "Выдохните";
    }
  };

  const getProgressPercentage = () => {
    if (!selectedDuration || !isBreathing) return 0;
    const totalSeconds = selectedDuration * 60;
    const progress = ((totalSeconds - sessionTimeLeft) / totalSeconds) * 100;
    return Math.min(progress, 100);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn(
      "max-w-md mx-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 min-h-[calc(100vh-12rem)] relative",
      { "backdrop-blur-md": isSessionComplete }
    )}>
      {isSessionComplete ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white/40 dark:bg-slate-800/40 backdrop-blur-md rounded-2xl">
          <div className="flex gap-4">
            <button
              onClick={stopBreathing}
              className="p-4 rounded-full bg-white dark:bg-slate-700 shadow-md hover:shadow-lg transition-all"
            >
              <X className="w-8 h-8 text-violet-900 dark:text-violet-100" />
            </button>
            <button
              onClick={restartSession}
              className="p-4 rounded-full bg-white dark:bg-slate-700 shadow-md hover:shadow-lg transition-all"
            >
              <RotateCcw className="w-8 h-8 text-violet-900 dark:text-violet-100" />
            </button>
          </div>
        </div>
      ) : !selectedTechnique ? (
        <TechniqueSelector techniques={techniques} onSelect={selectTechnique} />
      ) : !selectedDuration ? (
        <DurationSelector options={durationOptions} onSelect={selectDuration} />
      ) : (
        <div className="text-center h-full flex flex-col justify-between">
          <BreathingCircle
            phase={phase}
            timeLeft={timeLeft}
            isBreathing={isBreathing}
            isCountingDown={isCountingDown}
            getInstructions={getInstructions}
            onClick={startBreathing}
            disabled={isBreathing || isCountingDown}
          />

          <div className="mt-auto">
            {isBreathing && (
              <p className="text-lg text-violet-700 dark:text-violet-300 mb-4">
                Осталось: {formatTime(sessionTimeLeft)}
              </p>
            )}

            <div className="relative mb-12">
              {/* Progress bar - increased height to 3px (1.5x) */}
              <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-1000"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>
            </div>

            {/* Control buttons moved to bottom left */}
            <div className="absolute bottom-6 left-6 flex items-center gap-2">
              <button
                onClick={stopBreathing}
                className="p-2 rounded-full bg-white dark:bg-slate-700 shadow-md hover:shadow-lg transition-all"
              >
                <X className="w-6 h-6 text-violet-900 dark:text-violet-100" />
              </button>
              <button
                onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                className="p-2 rounded-full bg-white dark:bg-slate-700 shadow-md hover:shadow-lg transition-all"
              >
                {isSoundEnabled ? (
                  <Volume2 className="w-6 h-6 text-violet-900 dark:text-violet-100" />
                ) : (
                  <VolumeX className="w-6 h-6 text-violet-900 dark:text-violet-100" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}