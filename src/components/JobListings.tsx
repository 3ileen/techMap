import { useState, useEffect, useMemo } from "react";
import { ArrowUpDown, Briefcase, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import JobFilters, { FilterState } from "@/components/JobFilters";
import JobCard from "@/components/JobCard";
import { fetchJobListings, JobListing } from "@/data/jobs";

type SortOption = "demand" | "salary" | "recent";

interface JobListingsProps {
  onAnalyzeJob: (job: JobListing) => void;
}

const JobListings = ({ onAnalyzeJob }: JobListingsProps) => {
  /* =========================
     State
  ========================= */

  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    role: "",
    skills: [],
    modality: "",
    region: "",
    level: "",
  });

  const [sortBy, setSortBy] = useState<SortOption>("demand");

  /* =========================
     Data fetch
  ========================= */

  useEffect(() => {
    fetchJobListings()
      .then(setJobs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  /* =========================
     Filtering & sorting
  ========================= */

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(job =>
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.skills.some(skill =>
          skill.toLowerCase().includes(searchLower)
        )
      );
    }

    // Role filter
    if (filters.role) {
      result = result.filter(job => job.roleId === filters.role);
    }

    // Skills filter (job must have ALL selected skills)
    if (filters.skills.length > 0) {
      result = result.filter(job =>
        filters.skills.every(skill =>
          job.skills.some(jobSkill =>
            jobSkill.toLowerCase() === skill.toLowerCase()
          )
        )
      );
    }

    // Modality filter
    if (filters.modality) {
      result = result.filter(job => job.modality === filters.modality);
    }

    // Region filter
    if (filters.region && filters.region !== "global") {
      result = result.filter(job => job.region === filters.region);
    }

    // Level filter
    if (filters.level) {
      result = result.filter(job => job.level === filters.level);
    }

    // Sort
    switch (sortBy) {
      case "demand":
        result.sort((a, b) => b.demandPercent - a.demandPercent);
        break;
      case "recent":
        result.sort((a, b) => a.postedDays - b.postedDays);
        break;
      case "salary":
        result.sort((a, b) => b.demandPercent - a.demandPercent);
        break;
    }

    return result;
  }, [jobs, filters, sortBy]);

  /* =========================
     Loading state
  ========================= */

  if (loading) {
    return (
      <section className="py-16 px-4 text-center">
        <p className="text-muted-foreground">Cargando ofertas...</p>
      </section>
    );
  }

  /* =========================
     Render
  ========================= */

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm mb-4">
            <Briefcase className="h-4 w-4" />
            <span>Portal de empleos tech</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            DEMANDAS <span className="gradient-text">LABORALES</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explora ofertas de empleo tecnológicas y analiza tus habilidades para cada puesto.
            Conecta directamente con tu roadmap de aprendizaje.
          </p>
        </div>

        {/* Filters */}
        <div className="glass-card p-6 mb-8">
          <JobFilters filters={filters} onFiltersChange={setFilters} />
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span className="text-lg font-medium text-foreground">
              <span className="text-primary font-bold">
                {filteredJobs.length}
              </span>{" "}
              ofertas encontradas
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Ordenar por:</span>
            <Select
              value={sortBy}
              onValueChange={value =>
                setSortBy(value as SortOption)
              }
            >
              <SelectTrigger className="w-[180px] bg-card border-border/50">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="demand">Mayor demanda</SelectItem>
                <SelectItem value="salary">Mejor salario</SelectItem>
                <SelectItem value="recent">Más reciente</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Job Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onAnalyzeSkills={onAnalyzeJob}
              />
            ))}
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No se encontraron ofertas
            </h3>
            <p className="text-muted-foreground mb-4">
              Intenta ajustar los filtros para ver más resultados
            </p>
            <Button
              variant="outline"
              onClick={() =>
                setFilters({
                  search: "",
                  role: "",
                  skills: [],
                  modality: "",
                  region: "",
                  level: "",
                })
              }
            >
              Limpiar filtros
            </Button>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground/60 italic">
            ⚠️ Datos en tiempo real obtenidos desde Supabase.
          </p>
        </div>
      </div>
    </section>
  );
};

export default JobListings;
