"use client";

import Link from 'next/link';
import { fetchUserCalendarHistoryAsDict, MONTHS, MoodEntriesByDay } from '@/lib/api';
import MonthGrid from '@/components/YearlyCalendar/MonthGrid';
import { useEffect, useState } from 'react';

const MONTH_TO_SEASON: Record<string, 'spring' | 'summer' | 'fall' | 'winter'> = {
    'march': 'spring',
    'april': 'spring',
    'may': 'spring',
    'june': 'summer',
    'july': 'summer',
    'august': 'summer',
    'september': 'fall',
    'october': 'fall',
    'november': 'fall',
    'december': 'winter',
    'january': 'winter',
    'february': 'winter'
};

const SEASON_COLORS: Record<'spring' | 'summer' | 'fall' | 'winter', string> = {
    spring: '#FF96C3',
    summer: '#0A9F14',
    fall: '#FFCC00',
    winter: '#87CEEB'
};

export default function MonthPageClient({ params }: { params: { month: string } }) {
    const monthParam = params.month.toLowerCase();
    const season = MONTH_TO_SEASON[monthParam] || 'spring';
    const month = MONTHS.find(m => m.slug === monthParam) || MONTHS[0];

    const displayMonth = month?.name.charAt(0).toUpperCase() + month?.name.slice(1);
    const [moodHistory, setMoodHistory] = useState<MoodEntriesByDay>({});

    useEffect(() => {
        fetchUserCalendarHistoryAsDict()
            .then(setMoodHistory)
            .catch(error => console.error('Failed to fetch mood history:', error));
    }, []);

    return (
        <div className="min-h-screen text-white">
            <div className="container mx-auto px-4 py-8">
                <Link href="/calendar" className="text-lg text-blue-300 hover:underline mb-4 inline-block">
                    ← Вернуться к календарю
                </Link>
                <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
                    <h1 className="text-4xl italic font-bold mb-4" style={{ color: SEASON_COLORS[season] }}>
                        {displayMonth}
                    </h1>
                    {month && <MonthGrid month={month} moodHistory={moodHistory} large={true} />}
                </div>
            </div>
        </div>
    );
} 