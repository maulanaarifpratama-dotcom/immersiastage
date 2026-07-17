import { Link } from "react-router-dom";
import PageHero from "../components/sections/PageHero";
import ExecCta from "../components/sections/ExecCta";

const articles = [
  {
    img: "/assets/photos/practice6.webp",
    label: "INSIGHT 001",
    title: "Why Baseline and Feasibility Studies Matter Before Program Design",
    desc: "A baseline and feasibility study provides structured evidence about current conditions and tests whether a proposed intervention is suitable for its intended context. Together, both studies help organizations move from assumptions to evidence-informed program decisions.",
    href: "article-baseline-feasibility-study-program-design.html",
  },
  {
    img: "/assets/photos/dispora.webp",
    label: "INSIGHT 002",
    title: "How to Build an M&amp;E System That Organizations Can Actually Use",
    desc: "A practical M&amp;E system connects program logic, indicators, people, processes, technology, reporting, reflection, and management decisions. The objective is not to collect the greatest volume of data. The objective is to generate credible information that people can understand and use.",
    href: "article-build-practical-monitoring-evaluation-system.html",
  },
  {
    img: "/assets/photos/practice5.webp",
    label: "INSIGHT 003",
    title:
      "SROI, MSC, CSI, and OECD-DAC: How to Choose the Right Impact Assessment Method",
    desc: "The right impact assessment method depends on the evaluation question, intended users, program maturity, data readiness, available resources, and the decisions the assessment must inform. No single method is appropriate for every program.",
    href: "article-choose-impact-assessment-method.html",
  },
  {
    img: "/assets/photos/general27.webp",
    label: "INSIGHT 004",
    title:
      "Building Practical MEAL Capacity in Humanitarian and Social Impact Organizations",
    desc: "Practical MEAL capacity requires more than knowledge transfer. It connects concepts with real work, usable tools, supported practice, leadership, and institutional application.",
    href: "article-building-practical-meal-capacity.html",
  },
  {
    img: "/assets/photos/general26.webp",
    label: "INSIGHT 005",
    title: "Using Theory of Change to Strengthen Program Design",
    desc: "A Theory of Change explains how activities are expected to contribute to results and identifies the assumptions, relationships, actors, and conditions that influence change.",
    href: "article-theory-of-change-program-design.html",
  },
];

export default function NewsPage() {
  return (
    <>
      <PageHero
        label="NEWS &amp; ARTICLES"
        title="Learning from evidence and practice."
      />
      <section>
        <div className="wrap three">
          {articles.map((a) => (
            <Link key={a.href} className="article" to={a.href}>
              <img loading="lazy" src={a.img} alt="" />
              <div>
                <small>{a.label}</small>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
                <b>Read Article &rarr;</b>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <ExecCta />
    </>
  );
}
