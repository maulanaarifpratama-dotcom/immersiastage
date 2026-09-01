import { Link } from "react-router-dom";
import PageHero from "../components/sections/PageHero";
import ExecCta from "../components/sections/ExecCta";
import Icon from "../components/Icon";

const products = [
  { title: "Impact Architecture" },
  { title: "M&E Framework and System" },
  { title: "System Implementation" },
  { title: "Grant and Implementation Support" },
];

const engagements = [
  {
    img: "/assets/photos/nama.webp",
    domain: "Organization",
    name: "NAMA Foundation Malaysia",
    desc: "CSO and School Index Development",
    em: "Founding Team Experience",
  },
  {
    img: "/assets/photos/edufarmers.webp",
    domain: "Organization",
    name: "Edu Farmers International",
    desc: "SROI Monitoring and M&E Framework Development",
  },
  {
    img: "/assets/photos/dispora.webp",
    domain: "Organization",
    name: "Dispora Kabupaten Bogor",
    desc: "Risk Management System and Business Process Documentation",
  },
  {
    img: "/assets/photos/nfdmc.webp",
    domain: "Organization",
    name: "NFDMC and Save the Children",
    desc: "Violence Prevention Program: Implementation Monitoring",
  },
];

function ProductCard({ title }) {
  return (
    <article>
      <h3>{title}</h3>
      <p>
        Practical outputs, tools, and institutional application tailored to the
        engagement.
      </p>
    </article>
  );
}

function EngCard({ img, domain, name, desc, em }) {
  return (
    <article className="eng">
      <img loading="lazy" src={img} alt="" />
      <div>
        <small>{domain}</small>
        <h3>{name}</h3>
        <p>{desc}</p>
        {em && <em>{em}</em>}
        <Link to="/project-records.html">
          <span>
            View Record
            <span className="visually-hidden"> for {name}</span>
          </span>
          <Icon name="arrowRight" size={17} />
        </Link>
      </div>
    </article>
  );
}

export default function IntegratedAdvisoryPage() {
  return (
    <>
      <PageHero label="For organization" title="Integrated Impact Advisory" />
      <section className="white">
        <div className="wrap">
          <img
            loading="lazy"
            className="banner"
            src="/assets/photos/worldbank.webp"
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
              <ProductCard key={p.title} title={p.title} />
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
              <EngCard key={e.name} {...e} />
            ))}
          </div>
        </div>
      </section>
      <ExecCta />
    </>
  );
}
