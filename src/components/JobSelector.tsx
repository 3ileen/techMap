import { useState } from "react";
import { Button } from "@/components/ui/button";
import { jobRoles, countries } from "@/data/skillsData";
import { ChevronRight, Clock, MapPin, Briefcase, GraduationCap } from "lucide-react";

interface JobSelectorProps {
  onSelect: (selection: {
    roleId: string;
    level: 'junior' | 'mid' | 'senior';
    country: string;
    hoursPerWeek: number;
  }) => void;
}

const levels = [
  { id: 'junior', label: 'Junior', description: '0-2 años de experiencia' },
  { id: 'mid', label: 'Mid', description: '2-5 años de experiencia' },
  { id: 'senior', label: 'Senior', description: '5+ años de experiencia' },
] as const;

const hoursOptions = [
  { value: 5, label: '5 horas', description: 'Ritmo relajado' },
  { value: 10, label: '10 horas', description: 'Ritmo moderado' },
  { value: 20, label: '20 horas', description: 'Dedicación alta' },
  { value: 40, label: '40+ horas', description: 'Tiempo completo' },
];

const JobSelector = ({ onSelect }: JobSelectorProps) => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<'junior' | 'mid' | 'senior' | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedHours, setSelectedHours] = useState<number | null>(null);

  const handleNext = () => {
    if (step === 4 && selectedRole && selectedLevel && selectedCountry && selectedHours) {
      onSelect({
        roleId: selectedRole,
        level: selectedLevel,
        country: selectedCountry,
        hoursPerWeek: selectedHours,
      });
    } else {
      setStep(step + 1);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return selectedRole !== null;
      case 2: return selectedLevel !== null;
      case 3: return selectedCountry !== null;
      case 4: return selectedHours !== null;
      default: return false;
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-4xl w-full">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-300 ${
                  s === step
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : s < step
                    ? 'bg-primary/30 text-primary'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {s}
              </div>
              {s < 4 && (
                <div
                  className={`w-12 h-0.5 mx-2 transition-all duration-300 ${
                    s < step ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="glass-card p-8 animate-scale-in">
          {step === 1 && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-6 h-6 text-primary" />
                <h2 className="font-display text-2xl font-bold">¿Qué puesto te interesa?</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobRoles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`p-6 rounded-xl border text-left transition-all duration-300 ${
                      selectedRole === role.id
                        ? 'border-primary bg-primary/10 shadow-glow'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  >
                    <span className="text-3xl mb-3 block">{role.icon}</span>
                    <h3 className="font-display text-lg font-semibold mb-1">{role.title}</h3>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-6 h-6 text-primary" />
                <h2 className="font-display text-2xl font-bold">¿Qué nivel buscas?</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {levels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedLevel(level.id)}
                    className={`p-6 rounded-xl border text-left transition-all duration-300 ${
                      selectedLevel === level.id
                        ? 'border-primary bg-primary/10 shadow-glow'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  >
                    <h3 className="font-display text-xl font-semibold mb-2">{level.label}</h3>
                    <p className="text-sm text-muted-foreground">{level.description}</p>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-primary" />
                <h2 className="font-display text-2xl font-bold">¿En qué país buscas empleo?</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => setSelectedCountry(country.code)}
                    className={`p-4 rounded-xl border text-center transition-all duration-300 ${
                      selectedCountry === country.code
                        ? 'border-primary bg-primary/10 shadow-glow'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  >
                    <span className="text-sm font-medium">{country.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-primary" />
                <h2 className="font-display text-2xl font-bold">¿Cuánto tiempo puedes dedicar al aprendizaje?</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hoursOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedHours(option.value)}
                    className={`p-6 rounded-xl border text-center transition-all duration-300 ${
                      selectedHours === option.value
                        ? 'border-primary bg-primary/10 shadow-glow'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  >
                    <span className="font-display text-2xl font-bold text-primary block mb-1">
                      {option.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{option.description}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
            <Button
              variant="ghost"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
            >
              Anterior
            </Button>
            <Button
              variant="hero"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {step === 4 ? 'Ver Mi Roadmap' : 'Siguiente'}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobSelector;
