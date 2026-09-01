import { useEffect } from "react";
import { articles } from "../data/articles";
import { publications } from "../data/publications";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  pageMeta,
  NOT_FOUND,
} from "./page-meta.js";

export { SITE_URL, SITE_NAME };

const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

/**
 * Legacy Vite SPA only. The Astro build imports ./page-meta.js directly, which
 * has no path to src/data/*, so the two article copies cannot both reach a
 * rendered page.
 */

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

  return { ...NOT_FOUND, key };
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
