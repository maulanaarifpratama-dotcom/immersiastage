import { Link } from "react-router-dom";
import PageHero from "../components/sections/PageHero";
import ExecCta from "../components/sections/ExecCta";
import Icon from "../components/Icon";

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
    domain: "People",
    name: "SEAHUM",
    desc: "MEAL Capacity Building",
  },
  {
    img: "/assets/photos/practice2.webp",
    domain: "People",
    name: "Immersia Impact Lab",
    desc: "MEAL for Impact: Batch 01",
  },
  {
    img: "/assets/photos/poroz.webp",
    domain: "People",
    name: "POROZ",
    desc: "Impact-Driven Zakat Empowerment Learning Program",
  },
];

export default function ImpactLabPage() {
  return (
    <>
      <PageHero label="For people" title="Impact Capacity Building" />
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
          <small>What we deliver</small>
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
          <small>Selected client engagements</small>
          <h2>Representative experience.</h2>
          <div className="three">
            {engagements.map((e) => (
              <article key={e.name} className="eng">
                <img loading="lazy" src={e.img} alt="" />
                <div>
                  <small>{e.domain}</small>
                  <h3>{e.name}</h3>
                  <p>{e.desc}</p>
                  <Link to="/project-records.html">
                    <span>
                      View Record
                      <span className="visually-hidden"> for {e.name}</span>
                    </span>
                    <Icon name="arrowRight" size={17} />
                  </Link>
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
