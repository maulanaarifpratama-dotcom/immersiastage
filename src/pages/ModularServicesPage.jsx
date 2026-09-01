import { Link } from "react-router-dom";
import PageHero from "../components/sections/PageHero";
import ExecCta from "../components/sections/ExecCta";
import Icon from "../components/Icon";

const products = [
  { title: "Baseline Research Study" },
  { title: "Program Design" },
  { title: "Program Evaluation Study" },
  { title: "Impact Assessment" },
];

const engagements = [
  {
    img: "/assets/photos/ycab2.webp",
    domain: "Program / Project",
    name: "YCAB Foundation",
    desc: "ANDAL Baseline and Feasibility Study",
  },
  {
    img: "/assets/photos/coming.webp",
    domain: "Program / Project",
    name: "Atome and Bisa Baik Bersama",
    desc: "Atome Untuk Negeri: CSR Program Design and Implementation Advisory",
    em: "Coming Soon",
    soon: true,
  },
  {
    img: "/assets/photos/coming.webp",
    domain: "Program / Project",
    name: "PLAN International",
    desc: "CS5 Annual Survey: Community Scorecard",
    em: "Coming Soon",
    soon: true,
  },
  {
    img: "/assets/photos/nfdmc-road-safety.webp",
    domain: "Program / Project",
    name: "NFDMC and Save the Children Korea",
    desc: "Road Safety Program Monitoring: Phase 3",
  },
  {
    img: "/assets/photos/wvi.webp",
    domain: "Program / Project",
    name: "World Vision Indonesia",
    desc: "Multiple Program Evaluations",
    em: "Founding Team Experience",
  },
  {
    img: "/assets/photos/bri.webp",
    domain: "Program / Project",
    name: "PT Bank Rakyat Indonesia",
    desc: "Desa Brilian Impact Assessment",
  },
];

export default function ModularServicesPage() {
  return (
    <>
      <PageHero label="For program / project" title="Modular Impact Services" />
      <section className="white">
        <div className="wrap">
          <img
            loading="lazy"
            className="banner"
            src="/assets/photos/general26.webp"
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
              <article key={e.name} className={`eng${e.soon ? " soon" : ""}`}>
                <img loading="lazy" src={e.img} alt="" />
                <div>
                  <small>{e.domain}</small>
                  <h3>{e.name}</h3>
                  <p>{e.desc}</p>
                  {e.em && <em>{e.em}</em>}
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
