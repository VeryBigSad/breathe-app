'use client';

import { useEffect, useState } from 'react';

type BreathState = 'ВДОХ' | 'ВЫДОХ' | 'ЗАДЕРЖИ';

const BREATH_STATES: BreathState[] = ['ВДОХ', 'ЗАДЕРЖИ', 'ВЫДОХ', 'ЗАДЕРЖИ'];
const BREATH_DURATIONS = {
  'ВДОХ': 4,
  'ВЫДОХ': 4,
  'ЗАДЕРЖИ': 4
};

const BreathingTimer = () => {
  const [progress, setProgress] = useState(0);
  const [currentState, setCurrentState] = useState<BreathState>('ВДОХ');
  const [timeLeft, setTimeLeft] = useState(BREATH_DURATIONS['ВДОХ']);

  // SVG parameters for the progress ring
  const size = 310;
  const strokeWidth = 10;
  const padding = 30; // Padding between circle and progress ring
  const center = size / 2;
  const radius = center - strokeWidth / 2 - padding;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let stateTimeout: NodeJS.Timeout;

    const startBreathCycle = () => {
      let currentIndex = BREATH_STATES.indexOf(currentState);
      let currentDuration = BREATH_DURATIONS[currentState];
      let startTime = Date.now();

      // Update progress and time every 10ms
      interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        const remaining = Math.max(0, currentDuration - elapsed);
        const currentProgress = ((currentDuration - remaining) / currentDuration) * 100;

        setTimeLeft(Math.ceil(remaining));
        setProgress(currentProgress);
      }, 10);

      // Schedule next breath state
      stateTimeout = setTimeout(() => {
        clearInterval(interval);
        const nextIndex = (currentIndex + 1) % BREATH_STATES.length;
        setCurrentState(BREATH_STATES[nextIndex]);
      }, currentDuration * 1000);
    };

    startBreathCycle();

    return () => {
      clearInterval(interval);
      clearTimeout(stateTimeout);
    };
  }, [currentState]);

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="relative flex items-center justify-center overflow-visible">
        {/* New Ellipse SVG added as background decoration */}
        <svg
          className="absolute"
          style={{ left: 140, top: 0, zIndex: 9999 }}
          width="512"
          height="612"
        >
          <defs>
            <radialGradient
              id="radial73"
              cx="50%"
              cy="50%"
              r="43%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" style={{ stopColor: '#466AFB', stopOpacity: 0.5 }} />
              <stop offset="100%" style={{ stopColor: '#2a3f95', stopOpacity: 0.01 }} />
            </radialGradient>
            <filter id="layerBlur">
              <feGaussianBlur stdDeviation="30" />
            </filter>
          </defs>
          <ellipse
            cx="280.5" /* 587/2 */
            cy="280.5"
            rx="280.5"
            ry="280.5"
            fill="url(#radial73)"
            filter="url(#layerBlur)"
          />
        </svg>

        {/* Main Circle with Progress Ring */}
        <div
          className="absolute w-[270px] h-[270px] rounded-full flex flex-col items-center justify-center"
          style={{
            backgroundColor: '#7792FD',
            opacity: 1,
            zIndex: 1,
          }}
        >
          <span className="text-white font-bold text-[72px]">{timeLeft}</span>
          <span className="text-white italic text-[32px] mt-2">{currentState}</span>
        </div>

        <svg
          width={size}
          height={size}
          className="-rotate-90"
          style={{ zIndex: 1 }}
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="white"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default BreathingTimer;