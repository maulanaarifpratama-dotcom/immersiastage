import PageHero from "../components/sections/PageHero";
import ExecCta from "../components/sections/ExecCta";

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="ABOUT IMMERSIA"
        title="Evidence that moves into decisions, systems, and action."
      />
      <section className="white">
        <div className="wrap split">
          <img loading="lazy" src="/assets/photos/practice1.webp" alt="" />
          <div>
            <h2>Who We Are</h2>
            <p className="lead">
              Immersia is an impact advisory and capacity-building firm working
              across organization, program/project, and people domains.
            </p>
            <p>
              We help institutions connect credible evidence with practical
              systems, program decisions, and lasting capability.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="wrap split">
          <div>
            <h2>Why Immersia Exists</h2>
            <p>
              Organizations often invest in research, evaluation, and training
              without building the systems needed to use the results. Immersia
              closes the gap between analysis and action.
            </p>
          </div>
          <img
            className="about-exists-photo"
            src="/assets/photos/general26.webp"
            alt=""
          />
        </div>
      </section>
      <section className="white about-icons">
        <div className="wrap">
          <h2>Who We Work With</h2>
          <div className="five">
            <b>Development agencies</b>
            <b>NGOs and CSOs</b>
            <b>Government institutions</b>
            <b>Corporations and state-owned enterprises</b>
            <b>Foundations and social enterprises</b>
          </div>
        </div>
      </section>
      <section className="about-icons">
        <div className="wrap">
          <h2>What Makes Immersia Different</h2>
          <div className="four approach">
            <article>
              <h3>Context First</h3>
              <p>
                Begin with actual capacity, stakeholders, constraints, and
                operating conditions.
              </p>
            </article>
            <article>
              <h3>Research-Grounded</h3>
              <p>
                Fit evidence approaches to the decision question and available
                data.
              </p>
            </article>
            <article>
              <h3>Designed for Execution</h3>
              <p>
                Account for ownership, timelines, systems, and operational
                reality.
              </p>
            </article>
            <article>
              <h3>Systemic Continuity</h3>
              <p>
                Build frameworks and capabilities that remain usable after the
                engagement.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="white">
        <div className="wrap split">
          <img loading="lazy" src="/assets/photos/practice5.webp" alt="" />
          <div>
            <h2>How We Work</h2>
            <ol>
              <li>Understand the context</li>
              <li>Design the approach</li>
              <li>Deliver with stakeholders</li>
              <li>Evaluate and learn</li>
              <li>Support continuity</li>
            </ol>
          </div>
        </div>
      </section>
      <ExecCta />
    </>
  );
}
