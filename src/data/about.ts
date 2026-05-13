export interface HeroStat {
  value?: string;
  label: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  detail: string;
}

export interface LanguageItem {
  name: string;
  level: string;
}

export const heroStats: HeroStat[] = [
  { value: "4 +", label: "Anos como desenvolvedor autônomo" },
  { value: "5 +", label: "Projetos ativos no ar" },
  { value: "—", label: "Destaque em empresas como IBM, Cielo e Santander" },
];

export const experience: ExperienceItem[] = [
  {
    role: "Full-Stack Developer & Designer",
    company: "Autônomo",
    period: "Jul 2022 – Presente",
    bullets: [
      "Desenvolvimento de aplicações web responsivas para PMEs com React, Node.js e Tailwind CSS.",
      "Implementação de automações para otimização de fluxos manuais repetitivos.",
      "Integração de APIs para sincronização de dados entre sistemas.",
      "Criação de interfaces centradas no usuário aplicando princípios de UX/UI.",
      "Consultoria em arquitetura e documentação técnica para sustentabilidade de sistemas.",
    ],
  },
  {
    role: "Design & Redação Técnica",
    company: "Autônomo",
    period: "Jan 2020 – Presente",
    bullets: [
      "Criação de identidade visual e prototipagem UI/UX com Figma e Canva.",
      "Produção de conteúdo técnico e acadêmico — relatórios e pesquisas no formato ABNT.",
    ],
  },
  {
    role: "Assistente Administrativo Pleno",
    company: "IBM / BPO Decision",
    period: "Dez 2024 – Abr 2025",
    bullets: [
      "Redesenho do fluxo de onboarding: tempo de integração reduzido de 7 para 3 dias (−57%).",
      "Automação de arquivamento em massa com Python e documentação de SOPs.",
      "Desenvolvimento de dashboard de KPIs interativo com Excel e VBA.",
    ],
  },
  {
    role: "Analista de Backoffice",
    company: "Cielo / BPO Atento",
    period: "Jul 2021 – Abr 2022",
    bullets: [
      "Automação de triagem de e-mails com Power Automate.",
      "Auditoria de bases de dados para conformidade regulatória.",
      "Ponto focal para Ouvidoria e Jurídico.",
    ],
  },
  {
    role: "Suporte Técnico L2",
    company: "Santander",
    period: "Mai 2020 – Fev 2021",
    bullets: [
      "Suporte técnico a usuários internos e gestão de incidentes de segurança da informação.",
    ],
  },
];

export const education: EducationItem[] = [
  {
    degree: "Análise e Desenvolvimento de Sistemas",
    institution: "Universidade Cidade de São Paulo",
    detail: "Cursando — conclusão prevista 2027",
  },
  {
    degree: "Psicologia",
    institution: "Universidade Nove de Julho",
    detail: "4 anos completos (8º semestre)",
  },
];

export const languages: LanguageItem[] = [
  { name: "Português", level: "Nativo" },
  { name: "Inglês", level: "Avançado" },
  { name: "Espanhol", level: "Básico" },
  { name: "Francês", level: "Básico (estudando)" },
  { name: "Japonês", level: "Básico (estudando)" },
];
