import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import JobListings from "@/components/JobListings";
import JobSelector from "@/components/JobSelector";
import Dashboard from "@/components/Dashboard";
import { JobListing } from "@/data/jobListingsData";
import JobAnalysis from "@/components/JobAnalysis";

type AppState = 'hero' | 'selector' | 'dashboard' | 'jobAnalysis';

interface Selection {
  roleId: string;
  level: 'junior' | 'mid' | 'senior';
  country: string;
  hoursPerWeek: number;
}

const Index = () => {
  const [state, setState] = useState<AppState>('hero');
  const [selection, setSelection] = useState<Selection | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);

  const handleGetStarted = () => {
    setState('selector');
  };

  const handleAnalyzeJob = (job: JobListing) => {
    // Pre-populate the selection based on the job and go to selector
    setSelectedJob(job);
    setSelection({
      roleId: job.roleId,
      level: job.level,
      country: job.region === 'us' ? 'US' : job.region === 'eu' ? 'DE' : job.region === 'latam' ? 'MX' : 'US',
      hoursPerWeek: 10,
    });
    setState('jobAnalysis');
  };

  const handleSelect = (sel: Selection) => {
    setSelection(sel);
    setState('dashboard');
  };

  const handleBack = () => {
    setState('hero');
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {state === 'hero' && (
          <>
            <Hero onGetStarted={handleGetStarted} />
            <JobListings onAnalyzeJob={handleAnalyzeJob} />
          </>
        )}
        {state === 'selector' && <JobSelector onSelect={handleSelect} />}
        {state === 'dashboard' && selection && (
          <Dashboard selection={selection} onBack={handleBack} />
        )}
        {state === 'jobAnalysis' && selection && selectedJob && (
          <JobAnalysis
            job={selectedJob}
            onBack={handleBack}
          />
        )}

      </main>
    </div>
  );
};

export default Index;
