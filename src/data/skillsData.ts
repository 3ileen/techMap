export interface Skill {
  id: string;
  name: string;
  category: 'languages' | 'tools' | 'concepts' | 'softSkills' | 'projects';
  demandPercent: number;
  priority: 'high' | 'medium' | 'low';
  description: string;
  resource?: {
    title: string;
    platform: string;
    url: string;
    duration: string;
    level: string;
  };
  project?: {
    title: string;
    description: string;
  };
}

export interface JobRole {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: {
    junior: Skill[];
    mid: Skill[];
    senior: Skill[];
  };
}

export const countries = [
  { code: 'US', name: 'Estados Unidos' },
  { code: 'ES', name: 'España' },
  { code: 'MX', name: 'México' },
  { code: 'AR', name: 'Argentina' },
  { code: 'CO', name: 'Colombia' },
  { code: 'CL', name: 'Chile' },
  { code: 'PE', name: 'Perú' },
  { code: 'BR', name: 'Brasil' },
  { code: 'DE', name: 'Alemania' },
  { code: 'UK', name: 'Reino Unido' },
];

export const jobRoles: JobRole[] = [
  {
    id: 'data-engineer',
    title: 'Data Engineer',
    description: 'Diseña y construye sistemas de datos escalables',
    icon: '🔧',
    skills: {
      junior: [
        {
          id: 'python',
          name: 'Python',
          category: 'languages',
          demandPercent: 92,
          priority: 'high',
          description: 'Lenguaje principal para procesamiento de datos',
          resource: {
            title: 'Python para Data Engineering',
            platform: 'Coursera',
            url: 'https://coursera.org',
            duration: '40 horas',
            level: 'Principiante',
          },
          project: {
            title: 'ETL Pipeline Básico',
            description: 'Crear un pipeline de extracción y transformación de datos con pandas',
          },
        },
        {
          id: 'sql',
          name: 'SQL',
          category: 'languages',
          demandPercent: 95,
          priority: 'high',
          description: 'Consultas y gestión de bases de datos relacionales',
          resource: {
            title: 'SQL Fundamentals',
            platform: 'DataCamp',
            url: 'https://datacamp.com',
            duration: '20 horas',
            level: 'Principiante',
          },
          project: {
            title: 'Diseño de Schema',
            description: 'Diseñar un modelo de datos para un e-commerce',
          },
        },
        {
          id: 'git',
          name: 'Git',
          category: 'tools',
          demandPercent: 88,
          priority: 'high',
          description: 'Control de versiones y colaboración',
          resource: {
            title: 'Git & GitHub Masterclass',
            platform: 'Udemy',
            url: 'https://udemy.com',
            duration: '10 horas',
            level: 'Principiante',
          },
        },
        {
          id: 'docker',
          name: 'Docker',
          category: 'tools',
          demandPercent: 75,
          priority: 'medium',
          description: 'Containerización de aplicaciones',
          resource: {
            title: 'Docker para Desarrolladores',
            platform: 'Platzi',
            url: 'https://platzi.com',
            duration: '15 horas',
            level: 'Intermedio',
          },
        },
        {
          id: 'etl-concepts',
          name: 'ETL/ELT',
          category: 'concepts',
          demandPercent: 85,
          priority: 'high',
          description: 'Procesos de extracción, transformación y carga',
        },
        {
          id: 'data-modeling',
          name: 'Data Modeling',
          category: 'concepts',
          demandPercent: 72,
          priority: 'medium',
          description: 'Diseño de estructuras de datos',
        },
        {
          id: 'communication',
          name: 'Comunicación',
          category: 'softSkills',
          demandPercent: 65,
          priority: 'medium',
          description: 'Capacidad de explicar conceptos técnicos',
        },
        {
          id: 'problem-solving',
          name: 'Resolución de problemas',
          category: 'softSkills',
          demandPercent: 78,
          priority: 'high',
          description: 'Análisis y solución de problemas complejos',
        },
      ],
      mid: [
        {
          id: 'python',
          name: 'Python',
          category: 'languages',
          demandPercent: 95,
          priority: 'high',
          description: 'Lenguaje principal para procesamiento de datos',
        },
        {
          id: 'sql',
          name: 'SQL Avanzado',
          category: 'languages',
          demandPercent: 92,
          priority: 'high',
          description: 'Optimización de queries y procedimientos almacenados',
        },
        {
          id: 'spark',
          name: 'Apache Spark',
          category: 'tools',
          demandPercent: 82,
          priority: 'high',
          description: 'Procesamiento de datos distribuido',
        },
        {
          id: 'airflow',
          name: 'Apache Airflow',
          category: 'tools',
          demandPercent: 78,
          priority: 'high',
          description: 'Orquestación de workflows',
        },
        {
          id: 'aws',
          name: 'AWS',
          category: 'tools',
          demandPercent: 85,
          priority: 'high',
          description: 'Servicios cloud de Amazon',
        },
        {
          id: 'data-warehouse',
          name: 'Data Warehousing',
          category: 'concepts',
          demandPercent: 80,
          priority: 'high',
          description: 'Diseño y gestión de data warehouses',
        },
        {
          id: 'leadership',
          name: 'Liderazgo técnico',
          category: 'softSkills',
          demandPercent: 60,
          priority: 'medium',
          description: 'Guiar equipos técnicos',
        },
      ],
      senior: [
        {
          id: 'architecture',
          name: 'Arquitectura de Datos',
          category: 'concepts',
          demandPercent: 90,
          priority: 'high',
          description: 'Diseño de sistemas de datos enterprise',
        },
        {
          id: 'kubernetes',
          name: 'Kubernetes',
          category: 'tools',
          demandPercent: 75,
          priority: 'medium',
          description: 'Orquestación de containers a escala',
        },
        {
          id: 'streaming',
          name: 'Data Streaming',
          category: 'concepts',
          demandPercent: 70,
          priority: 'medium',
          description: 'Kafka, Kinesis, procesamiento en tiempo real',
        },
        {
          id: 'mentoring',
          name: 'Mentoring',
          category: 'softSkills',
          demandPercent: 65,
          priority: 'high',
          description: 'Desarrollo de talento junior',
        },
      ],
    },
  },
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    description: 'Crea interfaces de usuario modernas y responsivas',
    icon: '🎨',
    skills: {
      junior: [
        {
          id: 'html-css',
          name: 'HTML/CSS',
          category: 'languages',
          demandPercent: 98,
          priority: 'high',
          description: 'Fundamentos del desarrollo web',
          resource: {
            title: 'HTML & CSS Completo',
            platform: 'freeCodeCamp',
            url: 'https://freecodecamp.org',
            duration: '30 horas',
            level: 'Principiante',
          },
        },
        {
          id: 'javascript',
          name: 'JavaScript',
          category: 'languages',
          demandPercent: 96,
          priority: 'high',
          description: 'Lenguaje de programación web',
          resource: {
            title: 'JavaScript Moderno',
            platform: 'Udemy',
            url: 'https://udemy.com',
            duration: '50 horas',
            level: 'Principiante',
          },
        },
        {
          id: 'react',
          name: 'React',
          category: 'tools',
          demandPercent: 85,
          priority: 'high',
          description: 'Librería para construir interfaces',
          resource: {
            title: 'React - La Guía Completa',
            platform: 'Udemy',
            url: 'https://udemy.com',
            duration: '40 horas',
            level: 'Intermedio',
          },
        },
        {
          id: 'git-fe',
          name: 'Git',
          category: 'tools',
          demandPercent: 90,
          priority: 'high',
          description: 'Control de versiones',
        },
        {
          id: 'responsive',
          name: 'Responsive Design',
          category: 'concepts',
          demandPercent: 92,
          priority: 'high',
          description: 'Diseño adaptable a dispositivos',
        },
        {
          id: 'teamwork',
          name: 'Trabajo en equipo',
          category: 'softSkills',
          demandPercent: 75,
          priority: 'medium',
          description: 'Colaboración efectiva',
        },
      ],
      mid: [
        {
          id: 'typescript',
          name: 'TypeScript',
          category: 'languages',
          demandPercent: 88,
          priority: 'high',
          description: 'JavaScript con tipos estáticos',
        },
        {
          id: 'nextjs',
          name: 'Next.js',
          category: 'tools',
          demandPercent: 72,
          priority: 'medium',
          description: 'Framework React para producción',
        },
        {
          id: 'testing',
          name: 'Testing',
          category: 'concepts',
          demandPercent: 78,
          priority: 'high',
          description: 'Jest, Testing Library',
        },
        {
          id: 'performance',
          name: 'Web Performance',
          category: 'concepts',
          demandPercent: 70,
          priority: 'medium',
          description: 'Optimización de rendimiento',
        },
      ],
      senior: [
        {
          id: 'architecture-fe',
          name: 'Arquitectura Frontend',
          category: 'concepts',
          demandPercent: 82,
          priority: 'high',
          description: 'Patrones y escalabilidad',
        },
        {
          id: 'microfrontends',
          name: 'Micro Frontends',
          category: 'concepts',
          demandPercent: 55,
          priority: 'low',
          description: 'Arquitectura distribuida',
        },
        {
          id: 'technical-leadership',
          name: 'Liderazgo técnico',
          category: 'softSkills',
          demandPercent: 68,
          priority: 'high',
          description: 'Guiar decisiones técnicas',
        },
      ],
    },
  },
  {
    id: 'cybersecurity-analyst',
    title: 'Cybersecurity Analyst',
    description: 'Protege sistemas y datos de amenazas',
    icon: '🔒',
    skills: {
      junior: [
        {
          id: 'networking',
          name: 'Networking',
          category: 'concepts',
          demandPercent: 90,
          priority: 'high',
          description: 'Fundamentos de redes TCP/IP',
          resource: {
            title: 'CompTIA Network+',
            platform: 'CompTIA',
            url: 'https://comptia.org',
            duration: '60 horas',
            level: 'Principiante',
          },
        },
        {
          id: 'linux',
          name: 'Linux',
          category: 'tools',
          demandPercent: 88,
          priority: 'high',
          description: 'Administración de sistemas Linux',
        },
        {
          id: 'python-sec',
          name: 'Python',
          category: 'languages',
          demandPercent: 75,
          priority: 'medium',
          description: 'Scripting para automatización',
        },
        {
          id: 'security-fundamentals',
          name: 'Security Fundamentals',
          category: 'concepts',
          demandPercent: 95,
          priority: 'high',
          description: 'CIA triad, autenticación, autorización',
        },
        {
          id: 'attention-detail',
          name: 'Atención al detalle',
          category: 'softSkills',
          demandPercent: 85,
          priority: 'high',
          description: 'Identificar anomalías y patrones',
        },
      ],
      mid: [
        {
          id: 'siem',
          name: 'SIEM Tools',
          category: 'tools',
          demandPercent: 82,
          priority: 'high',
          description: 'Splunk, QRadar, análisis de logs',
        },
        {
          id: 'incident-response',
          name: 'Incident Response',
          category: 'concepts',
          demandPercent: 85,
          priority: 'high',
          description: 'Respuesta a incidentes de seguridad',
        },
        {
          id: 'threat-hunting',
          name: 'Threat Hunting',
          category: 'concepts',
          demandPercent: 70,
          priority: 'medium',
          description: 'Búsqueda proactiva de amenazas',
        },
      ],
      senior: [
        {
          id: 'security-architecture',
          name: 'Security Architecture',
          category: 'concepts',
          demandPercent: 78,
          priority: 'high',
          description: 'Diseño de arquitecturas seguras',
        },
        {
          id: 'risk-management',
          name: 'Risk Management',
          category: 'concepts',
          demandPercent: 72,
          priority: 'high',
          description: 'Evaluación y gestión de riesgos',
        },
      ],
    },
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    description: 'Construye la lógica del servidor y APIs',
    icon: '⚙️',
    skills: {
      junior: [
        {
          id: 'nodejs',
          name: 'Node.js',
          category: 'tools',
          demandPercent: 82,
          priority: 'high',
          description: 'Runtime de JavaScript para servidor',
          resource: {
            title: 'Node.js Completo',
            platform: 'Udemy',
            url: 'https://udemy.com',
            duration: '35 horas',
            level: 'Principiante',
          },
        },
        {
          id: 'sql-backend',
          name: 'SQL',
          category: 'languages',
          demandPercent: 90,
          priority: 'high',
          description: 'Bases de datos relacionales',
        },
        {
          id: 'rest-api',
          name: 'REST APIs',
          category: 'concepts',
          demandPercent: 95,
          priority: 'high',
          description: 'Diseño de APIs RESTful',
        },
        {
          id: 'git-backend',
          name: 'Git',
          category: 'tools',
          demandPercent: 88,
          priority: 'high',
          description: 'Control de versiones',
        },
        {
          id: 'debugging',
          name: 'Debugging',
          category: 'softSkills',
          demandPercent: 80,
          priority: 'high',
          description: 'Resolución de problemas en código',
        },
      ],
      mid: [
        {
          id: 'docker-backend',
          name: 'Docker',
          category: 'tools',
          demandPercent: 78,
          priority: 'high',
          description: 'Containerización',
        },
        {
          id: 'microservices',
          name: 'Microservices',
          category: 'concepts',
          demandPercent: 72,
          priority: 'medium',
          description: 'Arquitectura de microservicios',
        },
        {
          id: 'caching',
          name: 'Caching (Redis)',
          category: 'tools',
          demandPercent: 68,
          priority: 'medium',
          description: 'Estrategias de caché',
        },
      ],
      senior: [
        {
          id: 'system-design',
          name: 'System Design',
          category: 'concepts',
          demandPercent: 85,
          priority: 'high',
          description: 'Diseño de sistemas escalables',
        },
        {
          id: 'cloud-backend',
          name: 'Cloud Architecture',
          category: 'tools',
          demandPercent: 80,
          priority: 'high',
          description: 'AWS, GCP, Azure',
        },
      ],
    },
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    description: 'Automatiza y optimiza procesos de desarrollo',
    icon: '🚀',
    skills: {
      junior: [
        {
          id: 'linux-devops',
          name: 'Linux',
          category: 'tools',
          demandPercent: 92,
          priority: 'high',
          description: 'Administración de sistemas',
        },
        {
          id: 'docker-devops',
          name: 'Docker',
          category: 'tools',
          demandPercent: 90,
          priority: 'high',
          description: 'Containerización',
        },
        {
          id: 'git-devops',
          name: 'Git',
          category: 'tools',
          demandPercent: 95,
          priority: 'high',
          description: 'Control de versiones',
        },
        {
          id: 'bash',
          name: 'Bash/Shell',
          category: 'languages',
          demandPercent: 85,
          priority: 'high',
          description: 'Scripting de shell',
        },
        {
          id: 'ci-cd',
          name: 'CI/CD Basics',
          category: 'concepts',
          demandPercent: 88,
          priority: 'high',
          description: 'Jenkins, GitHub Actions',
        },
      ],
      mid: [
        {
          id: 'kubernetes-devops',
          name: 'Kubernetes',
          category: 'tools',
          demandPercent: 82,
          priority: 'high',
          description: 'Orquestación de containers',
        },
        {
          id: 'terraform',
          name: 'Terraform',
          category: 'tools',
          demandPercent: 78,
          priority: 'high',
          description: 'Infrastructure as Code',
        },
        {
          id: 'aws-devops',
          name: 'AWS',
          category: 'tools',
          demandPercent: 85,
          priority: 'high',
          description: 'Servicios cloud',
        },
      ],
      senior: [
        {
          id: 'sre',
          name: 'SRE Practices',
          category: 'concepts',
          demandPercent: 75,
          priority: 'high',
          description: 'Site Reliability Engineering',
        },
        {
          id: 'security-devops',
          name: 'DevSecOps',
          category: 'concepts',
          demandPercent: 70,
          priority: 'medium',
          description: 'Seguridad en pipelines',
        },
      ],
    },
  },
];

export const categoryLabels: Record<string, string> = {
  languages: 'Lenguajes',
  tools: 'Herramientas',
  concepts: 'Conceptos',
  softSkills: 'Soft Skills',
  projects: 'Proyectos',
};

export const categoryIcons: Record<string, string> = {
  languages: '💻',
  tools: '🔧',
  concepts: '📚',
  softSkills: '🤝',
  projects: '📁',
};
