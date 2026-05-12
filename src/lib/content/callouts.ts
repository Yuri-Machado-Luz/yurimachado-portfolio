export type CalloutVariant =
  | "note"
  | "tip"
  | "caution"
  | "danger"
  | "success"
  | "info"
  | string;

export interface CalloutDefinition {
  label: string;
  iconClass: string;
  tone: "neutral" | "positive" | "warning" | "critical" | "accent";
}

/**
 * Registry central de callouts para mapear variante -> rótulo/ícone/tom visual.
 */
export const calloutRegistry: Record<string, CalloutDefinition> = {
  note: {
    label: "Nota",
    iconClass: "fa-solid fa-circle-info",
    tone: "accent",
  },
  tip: {
    label: "Dica",
    iconClass: "fa-solid fa-lightbulb",
    tone: "positive",
  },
  caution: {
    label: "Atenção",
    iconClass: "fa-solid fa-triangle-exclamation",
    tone: "warning",
  },
  danger: {
    label: "Perigo",
    iconClass: "fa-solid fa-skull-crossbones",
    tone: "critical",
  },
  success: {
    label: "Sucesso",
    iconClass: "fa-solid fa-circle-check",
    tone: "positive",
  },
  info: {
    label: "Informação",
    iconClass: "fa-solid fa-circle-info",
    tone: "neutral",
  },
};

/** Retorna definição da variante com fallback seguro para variantes desconhecidas. */
export function getCalloutDefinition(variant: string): CalloutDefinition {
  return (
    calloutRegistry[variant] ?? {
      label: variant,
      iconClass: "fa-solid fa-circle-info",
      tone: "neutral",
    }
  );
}
