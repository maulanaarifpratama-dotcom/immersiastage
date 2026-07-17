import { Link } from "react-router-dom";
import PageHero from "../components/sections/PageHero";
import ExecCta from "../components/sections/ExecCta";

const products = [
  { title: "MEAL for Impact" },
  { title: "Project Management for Impact" },
  { title: "Research Methods for Impact" },
  { title: "Theory of Change and Logic Model" },
  { title: "AI for Impact" },
  { title: "Grant Writing for Impact" },
];

const engagements = [
  {
    img: "/assets/photos/seahum2.webp",
    domain: "people",
    name: "SEAHUM",
    desc: "MEAL Capacity Building",
  },
  {
    img: "/assets/photos/practice2.webp",
    domain: "people",
    name: "Immersia Impact Lab",
    desc: "MEAL for Impact: Batch 01",
  },
  {
    img: "/assets/photos/poroz.webp",
    domain: "people",
    name: "POROZ",
    desc: "Impact-Driven Zakat Empowerment Learning Program",
  },
];

export default function ImpactLabPage() {
  return (
    <>
      <PageHero label="FOR PEOPLE" title="Impact Capacity Building" />
      <section className="white">
        <div className="wrap">
          <img
            loading="lazy"
            className="banner"
            src="/assets/photos/general27.webp"
            alt=""
          />
        </div>
      </section>
      <section>
        <div className="wrap">
          <small>WHAT WE DELIVER</small>
          <h2>Practical outputs designed for institutional use.</h2>
          <div className="three products">
            {products.map((p) => (
              <article key={p.title}>
                <h3>{p.title}</h3>
                <p>
                  Practical outputs, tools, and institutional application
                  tailored to the engagement.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="white">
        <div className="wrap">
          <small>SELECTED CLIENT ENGAGEMENTS</small>
          <h2>Representative experience.</h2>
          <div className="three">
            {engagements.map((e) => (
              <article key={e.name} className="eng">
                <img loading="lazy" src={e.img} alt="" />
                <div>
                  <small>{e.domain}</small>
                  <h3>{e.name}</h3>
                  <p>{e.desc}</p>
                  <Link to="project-records.html">View Record &rarr;</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ExecCta />
    </>
  );
}
