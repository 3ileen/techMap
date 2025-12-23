import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import { Skill, categoryLabels } from '@/data/skillsData';

interface SkillRadarProps {
  skills: Skill[];
  selectedSkills: Set<string>;
}

const SkillRadar = ({ skills, selectedSkills }: SkillRadarProps) => {
  // Group skills by category and calculate averages
  const categoryData = Object.keys(categoryLabels).map((category) => {
    const categorySkills = skills.filter((s) => s.category === category);
    if (categorySkills.length === 0) return null;

    const requiredAvg = categorySkills.reduce((sum, s) => sum + s.demandPercent, 0) / categorySkills.length;
    const selectedInCategory = categorySkills.filter((s) => selectedSkills.has(s.id));
    const userAvg = selectedInCategory.length > 0
      ? (selectedInCategory.reduce((sum, s) => sum + s.demandPercent, 0) / categorySkills.length)
      : 0;

    return {
      category: categoryLabels[category],
      required: Math.round(requiredAvg),
      user: Math.round(userAvg),
      fullMark: 100,
    };
  }).filter(Boolean);

  return (
    <div className="glass-card p-6 h-[400px]">
      <h3 className="font-display text-lg font-semibold mb-4 text-center">Radar de Skills</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={categoryData}>
          <PolarGrid 
            stroke="hsl(var(--border))" 
            strokeOpacity={0.5}
          />
          <PolarAngleAxis 
            dataKey="category" 
            tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
            tickLine={false}
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
            tickCount={5}
          />
          <Radar
            name="Requerido"
            dataKey="required"
            stroke="hsl(180 100% 50%)"
            fill="hsl(180 100% 50%)"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Radar
            name="Tu perfil"
            dataKey="user"
            stroke="hsl(160 70% 50%)"
            fill="hsl(160 70% 50%)"
            fillOpacity={0.4}
            strokeWidth={2}
          />
          <Legend 
            wrapperStyle={{ 
              paddingTop: '20px',
              fontSize: '12px',
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillRadar;