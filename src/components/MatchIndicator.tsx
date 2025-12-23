import { TrendingUp, Zap } from "lucide-react";
import { Skill } from "@/data/skillsData";

interface MatchIndicatorProps {
  matchPercent: number;
  skills: Skill[];
  selectedSkills: Set<string>;
}

const MatchIndicator = ({ matchPercent, skills, selectedSkills }: MatchIndicatorProps) => {
  // Get top 3 high-impact skills the user hasn't selected
  const impactSkills = skills
    .filter((s) => !selectedSkills.has(s.id) && s.priority === 'high')
    .sort((a, b) => b.demandPercent - a.demandPercent)
    .slice(0, 3);

  const getMatchColor = () => {
    if (matchPercent >= 75) return 'hsl(160 70% 50%)';
    if (matchPercent >= 50) return 'hsl(45 100% 50%)';
    return 'hsl(180 100% 50%)';
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-4 mb-6">
        {/* Circular Progress */}
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke={getMatchColor()}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 56}`}
              strokeDashoffset={`${2 * Math.PI * 56 * (1 - matchPercent / 100)}`}
              className="transition-all duration-700 ease-out"
              style={{
                filter: `drop-shadow(0 0 10px ${getMatchColor()})`,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-3xl font-bold" style={{ color: getMatchColor() }}>
              {matchPercent}%
            </span>
            <span className="text-xs text-muted-foreground">Match</span>
          </div>
        </div>

        {/* Match Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="font-display font-semibold">Tu compatibilidad</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {matchPercent >= 75
              ? '¡Excelente! Estás muy cerca del perfil ideal.'
              : matchPercent >= 50
              ? 'Buen progreso. Continúa desarrollando las skills faltantes.'
              : 'Hay oportunidad de crecimiento. ¡Enfócate en las skills prioritarias!'}
          </p>
        </div>
      </div>

      {/* High Impact Skills */}
      {impactSkills.length > 0 && (
        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">Skills de mayor impacto</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {impactSkills.map((skill) => (
              <span
                key={skill.id}
                className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
              >
                {skill.name}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Estas 3 skills te darán mayor impacto inmediato
          </p>
        </div>
      )}
    </div>
  );
};

export default MatchIndicator;
