'use client';

import { cn, getEmojiByMood } from '@/lib/utils';
import MonthGrid from './MonthGrid';
import Link from 'next/link';
import { fetchUserCalendarHistory, fetchUserCalendarHistoryAsDict, MONTHS, MoodEntriesByDay, MoodEntry } from '@/lib/api';
import { useState, useEffect } from 'react';
type Season = 'spring' | 'summer' | 'fall' | 'winter';


const SEASON_COLORS: Record<Season, string> = {
  spring: '#FF96C3',
  summer: '#0A9F14',
  fall: '#FFCC00',
  winter: '#87CEEB',
};

export default function YearlyCalendar() {
  const [moodHistory, setMoodHistory] = useState<MoodEntriesByDay>({});

  useEffect(() => {
    fetchUserCalendarHistoryAsDict()
      .then(setMoodHistory)
      .catch(error => console.error('Failed to fetch mood history:', error));
  });

  return (
    <div className="w-full max-w-[1200px] mx-auto p-4 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <h1 className="text-9xl font-bold text-gray-200 opacity-20 rotate-[315deg]">
          СЕНТИ
        </h1>
      </div>
      <div className="relative z-10 grid grid-cols-3 gap-8">
        {MONTHS.map((month, index) => (
          <div
            key={month.name}
            className={cn("flex flex-col", {
              "relative": month.name === "сентябрь" || month.name === "май" || month.name === "февраль"
            })}
          >
            <Link
              href={`/month/${month.slug}`}
              className="block hover:opacity-75 transition-opacity"
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="text-xl font-bold italic"
                  style={{ color: SEASON_COLORS[month.season as Season] }}
                >
                  {month.name}
                </h3>
                <span role="img" aria-label="mood">
                  {getEmojiByMood(month, moodHistory)}
                </span>
              </div>
              <MonthGrid
                month={month}
                // year={(month.name === 'январь' || month.name === 'февраль')
                //   ? currentYear + 1
                //   : currentYear}
                moodHistory={moodHistory}
              />
            </Link>
            {month.name === 'сентябрь' && (
              <div className="absolute left-0 bottom-0 pointer-events-none text-4xl transform translate-y-1/2">
                🍂
              </div>
            )}
            {month.name === 'май' && (
              <div className="absolute top-0 right-0 pointer-events-none text-4xl transform translate-x-1/2 -translate-y-1/2 rotate-6">
                🌸
              </div>
            )}
            {month.name === 'февраль' && (
              <div className="absolute top-0 right-0 pointer-events-none text-4xl transform translate-x-1/2 -translate-y-1/2 -rotate-6">
                ❄️
              </div>
            )}
            {month.name === 'июль' && (
              <div className="absolute top-90 left-10 pointer-events-none text-3xl transform translate-x-1/2 -translate-y-1/2 rotate-6">
                🐝
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}