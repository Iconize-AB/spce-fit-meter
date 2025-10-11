import { cn } from "@/lib/utils";

interface FitScoreIndicatorProps {
  score: number;
  className?: string;
}

export const FitScoreIndicator = ({ score, className }: FitScoreIndicatorProps) => {
  const getScoreColor = (score: number) => {
    if (score === 0) return "bg-[hsl(var(--score-red))] text-white";
    if (score === 50) return "bg-[hsl(var(--score-orange))] text-white";
    if (score === 100) return "bg-[hsl(var(--score-green))] text-white";
    // For scores that aren't exactly 0, 50, or 100, use gradient based on proximity
    if (score < 50) return "bg-[hsl(var(--score-red))] text-white";
    if (score < 100) return "bg-[hsl(var(--score-orange))] text-white";
    return "bg-[hsl(var(--score-green))] text-white";
  };

  const getScoreLabel = (score: number) => {
    if (score === 0) return "0% fit";
    return `${Math.round(score)}% fit`;
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium transition-colors",
        getScoreColor(score),
        className
      )}
    >
      {getScoreLabel(score)}
    </div>
  );
};
