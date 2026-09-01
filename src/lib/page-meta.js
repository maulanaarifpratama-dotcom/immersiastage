/**
 * Metadata for the fixed pages, with no dependency on src/data/*.
 *
 * Split out of lib/meta.js so the Astro build has no path back to
 * src/data/articles.js and src/data/publications.js. Article and publication
 * metadata now comes from the content collections; those two files exist only
 * to keep the legacy Vite SPA running until it is retired, and nothing in
 * src/pages/ or src/layouts/ imports them.
 *
 * lib/meta.js re-exports everything here, so the SPA is unaffected.
 */

export const SITE_URL = "https://immersia.id";
export const SITE_NAME = "Immersia";

export const DEFAULT_DESCRIPTION =
  "Immersia helps institutions design, measure, and strengthen impact programs with evidence, systems, and capability connected to practical decisions.";

export const pageMeta = {
  "index.html": {
    title: "Immersia — Strategic Impact Advisory",
    description: DEFAULT_DESCRIPTION,
  },
  "about.html": {
    title: "About Immersia",
    description:
      "Immersia is an impact advisory and capacity-building firm working across organization, program, and people domains in Indonesia and Southeast Asia.",
  },
  "services.html": {
    title: "Services",
    description:
      "Three service domains: Integrated Impact Advisory for organizations, Modular Impact Services for programs and projects, and Impact Capacity Building for people.",
  },
  "integrated-advisory.html": {
    title: "Integrated Impact Advisory",
    description:
      "Impact architecture, M&E system development, implementation support, and grant support for institutions that need impact built into how they operate.",
  },
  "modular-services.html": {
    title: "Modular Impact Services",
    description:
      "Baseline research, program design, program evaluation, and impact assessment delivered as standalone assignments or a connected sequence.",
  },
  "impact-lab.html": {
    title: "Impact Capacity Building",
    description:
      "Immersia Impact Lab builds practical MEAL, research, and project management capability through facilitated practice, mentoring, and institutional application.",
  },
  "project-records.html": {
    title: "Project Records",
    description:
      "Representative Immersia engagements across organization, program and project, and people domains, including SROI, MSC, CSI, and OECD-DAC studies.",
  },
  "news.html": {
    title: "News & Articles",
    description:
      "Practical writing on baseline and feasibility studies, M&E systems, impact assessment methods, MEAL capacity, and Theory of Change.",
  },
  "publications.html": {
    title: "Publications",
    description:
      "Representative reports and knowledge products from Immersia's advisory portfolio, including SROI, impact, and community satisfaction studies.",
  },
  "team.html": {
    title: "Team",
    description:
      "The advisory, business development, marketing, and operations leadership behind Immersia's practice.",
  },
  "faq.html": {
    title: "FAQ",
    description:
      "Common questions about Immersia's service domains, methodology selection, deliverables, delivery formats, and how to request a proposal.",
  },
  "request-proposal.html": {
    title: "Request Proposal",
    description:
      "Tell Immersia what your institution needs to strengthen and the team will follow up to clarify scope, methodology, and deliverables.",
  },
};

export const NOT_FOUND = {
  title: "Page not found",
  description: "The page you were looking for is not available on immersia.id.",
  type: "website",
  noindex: true,
};

/** Fixed pages only. Content pages pass their metadata explicitly. */
export function resolvePageMeta(key) {
  if (pageMeta[key]) return { ...pageMeta[key], key, type: "website" };
  return { ...NOT_FOUND, key };
}
