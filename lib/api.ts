/**
 * api.ts - Production Ready API Service
 *
 * This module connects to an external API to fetch user calendar mood history.
 * It returns an array of mood entries with each entry having a date and mood_rating.
 */

export interface Month {
  name: string;
  season: string;
  slug: string;
}
export const MONTHS: Month[] = [
  // Spring
  { name: 'март', season: 'spring', slug: 'march' },
  { name: 'апрель', season: 'spring', slug: 'april' },
  { name: 'май', season: 'spring', slug: 'may' },
  // Summer
  { name: 'июнь', season: 'summer', slug: 'june' },
  { name: 'июль', season: 'summer', slug: 'july' },
  { name: 'август', season: 'summer', slug: 'august' },
  // Fall
  { name: 'сентябрь', season: 'fall', slug: 'september' },
  { name: 'октябрь', season: 'fall', slug: 'october' },
  { name: 'ноябрь', season: 'fall', slug: 'november' },
  // Winter
  { name: 'декабрь', season: 'winter', slug: 'december' },
  { name: 'январь', season: 'winter', slug: 'january' },
  { name: 'февраль', season: 'winter', slug: 'february' },
];


export interface MoodEntry {
  // An ISO date string in the format "YYYY-MM-DD"

  date: string;
  // Mood rating: 1 (worst) to 5 (best)
  mood_rating: number;
}

export interface MoodEntriesByDay {
  [date: string]: MoodEntry;
}

export interface ApiError {
  code: number;
  message: string;
}


/**
 * Fetches the mood history for a given year and month.
 * 
 * In production, replace the mocked response with an actual API call.
 * Example:
 *   const response = await fetch(`https://api.example.com/mood-history?year=${year}&month=${month}`, { headers: {  ...  } });
 *   if (!response.ok) { throw new Error('Network response was not ok'); }
 *   return await response.json();
 *
 * @param year The year (e.g. 2023)
 * @param month The month (1-12), e.g. 2 for February
 * @returns Promise resolving to an array of MoodEntry objects.
 */
export async function fetchUserCalendarHistory(): Promise<MoodEntry[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mood-diary/mood-entries`, {
    headers: {
      'X-TG-INIT-DATA': window.Telegram.WebApp.initData
    }
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch mood entries, status: ${res.status}`);
  }
  return res.json();
}

export async function fetchUserCalendarHistoryAsDict(): Promise<MoodEntriesByDay> {
  const calendarHistory = await fetchUserCalendarHistory();
  return calendarHistory.reduce((acc, entry) => {
    acc[entry.date] = entry;
    return acc;
  }, {} as MoodEntriesByDay);
}


function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
} 