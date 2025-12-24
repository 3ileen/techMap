import { supabase } from '@/lib/supabase'

/* =========================
   Types
========================= */

export interface JobListing {
  id: string
  title: string
  company: string
  location: string
  region: string
  modality: 'remote' | 'hybrid' | 'onsite'
  level: 'junior' | 'mid' | 'senior'
  skills: string[]
  demandPercent: number
  salaryRange?: string
  postedDays: number
  roleId: string
}

/* =========================
   Static data (UI)
========================= */

export const allSkillTags = [
  'Python', 'JavaScript', 'TypeScript', 'SQL', 'Java', 'Go', 'Rust', 'C++',
  'React', 'Node.js', 'AWS', 'Docker', 'Kubernetes', 'Git', 'PostgreSQL', 'MongoDB',
  'TensorFlow', 'PyTorch', 'Spark', 'Airflow', 'Linux', 'GraphQL', 'REST APIs',
  'CI/CD', 'Terraform', 'Redis', 'Kafka', 'Elasticsearch', 'Vue.js', 'Angular'
]

export const regions = [
  { code: 'global', name: 'Global' },
  { code: 'us', name: 'Estados Unidos' },
  { code: 'latam', name: 'Latinoamérica' },
  { code: 'eu', name: 'Europa' },
  { code: 'asia', name: 'Asia' },
]

export const modalities = [
  { value: 'remote', label: 'Remoto' },
  { value: 'hybrid', label: 'Híbrido' },
  { value: 'onsite', label: 'Presencial' },
]

export const levels = [
  { value: 'junior', label: 'Junior' },
  { value: 'mid', label: 'Mid' },
  { value: 'senior', label: 'Senior' },
]

export const roleOptions = [
  { value: 'data-engineer', label: 'Data Engineer' },
  { value: 'frontend-developer', label: 'Frontend Developer' },
  { value: 'backend-developer', label: 'Backend Developer' },
  { value: 'data-scientist', label: 'Data Scientist' },
  { value: 'devops-engineer', label: 'DevOps Engineer' },
  { value: 'ai-engineer', label: 'AI/ML Engineer' },
  { value: 'cybersecurity-analyst', label: 'Cybersecurity Analyst' },
  { value: 'fullstack-developer', label: 'Full Stack Developer' },
]

/* =========================
   Supabase query
========================= */

export async function fetchJobListings(): Promise<JobListing[]> {
  const { data, error } = await supabase
    .from('jobs')
    .select('index, title, company, location, modality, skills')

  if (error) {
    console.error('Supabase error:', error)
    throw error
  }

  return (data ?? []).map(job => ({
    id: String(job.index),
    title: job.title,
    company: job.company,
    location: job.location,

    // Temporales hasta que existan en DB
    region: 'global',
    level: 'mid',
    demandPercent: 0,
    postedDays: 0,
    roleId: 'unknown',

    modality: job.modality,

    skills: typeof job.skills === 'string'
      ? job.skills.split(',').map(s => s.trim())
      : [],

    salaryRange: undefined,
  }))
}
