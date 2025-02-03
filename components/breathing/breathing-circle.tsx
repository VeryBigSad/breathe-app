import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Phase } from "@/types/breathing";

type BreathingCircleProps = {
    phase: Phase;
    timeLeft: number;
    isBreathing: boolean;
    isCountingDown: boolean;
    getInstructions: () => string;
    onClick: () => void;
    disabled: boolean;
};

export function BreathingCircle({
    phase,
    timeLeft,
    isBreathing,
    isCountingDown,
    getInstructions,
    onClick,
    disabled
}: BreathingCircleProps) {
    const circleRef = useRef<HTMLDivElement>(null);
    const timeLeftRef = useRef(timeLeft);

    useEffect(() => {
        timeLeftRef.current = timeLeft;
    }, [timeLeft]);

    useEffect(() => {
        console.log('Phase changed to:', phase);
        if (circleRef.current) {
            circleRef.current.style.setProperty('--breath-duration', `${timeLeftRef.current}s`);
        }
    }, [phase]);

    const getCircleClassName = () => {
        const baseClass = "breathing-circle absolute inset-0 rounded-full";
        const phaseClass = phase === "hold1" || phase === "hold2" ? "hold" : phase;

        if (!isBreathing) {
            return cn(baseClass, phaseClass, "scale-100");
        }

        return cn(baseClass, phaseClass, {
            "animate-inhale": phase === "inhale",
            "scale-[1.2]": phase === "hold1",
            "animate-exhale": phase === "exhale",
            "scale-[1]": phase === "hold2",
        });
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="relative w-48 h-48 mx-auto mb-8 group"
        >
            <div ref={circleRef} className={getCircleClassName()} />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                    <p className={cn(
                        "text-xl font-bold text-violet-900 dark:text-violet-100",
                        { "text-3xl": isCountingDown }
                    )}>
                        {getInstructions()}
                    </p>
                    {!isCountingDown && isBreathing && (
                        <p className="text-lg text-violet-700 dark:text-violet-300">{timeLeft}с</p>
                    )}
                </div>
            </div>
        </button>
    );
} 