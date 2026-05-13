import type {
  SidebarCollectionOptions,
  SidebarCustomItemInput,
} from "./lib/content/navigation/navigation";

export interface SiteUIConfig {
  sidebar: {
    docs: SidebarCollectionOptions;
    notas: SidebarCollectionOptions;
    standalone?: SidebarCustomItemInput[];
  };
}

const defaultConfig: SiteUIConfig = {
  sidebar: {
    docs: {
      itemOverrides: {},
      groupOverrides: {
        projects: { label: "Projetos", collapsed: false, separator: true },
      },
      customItems: [],
      customItemsPosition: "append",
    },
    notas: {
      itemOverrides: {},
    },
    standalone: [],
  },
};

export default defaultConfig;
