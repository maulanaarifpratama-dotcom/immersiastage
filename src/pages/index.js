import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import ServicesPage from "./ServicesPage";
import IntegratedAdvisoryPage from "./IntegratedAdvisoryPage";
import ModularServicesPage from "./ModularServicesPage";
import ImpactLabPage from "./ImpactLabPage";
import ProjectRecordsPage from "./ProjectRecordsPage";
import NewsPage from "./NewsPage";
import PublicationsPage from "./PublicationsPage";
import TeamPage from "./TeamPage";
import FaqPage from "./FaqPage";
import RequestProposalPage from "./RequestProposalPage";
import ArticlePage from "./ArticlePage";
import PublicationPage from "./PublicationPage";
import NotFoundPage from "./NotFoundPage";
import { articles } from "../data/articles";
import { publications } from "../data/publications";

export const pageComponents = {
  "index.html": HomePage,
  "about.html": AboutPage,
  "services.html": ServicesPage,
  "integrated-advisory.html": IntegratedAdvisoryPage,
  "modular-services.html": ModularServicesPage,
  "impact-lab.html": ImpactLabPage,
  "project-records.html": ProjectRecordsPage,
  "news.html": NewsPage,
  "publications.html": PublicationsPage,
  "team.html": TeamPage,
  "faq.html": FaqPage,
  "request-proposal.html": RequestProposalPage,
};

export function getPageComponent(key) {
  if (pageComponents[key]) {
    return { Component: pageComponents[key], props: {}, found: true };
  }

  if (articles[key]) {
    return {
      Component: ArticlePage,
      props: { article: articles[key] },
      found: true,
    };
  }

  if (publications[key]) {
    return {
      Component: PublicationPage,
      props: publications[key],
      found: true,
    };
  }

  // Previously this fell back to the homepage, so every mistyped or retired
  // URL answered 200 with the front page. That is a soft 404: it hides broken
  // links from the visitor and gets the homepage indexed under dozens of URLs.
  return { Component: NotFoundPage, props: {}, found: false };
}
