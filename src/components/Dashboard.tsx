import { useState, useMemo } from "react";
import { jobRoles, Skill, countries } from "@/data/skillsData";
import SkillsChecklist from "./SkillsChecklist";
import SkillRadar from "./SkillRadar";
import MatchIndicator from "./MatchIndicator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Download, MessageSquare } from "lucide-react";

interface DashboardProps {
  selection: {
    roleId: string;
    level: 'junior' | 'mid' | 'senior';
    country: string;
    hoursPerWeek: number;
  };
  onBack: () => void;
}

const Dashboard = ({ selection, onBack }: DashboardProps) => {
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(new Set());

  const role = jobRoles.find((r) => r.id === selection.roleId)!;
  const skills = role.skills[selection.level];
  const country = countries.find((c) => c.code === selection.country);
  const levelLabels = { junior: 'Junior', mid: 'Mid-Level', senior: 'Senior' };

  const toggleSkill = (skillId: string) => {
    const newSelected = new Set(selectedSkills);
    if (newSelected.has(skillId)) {
      newSelected.delete(skillId);
    } else {
      newSelected.add(skillId);
    }
    setSelectedSkills(newSelected);
  };

  const matchPercent = useMemo(() => {
    if (skills.length === 0) return 0;
    const totalWeight = skills.reduce((sum, s) => sum + s.demandPercent, 0);
    const selectedWeight = skills
      .filter((s) => selectedSkills.has(s.id))
      .reduce((sum, s) => sum + s.demandPercent, 0);
    return Math.round((selectedWeight / totalWeight) * 100);
  }, [skills, selectedSkills]);

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Button variant="ghost" onClick={onBack} className="mb-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
            <h1 className="font-display text-3xl font-bold">
              <span className="text-foreground">{role.icon} {role.title}</span>
              <span className="text-primary"> {levelLabels[selection.level]}</span>
            </h1>
            <p className="text-muted-foreground mt-1">
              Mercado: {country?.name} • {selection.hoursPerWeek}h/semana disponibles
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reiniciar
            </Button>
            <Button variant="neon" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Source Note */}
        <div className="glass-card p-3 mb-6 text-center">
          <p className="text-xs text-muted-foreground">
            📊 Basado en análisis de ofertas laborales recientes en LinkedIn, Indeed y plataformas similares
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Match & Radar */}
          <div className="lg:col-span-1 space-y-6">
            <MatchIndicator
              matchPercent={matchPercent}
              skills={skills}
              selectedSkills={selectedSkills}
            />
            <SkillRadar skills={skills} selectedSkills={selectedSkills} />
            
            {/* Quick Stats */}
            <div className="glass-card p-4">
              <h3 className="font-display font-semibold mb-3">Resumen</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Skills totales:</span>
                  <span className="font-medium">{skills.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dominadas:</span>
                  <span className="font-medium text-secondary">{selectedSkills.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Por aprender:</span>
                  <span className="font-medium text-primary">{skills.length - selectedSkills.size}</span>
                </div>
                <div className="neon-line my-3" />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Prioridad alta:</span>
                  <span className="font-medium text-red-400">
                    {skills.filter((s) => s.priority === 'high' && !selectedSkills.has(s.id)).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Quiz CTA */}
            <div className="glass-card-hover p-4 glow-border-accent">
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="w-5 h-5 text-accent" />
                <h3 className="font-display font-semibold">Quiz de Orientación</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Responde un breve quiz para obtener recomendaciones personalizadas.
              </p>
              <Button variant="neon-accent" size="sm" className="w-full">
                Comenzar Quiz
              </Button>
            </div>
          </div>

          {/* Right Column - Skills Checklist */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold">Skills Requeridas</h2>
              <span className="text-sm text-muted-foreground">
                Marca las que ya dominas
              </span>
            </div>
            <SkillsChecklist
              skills={skills}
              selectedSkills={selectedSkills}
              onToggleSkill={toggleSkill}
            />
          </div>
        </div>

        {/* Portfolio Checklist */}
        <div className="mt-8 glass-card p-6 glow-border-secondary">
          <h3 className="font-display text-xl font-semibold mb-2">🎯 Portfolio-Ready Checklist</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Si completas estos cursos y proyectos, cubrirás ~{Math.min(matchPercent + 20, 95)}% del perfil requerido
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {skills
              .filter((s) => !selectedSkills.has(s.id) && s.priority === 'high')
              .slice(0, 6)
              .map((skill) => (
                <div key={skill.id} className="flex items-center gap-2 text-sm p-2 rounded-lg bg-muted/30">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>{skill.name}</span>
                  {skill.resource && (
                    <span className="text-xs text-muted-foreground ml-auto">
                      {skill.resource.duration}
                    </span>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
