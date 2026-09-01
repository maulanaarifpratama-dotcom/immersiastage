import { Link } from "react-router-dom";
import PageHero from "../components/sections/PageHero";
import ExecCta from "../components/sections/ExecCta";
import Icon from "../components/Icon";

const articles = [
  {
    img: "/assets/photos/practice6.webp",
    label: "Insight 001",
    title: "Why Baseline and Feasibility Studies Matter Before Program Design",
    desc: "A baseline and feasibility study provides structured evidence about current conditions and tests whether a proposed intervention is suitable for its intended context. Together, both studies help organizations move from assumptions to evidence-informed program decisions.",
    href: "/article-baseline-feasibility-study-program-design.html",
  },
  {
    img: "/assets/photos/dispora.webp",
    label: "Insight 002",
    // These two strings used to carry literal "M&amp;E": HTML entities inside
    // a JavaScript string are not decoded by JSX, so the page rendered the
    // ampersand escape verbatim.
    title: "How to Build an M&E System That Organizations Can Actually Use",
    desc: "A practical M&E system connects program logic, indicators, people, processes, technology, reporting, reflection, and management decisions. The objective is not to collect the greatest volume of data. The objective is to generate credible information that people can understand and use.",
    href: "/article-build-practical-monitoring-evaluation-system.html",
  },
  {
    img: "/assets/photos/practice5.webp",
    label: "Insight 003",
    title:
      "SROI, MSC, CSI, and OECD-DAC: How to Choose the Right Impact Assessment Method",
    desc: "The right impact assessment method depends on the evaluation question, intended users, program maturity, data readiness, available resources, and the decisions the assessment must inform. No single method is appropriate for every program.",
    href: "/article-choose-impact-assessment-method.html",
  },
  {
    img: "/assets/photos/general27.webp",
    label: "Insight 004",
    title:
      "Building Practical MEAL Capacity in Humanitarian and Social Impact Organizations",
    desc: "Practical MEAL capacity requires more than knowledge transfer. It connects concepts with real work, usable tools, supported practice, leadership, and institutional application.",
    href: "/article-building-practical-meal-capacity.html",
  },
  {
    img: "/assets/photos/general26.webp",
    label: "Insight 005",
    title: "Using Theory of Change to Strengthen Program Design",
    desc: "A Theory of Change explains how activities are expected to contribute to results and identifies the assumptions, relationships, actors, and conditions that influence change.",
    href: "/article-theory-of-change-program-design.html",
  },
];

export default function NewsPage() {
  return (
    <>
      <PageHero
        label="News &amp; articles"
        title="Learning from evidence and practice."
      />
      <section>
        <div className="wrap three">
          {articles.map((a) => (
            <Link key={a.href} className="article" to={a.href}>
              <img loading="lazy" src={a.img} alt="" width="360" height="190" />
              <div>
                <small>{a.label}</small>
                <h2>{a.title}</h2>
                <p>{a.desc}</p>
                <span className="more">
                  Read Article
                  <Icon name="arrowRight" size={17} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <ExecCta />
    </>
  );
}
