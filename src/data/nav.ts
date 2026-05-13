export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Projetos", href: "/projetos" },
  { label: "Publicações", href: "/artigos" },
  { label: "Sobre", href: "/sobre" },
];
