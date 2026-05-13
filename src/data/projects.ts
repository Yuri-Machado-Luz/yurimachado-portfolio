export interface ProjectStatus {
  label: string;
  badge: string;
}

export const statusMap: Record<string, ProjectStatus> = {
  ativo: { label: "Ativo", badge: "badge-success" },
  dev: { label: "Em desenvolvimento", badge: "badge-dev" },
  arquivado: { label: "Arquivado", badge: "badge" },
  beta: { label: "Beta", badge: "badge-caution" },
};
