'use client';

import DayCell from '@/components/YearlyCalendar/DayCell';
import { Month, MoodEntriesByDay, MoodEntry } from '@/lib/api';

interface MonthGridProps {
  month: Month;
  // year: number;
  moodHistory: MoodEntriesByDay;
  large?: boolean;
}

export default function MonthGrid({ month, moodHistory, large = false }: MonthGridProps) {
  const year = new Date().getFullYear();
  const MONTH_INDICES: Record<string, number> = {
    'январь': 0,
    'февраль': 1,
    'март': 2,
    'апрель': 3,
    'май': 4,
    'июнь': 5,
    'июль': 6,
    'август': 7,
    'сентябрь': 8,
    'октябрь': 9,
    'ноябрь': 10,
    'декабрь': 11,
  };

  const monthIndex = MONTH_INDICES[month.name.toLowerCase()];
  // Get the first day of the month and adjust so Monday is first (0)
  const firstDay = new Date(year, monthIndex, 1);
  const dayOfWeek = firstDay.getDay(); // Sunday = 0, Monday = 1, etc.
  const offset = (dayOfWeek + 6) % 7; // shift so Monday becomes index 0

  // Determine number of days in the month
  const numDays = new Date(year, monthIndex + 1, 0).getDate();

  // Calculate total number of cells needed to form complete rows (7 per row)
  const totalCells = Math.ceil((offset + numDays) / 7) * 7;

  // Create an array representing each cell: a number for valid days, null otherwise.
  const days: (number | null)[] = Array.from({ length: totalCells }, (_, i) =>
    i >= offset && i < offset + numDays ? i - offset + 1 : null
  );

  return (
    <div className="grid grid-cols-7 gap-px">
      {days.map((day, idx) => {
        if (!day) {
          return <DayCell key={idx} empty={true} biggerCellSizes={large} />
        }

        // Construct the date string for this day in "YYYY-MM-DD" format.
        const dayString = String(day).padStart(2, '0');
        const monthString = String(monthIndex + 1).padStart(2, '0');
        const currentDateStr = `${year}-${monthString}-${dayString}`;

        // Determine if there's mood data for this day.
        const moodEntry = moodHistory[currentDateStr];
        return <DayCell key={idx} empty={false} mood={moodEntry?.mood_rating} biggerCellSizes={large} />;
      })}
    </div>
  );
}
