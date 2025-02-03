import { BreathingTechnique } from "@/types/breathing";

type TechniqueSelectorProps = {
    techniques: BreathingTechnique[];
    onSelect: (technique: BreathingTechnique) => void;
};

export function TechniqueSelector({ techniques, onSelect }: TechniqueSelectorProps) {
    return (
        <div className="space-y-4">
            <p className="text-violet-700 dark:text-violet-300 text-center mb-6">
                Выберите технику дыхания для начала
            </p>
            {techniques.map((technique) => (
                <button
                    key={technique.id}
                    onClick={() => onSelect(technique)}
                    className="w-full p-4 bg-white dark:bg-slate-700 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-102 text-left"
                >
                    <h3 className="text-lg font-semibold text-violet-900 dark:text-violet-100">
                        {technique.name}
                    </h3>
                    <p className="text-violet-700 dark:text-violet-300 text-sm">
                        {technique.description}
                    </p>
                </button>
            ))}
        </div>
    );
} 