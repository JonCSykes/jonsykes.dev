export type Social = {
  NAME: string;
  HREF: string;
  ICON: "Linkedin" | "Twitter" | "Mail" | "Github";
  LABEL?: string;
};

export const SOCIALS: Social[] = [
  {
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/sykesjon/",
    ICON: "Linkedin",
    LABEL: "LinkedIn",
  },
  {
    NAME: "x",
    HREF: "https://x.com/JonCSykes",
    ICON: "Twitter",
    LABEL: "X",
  },
  {
    NAME: "email",
    HREF: "mailto:joncsykes@gmail.com",
    ICON: "Mail",
    LABEL: "Email",
  },
  {
    NAME: "github",
    HREF: "https://github.com/JonCSykes",
    ICON: "Github",
    LABEL: "GitHub",
  },
];
