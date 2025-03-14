import { ContactConfig, SiteConfig } from "@/schemas";

/* ==================== [> WEBSITE CONFIG <] ==================== */

const baseUrl = "http://localhost:3000/"; // DEVELOPMENT

export const siteConfig: SiteConfig = {
  name: "Web Pilot Logbook",
  author: "LVB-305",
  description: "Digital pilot logbook app",
  keywords: [],
  url: {
    base: baseUrl,
    author: "https://github.com/LVB-305/web-pilot-logbook",
  },
  ogImage: `${baseUrl}/og.jpg`,
};

export const contactConfig: ContactConfig = {
  email: "78275518+LVB-305@users.noreply.github.com",
};
