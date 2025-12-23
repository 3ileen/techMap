import { useState } from "react";
import { X, Search, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { allSkillTags, regions, modalities, levels, roleOptions } from "@/data/jobListingsData";

export interface FilterState {
  search: string;
  role: string;
  skills: string[];
  modality: string;
  region: string;
  level: string;
}

interface JobFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const JobFilters = ({ filters, onFiltersChange }: JobFiltersProps) => {
  const [skillsOpen, setSkillsOpen] = useState(false);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const toggleSkill = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    updateFilter('skills', newSkills);
  };

  const removeSkill = (skill: string) => {
    updateFilter('skills', filters.skills.filter(s => s !== skill));
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: '',
      role: '',
      skills: [],
      modality: '',
      region: '',
      level: '',
    });
  };

  const hasActiveFilters = filters.role || filters.skills.length > 0 || filters.modality || filters.region || filters.level;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Buscar por puesto, empresa o habilidad..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="pl-12 h-12 bg-card border-border/50 focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap gap-3">
        {/* Role Select */}
        <Select value={filters.role} onValueChange={(value) => updateFilter('role', value)}>
          <SelectTrigger className="w-[180px] bg-card border-border/50 hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-primary">🎯</span>
              <SelectValue placeholder="Puesto / Rol" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            {roleOptions.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Skills Multi-select */}
        <Popover open={skillsOpen} onOpenChange={setSkillsOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="bg-card border-border/50 hover:border-primary/30 transition-colors min-w-[180px] justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-primary">🧠</span>
                <span>Habilidades {filters.skills.length > 0 && `(${filters.skills.length})`}</span>
              </div>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-card border-border p-4" align="start">
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Selecciona las habilidades:</p>
              <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
                {allSkillTags.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 text-sm rounded-full border transition-all duration-200 ${
                      filters.skills.includes(skill)
                        ? 'bg-primary/20 border-primary text-primary'
                        : 'bg-card border-border/50 text-foreground hover:border-primary/30'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Modality Select */}
        <Select value={filters.modality} onValueChange={(value) => updateFilter('modality', value)}>
          <SelectTrigger className="w-[150px] bg-card border-border/50 hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-primary">🏢</span>
              <SelectValue placeholder="Modalidad" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            {modalities.map((mod) => (
              <SelectItem key={mod.value} value={mod.value}>
                {mod.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Region Select */}
        <Select value={filters.region} onValueChange={(value) => updateFilter('region', value)}>
          <SelectTrigger className="w-[170px] bg-card border-border/50 hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-primary">🌍</span>
              <SelectValue placeholder="Región / País" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            {regions.map((region) => (
              <SelectItem key={region.code} value={region.code}>
                {region.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Level Select */}
        <Select value={filters.level} onValueChange={(value) => updateFilter('level', value)}>
          <SelectTrigger className="w-[130px] bg-card border-border/50 hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-2">
              <span className="text-primary">🎚</span>
              <SelectValue placeholder="Nivel" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            {levels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear All Button */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <Filter className="h-4 w-4 mr-2" />
            Limpiar filtros
          </Button>
        )}
      </div>

      {/* Active Skill Chips */}
      {filters.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {filters.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-sm text-primary"
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobFilters;
