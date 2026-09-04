export const siteConfig = {
  name: "MHWD Next Starter",
  shortName: "MHWD",
  description: "Reusable foundation for custom MHWD client websites.",
  url: "https://example.com",

  locale: "sk_SK",

  contact: {
    email: "info@example.com",
    phone: "+421 000 000 000",
  },

  navigation: [
    { label: "Domov", href: "/" },
    { label: "Služby", href: "/sluzby" },
    { label: "Referencie", href: "/referencie" },
    { label: "Kontakt", href: "/kontakt" },
  ],

  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
  },
} as const;
