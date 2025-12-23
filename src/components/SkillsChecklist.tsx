import { useState } from "react";
import { Skill, categoryLabels, categoryIcons } from "@/data/skillsData";
import { Check, ChevronDown, ExternalLink, BookOpen, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SkillsChecklistProps {
  skills: Skill[];
  selectedSkills: Set<string>;
  onToggleSkill: (skillId: string) => void;
}

const SkillsChecklist = ({ skills, selectedSkills, onToggleSkill }: SkillsChecklistProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(Object.keys(categoryLabels))
  );
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const getPriorityBadge = (priority: string) => {
    const classes = {
      high: 'bg-red-500/20 text-red-400 border-red-500/30',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      low: 'bg-green-500/20 text-green-400 border-green-500/30',
    };
    const labels = { high: 'Alta', medium: 'Media', low: 'Baja' };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs border ${classes[priority as keyof typeof classes]}`}>
        {labels[priority as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {Object.entries(groupedSkills).map(([category, categorySkills]) => (
        <div key={category} className="glass-card overflow-hidden">
          <button
            onClick={() => toggleCategory(category)}
            className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{categoryIcons[category]}</span>
              <span className="font-display font-semibold">{categoryLabels[category]}</span>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                {categorySkills.filter((s) => selectedSkills.has(s.id)).length}/{categorySkills.length}
              </span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                expandedCategories.has(category) ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedCategories.has(category) && (
            <div className="border-t border-border">
              {categorySkills.map((skill, index) => (
                <div key={skill.id}>
                  <div
                    className={`flex items-center gap-4 p-4 hover:bg-muted/20 transition-all cursor-pointer ${
                      index > 0 ? 'border-t border-border/50' : ''
                    }`}
                    onClick={() => onToggleSkill(skill.id)}
                  >
                    {/* Checkbox */}
                    <div
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
                        selectedSkills.has(skill.id)
                          ? 'bg-primary border-primary shadow-glow'
                          : 'border-muted-foreground/50 hover:border-primary/50'
                      }`}
                    >
                      {selectedSkills.has(skill.id) && (
                        <Check className="w-4 h-4 text-primary-foreground" />
                      )}
                    </div>

                    {/* Skill Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-medium ${selectedSkills.has(skill.id) ? 'text-primary' : ''}`}>
                          {skill.name}
                        </span>
                        {getPriorityBadge(skill.priority)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{skill.description}</p>
                    </div>

                    {/* Demand Percentage */}
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                            style={{ width: `${skill.demandPercent}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-primary w-10">{skill.demandPercent}%</span>
                      </div>
                      <span className="text-xs text-muted-foreground">en ofertas</span>
                    </div>

                    {/* Expand Button */}
                    {(skill.resource || skill.project) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedSkill(expandedSkill === skill.id ? null : skill.id);
                        }}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            expandedSkill === skill.id ? 'rotate-180' : ''
                          }`}
                        />
                      </Button>
                    )}
                  </div>

                  {/* Expanded Content */}
                  {expandedSkill === skill.id && (skill.resource || skill.project) && (
                    <div className="px-4 pb-4 pl-14 space-y-3 animate-fade-in">
                      {skill.resource && (
                        <div className="glass-card-hover p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <BookOpen className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">Recurso recomendado</span>
                          </div>
                          <h4 className="font-medium text-sm mb-1">{skill.resource.title}</h4>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{skill.resource.platform}</span>
                            <span>{skill.resource.duration}</span>
                            <span className="text-secondary">{skill.resource.level}</span>
                          </div>
                          <Button variant="neon" size="sm" className="mt-3">
                            Ver curso
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      )}
                      {skill.project && (
                        <div className="glass-card-hover p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Wrench className="w-4 h-4 text-secondary" />
                            <span className="text-sm font-medium">Proyecto sugerido</span>
                          </div>
                          <h4 className="font-medium text-sm">{skill.project.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{skill.project.description}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SkillsChecklist;
