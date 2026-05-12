/**
 * Calcula links de paginação anterior/próximo para uma coleção,
 * respeitando order da sidebar quando disponível.
 */
export function getPaginationLinks(
  currentId: string,
  entries: Array<{ id: string; data?: any }>,
  basePath = "",
) {
  const sorted = entries.slice().sort((a, b) => {
    const ao = a.data?.sidebar?.order ?? 9999;
    const bo = b.data?.sidebar?.order ?? 9999;
    if (ao !== bo) return ao - bo;
    return (a.data?.title || a.id).localeCompare(b.data?.title || b.id);
  });

  const idx = sorted.findIndex((e) => e.id === currentId);
  const prev = idx > 0 ? sorted[idx - 1] : undefined;
  const next =
    idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : undefined;
  // Normaliza o basePath para evitar barras duplicadas nos links finais.
  const makeHref = (id: string) => {
    if (!basePath) return `/${id}`;
    return `/${basePath.replace(/^\/+|\/+$/g, "")}/${id}`.replace(/\/\/+/, "/");
  };

  const mode = prev && next ? "split" : prev ? "prev" : next ? "next" : "none";

  return {
    mode,
    prev: prev
      ? { title: prev.data?.title || prev.id, href: makeHref(prev.id) }
      : undefined,
    next: next
      ? { title: next.data?.title || next.id, href: makeHref(next.id) }
      : undefined,
  };
}
