import type {
  SidebarCollectionOptions,
  SidebarCustomItemInput,
} from "./lib/content/navigation/navigation";
import type { SidebarBadge } from "./lib/types";

export interface SiteUIConfig {
  sidebar: {
    blog: SidebarCollectionOptions;
    docs: SidebarCollectionOptions;
    standalone?: SidebarCustomItemInput[];
  };
}

const docsCustomItems: SidebarCustomItemInput[] = [
  {
    type: "group",
    label: "Links Úteis",
    collapsed: true,
    entries: [
      { type: "link", label: "Página Inicial", href: "/" },
      { type: "link", label: "Projetos", href: "/projetos" },
    ],
  },
];

const devBadge: SidebarBadge = {
  text: "Under Development",
  variant: "development",
};

const defaultConfig: SiteUIConfig = {
  sidebar: {
    blog: {
      itemOverrides: {
        "introducao-ao-site": { label: "Introdução", badge: devBadge },
      },
    },
    docs: {
      itemOverrides: {
        estrutura: { label: "Arquitetura" },
        instalacao: { label: "Instalação" },
      },
      groupOverrides: {
        teste: { label: "Exemplos", collapsed: false },
      },
      customItems: docsCustomItems,
      customItemsPosition: "append",
    },
    standalone: [],
  },
};

export default defaultConfig;
