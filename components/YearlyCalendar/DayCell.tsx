import { cn } from "@/lib/utils";

interface DayCellProps {
    empty: boolean;
    biggerCellSizes: boolean;
    mood?: number;
}

const MOOD_COLORS: { [key: number]: string } = {
    1: '#FF0000',
    2: '#FF7F00',
    3: '#FFBF00',
    4: '#FFFF00',
    5: '#90EE90',
}

export default function DayCell({ mood, empty, biggerCellSizes }: DayCellProps) {
    let cellSizeClasses = 'w-[14px] h-[14px] md:w-[18px] md:h-[18px]';
    if (biggerCellSizes) {
        cellSizeClasses = 'w-[48px] h-[48px] md:w-[48px] md:h-[48px]';



    }
    return (
        <div
            style={mood ? { backgroundColor: MOOD_COLORS[mood] } : {}}

            className={cn(
                !empty && 'flex items-center justify-center border rounded-[1.45px]',
                cellSizeClasses,
                !mood && 'bg-white hover:bg-gray-50 transition-colors duration-200'
            )}
        >
        </div>
    );
} 