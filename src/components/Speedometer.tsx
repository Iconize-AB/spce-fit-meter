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
    if (score < 50) return "hsl(var(--score-red))";
    if (score < 100) return "hsl(var(--score-orange))";
    return "hsl(var(--score-green))";
  };

  const getScoreLabel = (score: number) => {
    if (score === 0) return "Start answering questions to see your fit score";
    if (score < 50) return "Lower fit - Consider reviewing your responses";
    if (score === 50) return "Moderate fit - Good potential alignment";
    if (score < 100) return "Good fit - Strong alignment with SP_CE";
    return "Perfect fit! SP_CE is ideally suited for your needs";
  };

  const scoreColor = getScoreColor(score);

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* Speedometer gauge */}
      <div className="relative w-full max-w-md aspect-[2/1]">
        <svg className="w-full h-full" viewBox="0 0 200 110" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "hsl(var(--score-red))", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "hsl(0, 70%, 50%)", stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "hsl(25, 95%, 53%)", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "hsl(var(--score-orange))", stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "hsl(45, 93%, 47%)", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "hsl(55, 95%, 55%)", stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "hsl(75, 75%, 50%)", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "hsl(var(--score-green))", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          
          {/* Red section (0-25%) */}
          <path
            d="M 20 90 A 80 80 0 0 1 60 25"
            fill="none"
            stroke="url(#redGradient)"
            strokeWidth="24"
            strokeLinecap="round"
          />
          
          {/* Orange section (25-50%) */}
          <path
            d="M 60 25 A 80 80 0 0 1 100 10"
            fill="none"
            stroke="url(#orangeGradient)"
            strokeWidth="24"
            strokeLinecap="round"
          />
          
          {/* Yellow section (50-75%) */}
          <path
            d="M 100 10 A 80 80 0 0 1 140 25"
            fill="none"
            stroke="url(#yellowGradient)"
            strokeWidth="24"
            strokeLinecap="round"
          />
          
          {/* Green section (75-100%) */}
          <path
            d="M 140 25 A 80 80 0 0 1 180 90"
            fill="none"
            stroke="url(#greenGradient)"
            strokeWidth="24"
            strokeLinecap="round"
          />

          {/* White dividers */}
          <line x1="60" y1="25" x2="64" y2="30" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <line x1="100" y1="10" x2="100" y2="16" stroke="white" strokeWidth="3" strokeLinecap="round" />
          <line x1="140" y1="25" x2="136" y2="30" stroke="white" strokeWidth="3" strokeLinecap="round" />

          {/* Needle */}
          <g transform={`rotate(${rotation} 100 90)`}>
            <path
              d="M 100 90 L 97 85 L 100 20 L 103 85 Z"
              fill="hsl(var(--foreground))"
              opacity="0.9"
            />
            <circle cx="100" cy="90" r="8" fill="hsl(var(--foreground))" />
            <circle cx="100" cy="90" r="5" fill="hsl(var(--background))" />
          </g>
        </svg>
      </div>

      {/* Score display below gauge */}
      <div className="mt-6 text-center space-y-3">
        <div className="text-5xl font-bold" style={{ color: scoreColor }}>
          {Math.round(score)}%
        </div>
        <p className="text-xl font-semibold text-foreground">
          You have got {Math.round(score)}% fit with SP<span className="text-primary">_</span>CE
        </p>
        <p className="text-sm text-muted-foreground max-w-md">
          {getScoreLabel(score)}
        </p>
      </div>
    </div>
  );
};
