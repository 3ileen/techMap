import { MapPin, Building2, Clock, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobListing } from "@/data/jobListingsData";

interface JobCardProps {
  job: JobListing;
  onAnalyzeSkills: (job: JobListing) => void;
}

const JobCard = ({ job, onAnalyzeSkills }: JobCardProps) => {
  const modalityLabels = {
    remote: 'Remoto',
    hybrid: 'Híbrido',
    onsite: 'Presencial',
  };

  const modalityColors = {
    remote: 'bg-secondary/20 text-secondary border-secondary/30',
    hybrid: 'bg-accent/20 text-accent border-accent/30',
    onsite: 'bg-primary/20 text-primary border-primary/30',
  };

  const levelLabels = {
    junior: 'Junior',
    mid: 'Mid',
    senior: 'Senior',
  };

  const getDemandLabel = (percent: number) => {
    if (percent >= 90) return 'Muy alta demanda';
    if (percent >= 80) return 'Alta demanda';
    if (percent >= 70) return 'Demanda media';
    return 'Demanda normal';
  };

  const getDemandColor = (percent: number) => {
    if (percent >= 90) return 'text-primary';
    if (percent >= 80) return 'text-secondary';
    return 'text-muted-foreground';
  };

  return (
    <div className="glass-card-hover p-5 flex flex-col gap-4 group">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {job.title}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-muted-foreground">
            <Building2 className="h-4 w-4" />
            <span className="text-sm">{job.company}</span>
          </div>
        </div>
        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${modalityColors[job.modality]}`}>
          {modalityLabels[job.modality]}
        </span>
      </div>

      {/* Location & Level */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap className="h-4 w-4 text-accent" />
          <span>{levelLabels[job.level]}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          <span>{job.postedDays === 1 ? 'Hace 1 día' : `Hace ${job.postedDays} días`}</span>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {job.skills.slice(0, 5).map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 text-xs bg-muted/50 border border-border/50 rounded-md text-foreground"
          >
            {skill}
          </span>
        ))}
        {job.skills.length > 5 && (
          <span className="px-2.5 py-1 text-xs text-muted-foreground">
            +{job.skills.length - 5} más
          </span>
        )}
      </div>

      {/* Demand Indicator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <TrendingUp className={`h-4 w-4 ${getDemandColor(job.demandPercent)}`} />
            <span className={getDemandColor(job.demandPercent)}>{getDemandLabel(job.demandPercent)}</span>
          </div>
          <span className="text-primary font-semibold">{job.demandPercent}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full transition-all duration-500"
            style={{ width: `${job.demandPercent}%` }}
          />
        </div>
      </div>

      {/* Salary if available */}
      {job.salaryRange && (
        <div className="text-sm text-secondary font-medium">
          💰 {job.salaryRange}
        </div>
      )}

      {/* CTA */}
      <Button
        onClick={() => onAnalyzeSkills(job)}
        className="w-full mt-auto bg-accent hover:bg-accent/90 text-accent-foreground font-medium transition-all duration-300 hover:shadow-[0_0_20px_hsl(270_100%_65%_/_0.4)]"
      >
        Analizar mis skills para este puesto
      </Button>
    </div>
  );
};

export default JobCard;
