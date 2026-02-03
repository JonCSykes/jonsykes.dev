export type Company = {
  name: string;
  role: string;
  url: string;
  location: string;
  startedAt: string;
  endedAt?: string;
  outsourced?: {
    name: string;
    url: string;
  }[];
};

export const COMPANIES: Company[] = [
  {
    name: "CWI",
    role: "frontend software engineer",
    url: "https://cwi.com.br",
    location: "remote",
    startedAt: "2024-12-02",
    outsourced: [
      {
        name: "GPA",
        url: "https://www.gpabr.com",
      },
      {
        name: "Bankly",
        url: "https://www.bankly.com.br/",
      },
    ],
  },
  {
    name: "tractian",
    role: "frontend software engineer",
    url: "https://tractian.com",
    location: "remote",
    startedAt: "2024-08-26",
    endedAt: "2024-12-02",
  },
  {
    name: "meritum",
    role: "frontend software engineer",
    url: "https://meritum.online",
    location: "remote",
    startedAt: "2022-04-15",
    endedAt: "2024-08-23",
  },
  {
    name: "meta",
    role: "mobile software engineer",
    url: "https://meta.com.br",
    location: "remote",
    startedAt: "2021-05-15",
    endedAt: "2022-03-15",
    outsourced: [
      {
        name: "olist",
        url: "https://olist.com",
      },
    ],
  },
  {
    name: "gazeta do povo",
    role: "fullstack developer",
    url: "https://clube.gazetadopovo.com.br",
    location: "remote",
    startedAt: "2020-11-15",
    endedAt: "2021-05-15",
  },
];
