export type BreathingTechnique = {
  id: string;
  name: string;
  description: string;
  pattern: {
    inhale: number;
    hold1?: number;
    exhale: number;
    hold2?: number;
  };
  duration: number;
};

export type Phase = "inhale" | "hold1" | "exhale" | "hold2"; 