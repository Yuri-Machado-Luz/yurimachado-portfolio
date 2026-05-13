export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  label: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    label: "Frontend & UI",
    skills: [
      { name: "React",         icon: "fa-brands fa-react"              },
      { name: "TypeScript",    icon: "fa-solid fa-code"                },
      { name: "HTML / CSS",    icon: "fa-brands fa-html5"              },
      { name: "Tailwind CSS",  icon: "fa-solid fa-paint-roller"        },
      { name: "Figma",         icon: "fa-brands fa-figma"              },
      { name: "Framer Motion", icon: "fa-solid fa-wand-magic-sparkles" },
    ],
  },
  {
    label: "Backend & Dados",
    skills: [
      { name: "Node.js",    icon: "fa-brands fa-node-js"  },
      { name: "Python",     icon: "fa-brands fa-python"   },
      { name: "Express",    icon: "fa-solid fa-server"    },
      { name: "FastAPI",    icon: "fa-solid fa-bolt"      },
      { name: "PostgreSQL", icon: "fa-solid fa-database"  },
      { name: "Pandas",     icon: "fa-solid fa-table"     },
    ],
  },
  {
    label: "Ferramentas",
    skills: [
      { name: "Git",            icon: "fa-brands fa-git-alt"       },
      { name: "CI/CD",          icon: "fa-solid fa-infinity"        },
      { name: "Power Automate", icon: "fa-solid fa-gears"           },
      { name: "Obsidian",       icon: "fa-solid fa-brain"           },
      { name: "Linux / CLI",    icon: "fa-brands fa-linux"          },
      { name: "Vite",           icon: "fa-solid fa-fire"            },
    ],
  },
  {
    label: "Metodologias",
    skills: [
      { name: "Scrum",       icon: "fa-solid fa-list-check"       },
      { name: "Kanban",      icon: "fa-solid fa-table-columns"    },
      { name: "BPMN",        icon: "fa-solid fa-diagram-project"  },
      { name: "UML",         icon: "fa-solid fa-sitemap"          },
      { name: "DRY / SOLID", icon: "fa-solid fa-layer-group"      },
      { name: "Testes",      icon: "fa-solid fa-vial"             },
    ],
  },
];
