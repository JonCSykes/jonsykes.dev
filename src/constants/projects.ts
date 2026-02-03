export type Project = {
  title: string;
  description: string;
  href: string;
  logo: string;
  logoAlt?: string;
};

export const PROJECTS: Project[] = [
  {
    title: "Weavelabs",
    description: "Fair-Source, AI-Native Test Automation Platform",
    href: "https://github.com/weave-labs",
    logo: "https://avatars.githubusercontent.com/u/196874035?s=96&v=4",
    logoAlt: "Weavelabs logo",
  },
];
