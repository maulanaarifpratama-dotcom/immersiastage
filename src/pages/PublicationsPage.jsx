import { Link } from "react-router-dom";
import PageHero from "../components/sections/PageHero";
import ExecCta from "../components/sections/ExecCta";

const pubs = [
  {
    img: "/assets/publications/1.webp",
    label: "SROI Study | 2025",
    title: "Social Return on Investment Study: SIMBA KUAT",
    href: "publication-1.html",
  },
  {
    img: "/assets/publications/2.webp",
    label: "SROI Study | 2025",
    title: "Social Return on Investment Study: PERMATA",
    href: "publication-2.html",
  },
  {
    img: "/assets/publications/3.webp",
    label: "Impact Study | 2025",
    title: "Family Strengthening Program Impact Study",
    href: "publication-3.html",
  },
  {
    img: "/assets/publications/4.webp",
    label: "Community Satisfaction | 2025",
    title: "Community Satisfaction Study: PERMATA",
    href: "publication-4.html",
  },
  {
    img: "/assets/publications/5.webp",
    label: "Community Satisfaction | 2025",
    title: "Community Satisfaction Study: SIMBA KUAT",
    href: "publication-5.html",
  },
  {
    img: "/assets/publications/6.webp",
    label: "Social Innovation | 2025",
    title: "Social Innovation Study: PERMATA",
    href: "publication-6.html",
  },
];

export default function PublicationsPage() {
  return (
    <>
      <PageHero
        label="PUBLICATIONS"
        title="Evidence translated into practical knowledge products."
      />
      <section>
        <div className="wrap three">
          {pubs.map((p) => (
            <article key={p.href} className="pub">
              <img loading="lazy" src={p.img} alt="" />
              <div>
                <small>{p.label}</small>
                <h3>{p.title}</h3>
                <p>
                  Representative publication from Immersia&rsquo;s advisory
                  portfolio.
                </p>
                <Link to={p.href}>View Publication &rarr;</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <ExecCta />
    </>
  );
}
