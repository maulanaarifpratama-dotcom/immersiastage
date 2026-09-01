import { Link } from "react-router-dom";
import PageHero from "../components/sections/PageHero";
import ExecCta from "../components/sections/ExecCta";
import Icon from "../components/Icon";

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="Designed around where impact happens."
      />
      <section>
        <div className="wrap three">
          <article className="service">
            <img loading="lazy" src="/assets/photos/organization.webp" alt="" />
            <div>
              <small>For organization</small>
              <h3>Integrated Impact Advisory</h3>
              <p>
                Impact architecture, M&amp;E systems, implementation, and grant
                support.
              </p>
              <Link to="/integrated-advisory.html">
                Explore Service
                <Icon name="arrowRight" size={17} />
              </Link>
            </div>
          </article>
          <article className="service">
            <img loading="lazy" src="/assets/photos/human2.webp" alt="" />
            <div>
              <small>For program / project</small>
              <h3>Modular Impact Services</h3>
              <p>
                Baseline research, design, evaluation, and impact assessment.
              </p>
              <Link to="/modular-services.html">
                Explore Service
                <Icon name="arrowRight" size={17} />
              </Link>
            </div>
          </article>
          <article className="service">
            <img loading="lazy" src="/assets/photos/general27.webp" alt="" />
            <div>
              <small>For people</small>
              <h3>Impact Capacity Building</h3>
              <p>Practical capability through Immersia Impact Lab.</p>
              <Link to="/impact-lab.html">
                Explore Service
                <Icon name="arrowRight" size={17} />
              </Link>
            </div>
          </article>
        </div>
      </section>
      <ExecCta />
    </>
  );
}
