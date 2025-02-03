type DurationOption = {
    value: number;
    label: string;
};

type DurationSelectorProps = {
    options: DurationOption[];
    onSelect: (duration: number) => void;
};

export function DurationSelector({ options, onSelect }: DurationSelectorProps) {
    return (
        <div className="space-y-4">
            <p className="text-violet-700 dark:text-violet-300 text-center mb-6">
                Выберите длительность сессии
            </p>
            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => onSelect(option.value)}
                    className="w-full p-4 bg-white dark:bg-slate-700 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-102"
                >
                    <span className="text-lg font-semibold text-violet-900 dark:text-violet-100">
                        {option.label}
                    </span>
                </button>
            ))}
        </div>
    );
} 