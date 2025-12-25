import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw, Download } from "lucide-react";
import { JobListing } from "@/data/jobListingsData";

interface JobAnalysisProps {
  job: JobListing;
  onBack: () => void;
}

const JobAnalysis = ({ job, onBack }: JobAnalysisProps) => {
  const [checkedSkills, setCheckedSkills] = useState<Set<string>>(new Set());

  const toggleSkill = (skill: string) => {
    setTimeout(() => {
      setCheckedSkills((prev) => {
        const next = new Set(prev);
        next.has(skill) ? next.delete(skill) : next.add(skill);
        return next;
      });
    }, 120);
  };

  const matchPercent = useMemo(() => {
    if (job.skills.length === 0) return 0;
    return Math.round((checkedSkills.size / job.skills.length) * 100);
  }, [checkedSkills, job.skills.length]);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;

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
              {job.title}
            </h1>
            <p className="text-muted-foreground mt-1">
              {job.company} • {job.location} • {job.modality}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCheckedSkills(new Set())}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reiniciar
            </Button>
            <Button variant="neon" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Source note */}
        <div className="glass-card p-3 mb-6 text-center">
          <p className="text-xs text-muted-foreground">
            📊 Análisis basado directamente en la oferta laboral seleccionada
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Match card */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-6">
                {/* Circular progress */}
                <div className="relative w-40 h-40">
                  <svg
                    className="w-full h-full -rotate-90"
                    viewBox="0 0 128 128"
                    >

                    <circle
                      cx="64"
                      cy="64"
                      r={radius}
                      stroke="currentColor"
                      strokeWidth="10"
                      fill="transparent"
                      className="text-muted/20"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r={radius}
                      stroke="currentColor"
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray={circumference}
                      strokeDashoffset={
                        circumference * (1 - matchPercent / 100)
                      }
                      strokeLinecap="round"
                      className="
                        text-primary
                        transition-all duration-700 ease-out
                        drop-shadow-[0_0_14px_hsl(var(--primary))]
                      "
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-primary">
                      {matchPercent}%
                    </span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">
                      Match
                    </span>
                  </div>
                </div>

                {/* Text */}
                <div>
                  <h4 className="font-medium flex items-center gap-2 mb-1">
                    <span className="text-primary">↗</span>
                    Tu compatibilidad
                  </h4>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    {matchPercent < 40
                      ? "Hay oportunidad de crecimiento. Enfócate en las skills prioritarias."
                      : matchPercent < 70
                      ? "Buen progreso. Aún hay skills clave por reforzar."
                      : "¡Excelente! Estás muy cerca del perfil ideal."}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="glass-card p-4">
              <h3 className="font-display font-semibold mb-3">
                Resumen
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Skills totales
                  </span>
                  <span className="font-medium">
                    {job.skills.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Dominadas
                  </span>
                  <span className="font-medium text-secondary">
                    {checkedSkills.size}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Por aprender
                  </span>
                  <span className="font-medium text-primary">
                    {job.skills.length - checkedSkills.size}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-2 w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold">
                Skills requeridas
              </h2>
              <span className="text-sm text-muted-foreground">
                Marca las que ya dominas
              </span>
            </div>

            <div className="glass-card p-6 w-full">
              <div className="flex flex-col gap-3">
                {job.skills.map((skill) => {
                  const checked = checkedSkills.has(skill);

                  return (
                    <label
                      key={skill}
                      className="flex items-center gap-3 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleSkill(skill)}
                        className="hidden"
                      />

                      {/* Check */}
                      <div
                        className={`
                          w-5 h-5 rounded-full border
                          flex items-center justify-center
                          transition-all duration-300 ease-out
                          ${
                            checked
                              ? "bg-primary border-primary scale-110 shadow-[0_0_10px_hsl(var(--primary))]"
                              : "border-muted-foreground/40"
                          }
                        `}
                      >
                        <svg
                          className={`
                            w-3 h-3 text-primary-foreground
                            transition-all duration-300
                            ${
                              checked
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-75"
                            }
                          `}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </div>

                      {/* Texto */}
                      <span
                        className={`
                          font-medium transition-colors duration-300
                          ${
                            checked
                              ? "text-primary"
                              : "text-foreground"
                          }
                        `}
                      >
                        {skill}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobAnalysis;
