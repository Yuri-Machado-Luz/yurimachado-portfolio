export interface SidebarLink {
  type: "link";
  label: string;
  href: string;
  isCurrent?: boolean;
  badge?: SidebarBadge;
  attrs?: Record<string, string | boolean>;
}

export interface SidebarGroup {
  type: "group";
  label: string;
  entries: SidebarEntry[];
  collapsed?: boolean;
  badge?: SidebarBadge;
  attrs?: Record<string, string | boolean>;
}

export interface SidebarSeparator {
  type: "separator";
  label: string;
  entries: SidebarEntry[];
  badge?: SidebarBadge;
  attrs?: Record<string, string | boolean>;
}

export type SidebarEntry = SidebarLink | SidebarGroup | SidebarSeparator;

export interface SidebarBadge {
  text: string;
  variant?:
    | "development"
    | "note"
    | "tip"
    | "caution"
    | "danger"
    | "success"
    | "default";
  class?: string;
}
