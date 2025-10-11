import { useMemo } from "react";

interface SpeedometerProps {
  score: number;
}

export const Speedometer = ({ score }: SpeedometerProps) => {
  const rotation = useMemo(() => {
    // Convert score (0-100) to rotation (-90 to 90 degrees)
    return (score / 100) * 180 - 90;
  }, [score]);

  const getScoreColor = (score: number) => {
    if (score === 0) return "hsl(var(--score-red))";
    if (score === 50) return "hsl(var(--score-orange))";
    if (score === 100) return "hsl(var(--score-green))";
    // For scores that aren't exactly 0, 50, or 100, use gradient based on proximity
    if (score < 50) return "hsl(var(--score-red))";
    if (score < 100) return "hsl(var(--score-orange))";
    return "hsl(var(--score-green))";
  };

  const scoreColor = getScoreColor(score);

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-80 h-40">
        {/* Speedometer arc background */}
        <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="xMidYMid meet">
          {/* Background arc */}
          <path
            d="M 20 90 A 80 80 0 0 1 180 90"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="20"
            strokeLinecap="round"
          />
          
          {/* Red section (0-50) */}
          <path
            d="M 20 90 A 80 80 0 0 1 100 10"
            fill="none"
            stroke="hsl(var(--score-red))"
            strokeWidth="20"
            strokeLinecap="round"
            opacity="0.3"
          />
          
          {/* Orange section (50-75) */}
          <path
            d="M 100 10 A 80 80 0 0 1 140 28"
            fill="none"
            stroke="hsl(var(--score-orange))"
            strokeWidth="20"
            strokeLinecap="round"
            opacity="0.3"
          />
          
          {/* Green section (75-100) */}
          <path
            d="M 140 28 A 80 80 0 0 1 180 90"
            fill="none"
            stroke="hsl(var(--score-green))"
            strokeWidth="20"
            strokeLinecap="round"
            opacity="0.3"
          />

          {/* Score indicators */}
          <text x="20" y="95" fontSize="10" fill="hsl(var(--muted-foreground))" textAnchor="start">
            0%
          </text>
          <text x="100" y="5" fontSize="10" fill="hsl(var(--muted-foreground))" textAnchor="middle">
            50%
          </text>
          <text x="180" y="95" fontSize="10" fill="hsl(var(--muted-foreground))" textAnchor="end">
            100%
          </text>

          {/* Needle */}
          <g transform={`rotate(${rotation} 100 90)`}>
            <line
              x1="100"
              y1="90"
              x2="100"
              y2="25"
              stroke={scoreColor}
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="100" cy="90" r="6" fill={scoreColor} />
          </g>
        </svg>

        {/* Center score display */}
        <div className="absolute inset-0 flex items-end justify-center pb-2">
          <div className="text-center">
            <div className="text-4xl font-bold" style={{ color: scoreColor }}>
              {Math.round(score)}%
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-lg font-semibold text-foreground">
          You have got {Math.round(score)}% fit with SP_CE
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          {score === 0 && "Start answering questions to see your fit score"}
          {score > 0 && score < 50 && "Lower fit - Consider reviewing your responses"}
          {score === 50 && "Moderate fit - Good potential alignment"}
          {score > 50 && score < 100 && "Good fit - Strong alignment with SP_CE"}
          {score === 100 && "Perfect fit! SP_CE is ideally suited for your needs"}
        </p>
      </div>
    </div>
  );
};
