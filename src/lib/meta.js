import { useEffect } from "react";
import { articles } from "../data/articles";
import { publications } from "../data/publications";

export const SITE_URL = "https://immersia.id";
export const SITE_NAME = "Immersia";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

const DEFAULT_DESCRIPTION =
  "Immersia helps institutions design, measure, and strengthen impact programs with evidence, systems, and capability connected to practical decisions.";

/**
 * Every route used to share one <title> and one description, because the app
 * is a single-page build and nothing ever updated the document head. Search
 * engines and link previews saw twelve identical pages.
 */
const pageMeta = {
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

function truncate(text, max = 175) {
  if (!text || text.length <= max) return text;
  return `${text.slice(0, max).replace(/\s+\S*$/, "")}…`;
}

export function resolveMeta(key) {
  if (pageMeta[key]) {
    return { ...pageMeta[key], key, type: "website" };
  }

  const article = articles[key];
  if (article) {
    return {
      key,
      title: article.title,
      description: truncate(article.lead),
      image: article.hero ? `${SITE_URL}${article.hero}` : undefined,
      type: "article",
      article,
    };
  }

  const publication = publications[key];
  if (publication) {
    return {
      key,
      title: publication.title,
      description: `${publication.label}. Representative publication from Immersia's advisory portfolio.`,
      image: publication.img ? `${SITE_URL}${publication.img}` : undefined,
      type: "article",
    };
  }

  return {
    key,
    title: "Page not found",
    description:
      "The page you were looking for is not available on immersia.id.",
    type: "website",
    noindex: true,
  };
}

function setTag(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement(attrs.tag);
    document.head.appendChild(el);
  }
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "tag") continue;
    if (v == null) el.removeAttribute(k);
    else el.setAttribute(k, v);
  }
  return el;
}

function buildJsonLd(meta, url) {
  if (meta.type === "article") {
    const node = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: meta.title,
      description: meta.description,
      mainEntityOfPage: url,
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/assets/brand/logo.png`,
      },
    };
    if (meta.image) node.image = [meta.image];
    // datePublished / author are intentionally absent: the article data has
    // no such fields yet. Emitting invented values would be worse than none.
    return node;
  }

  if (meta.key === "index.html") {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/assets/brand/logo.png`,
      description: DEFAULT_DESCRIPTION,
      email: "info@immersia.id",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jl. Sepat No.43, Kebagusan, Pasar Minggu",
        addressLocality: "Jakarta Selatan",
        postalCode: "12520",
        addressCountry: "ID",
      },
      sameAs: [
        "https://www.instagram.com/immersia.id",
        "https://www.linkedin.com/company/immers-asia",
      ],
    };
  }

  return null;
}

export function useDocumentMeta(key) {
  useEffect(() => {
    const meta = resolveMeta(key);
    const path = key === "index.html" ? "/" : `/${key}`;
    const url = `${SITE_URL}${path}`;
    const image = meta.image || DEFAULT_IMAGE;
    const fullTitle =
      meta.key === "index.html" ? meta.title : `${meta.title} — ${SITE_NAME}`;

    document.title = fullTitle;
    document.documentElement.lang = "en";

    setTag('meta[name="description"]', {
      tag: "meta",
      name: "description",
      content: meta.description,
    });
    setTag('link[rel="canonical"]', {
      tag: "link",
      rel: "canonical",
      href: url,
    });
    setTag('meta[name="robots"]', {
      tag: "meta",
      name: "robots",
      content: meta.noindex ? "noindex, follow" : "index, follow",
    });

    setTag('meta[property="og:title"]', {
      tag: "meta",
      property: "og:title",
      content: fullTitle,
    });
    setTag('meta[property="og:description"]', {
      tag: "meta",
      property: "og:description",
      content: meta.description,
    });
    setTag('meta[property="og:url"]', {
      tag: "meta",
      property: "og:url",
      content: url,
    });
    setTag('meta[property="og:type"]', {
      tag: "meta",
      property: "og:type",
      content: meta.type,
    });
    setTag('meta[property="og:image"]', {
      tag: "meta",
      property: "og:image",
      content: image,
    });
    setTag('meta[name="twitter:title"]', {
      tag: "meta",
      name: "twitter:title",
      content: fullTitle,
    });
    setTag('meta[name="twitter:description"]', {
      tag: "meta",
      name: "twitter:description",
      content: meta.description,
    });
    setTag('meta[name="twitter:image"]', {
      tag: "meta",
      name: "twitter:image",
      content: image,
    });

    const jsonLd = buildJsonLd(meta, url);
    const existing = document.head.querySelector("#route-jsonld");
    if (existing) existing.remove();
    if (jsonLd) {
      const script = document.createElement("script");
      script.id = "route-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [key]);
}
