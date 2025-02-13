import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Month, MoodEntriesByDay } from './api';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MOOD_EMOJI: Record<number, string> = {
  1: '😢',
  2: '😭',
  3: '😐',
  4: '😊',
  5: '🤩',
}

export function getEmojiByMood(month: Month, moodHistory: MoodEntriesByDay) {
  // use only moodHistory for this month
  const moodEntries = Object.values(moodHistory).filter(entry => entry.date.startsWith(month.name));
  const mood = Math.round(moodEntries.reduce((acc, entry) => acc + entry.mood_rating, 0) / moodEntries.length);
  return MOOD_EMOJI[mood || 3];
}
