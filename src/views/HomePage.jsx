import { Link } from "react-router-dom";
import ExecCta from "../components/sections/ExecCta";
import HeroCarousel from "../components/HeroCarousel";
import Icon from "../components/Icon";

const slides = [
  {
    bg: "/assets/photos/ycab1.webp",
    label: "Featured engagement",
    title: "YCAB Foundation",
    subtitle: "ANDAL Baseline and Feasibility Study",
  },
  {
    bg: "/assets/photos/baznas.webp",
    label: "Featured engagement",
    title: "BAZNAS RI",
    subtitle: "4 Programs Impact Study Using SROI and OECD-DAC",
  },
  {
    bg: "/assets/photos/human1.webp",
    label: "Featured engagement",
    title: "Human Initiative and Pertamina EP",
    subtitle: "Community Empowerment Impact Study",
  },
  {
    bg: "/assets/photos/ybm2.webp",
    label: "Featured engagement",
    title: "YBM BRILiaN",
    subtitle: "Impact Study Series Using SROI, MSC, and CSI",
  },
  {
    bg: "/assets/photos/edufarmers.webp",
    label: "Featured engagement",
    title: "Edu Farmers International",
    subtitle: "SROI Monitoring and M&E Framework Development",
  },
  {
    bg: "/assets/photos/seahum1.webp",
    label: "Featured engagement",
    title: "SEAHUM",
    subtitle: "MEAL Capacity Building for Southeast Asian CSOs",
  },
];

const logos = Array.from({ length: 26 }, (_, i) => i + 1);

const records = [
  {
    img: "/assets/photos/edufarmers.webp",
    domain: "Organization",
    name: "Edu Farmers International",
    desc: "SROI Monitoring and M&E Framework Development",
  },
  {
    img: "/assets/photos/ycab2.webp",
    domain: "Program / Project",
    name: "YCAB Foundation",
    desc: "ANDAL Baseline and Feasibility Study",
  },
  {
    img: "/assets/photos/baznas.webp",
    domain: "Program / Project",
    name: "BAZNAS RI",
    desc: "4 Programs Impact Study",
  },
  {
    img: "/assets/photos/human2.webp",
    domain: "Program / Project",
    name: "Human Initiative and Pertamina EP",
    desc: "Community Empowerment Impact Study",
  },
  {
    img: "/assets/photos/ybm1.webp",
    domain: "Program / Project",
    name: "YBM BRILiaN",
    desc: "Impact Study Series",
  },
  {
    img: "/assets/photos/seahum2.webp",
    domain: "People",
    name: "SEAHUM",
    desc: "MEAL Capacity Building",
  },
];

const insights = [
  {
    img: "/assets/photos/practice6.webp",
    label: "Insight 001",
    title: "Why Baseline and Feasibility Studies Matter Before Program Design",
    desc: "A baseline and feasibility study provides structured evidence about current conditions and tests whether a proposed intervention is suitable for its intended context.",
    href: "/article-baseline-feasibility-study-program-design.html",
  },
  {
    img: "/assets/photos/dispora.webp",
    label: "Insight 002",
    title: "How to Build an M&E System That Organizations Can Actually Use",
    desc: "A practical M&E system connects program logic, indicators, people, processes, technology, reporting, reflection, and management decisions.",
    href: "/article-build-practical-monitoring-evaluation-system.html",
  },
  {
    img: "/assets/photos/practice5.webp",
    label: "Insight 003",
    title:
      "SROI, MSC, CSI, and OECD-DAC: How to Choose the Right Impact Assessment Method",
    desc: "The right impact assessment method depends on the evaluation question, intended users, program maturity, data readiness, available resources, and the decisions the assessment must inform.",
    href: "/article-choose-impact-assessment-method.html",
  },
];

const pubs = [
  {
    img: "/assets/publications/1.webp",
    label: "SROI Study | 2025",
    title: "Social Return on Investment Study: SIMBA KUAT",
    href: "/publication-1.html",
  },
  {
    img: "/assets/publications/2.webp",
    label: "SROI Study | 2025",
    title: "Social Return on Investment Study: PERMATA",
    href: "/publication-2.html",
  },
  {
    img: "/assets/publications/3.webp",
    label: "Impact Study | 2025",
    title: "Family Strengthening Program Impact Study",
    href: "/publication-3.html",
  },
];

const team = [
  {
    img: "/assets/team/dasril.webp",
    name: "Dasril Guntara",
    role: "Executive Director",
    desc: "Impact advisory and evaluation leader with more than 15 years of experience across development, humanitarian response, and institutional systems.",
  },
  {
    img: "/assets/team/fariz.webp",
    name: "Fariz Adlan Saputra",
    role: "Business Development Director",
    desc: "Impact-driven business builder leading service architecture, proposal development, institutional partnerships, and purpose-led growth.",
  },
  {
    img: "/assets/team/maulana.webp",
    name: "Maulana Arif Pratama",
    role: "Marketing and Partnership Director",
    desc: "Digital growth strategist leading marketing, brand presence, partnership outreach, and technology-enabled communication infrastructure.",
  },
  {
    img: "/assets/team/handriyana.webp",
    name: "Handriyana",
    role: "PMO and Operations Director",
    desc: "Operations and project management professional leading workflows, delivery tracking, reporting, documentation, and stakeholder coordination.",
  },
];

const faqs = [
  {
    q: "What is the difference between Immersia’s three service domains?",
    a: "Integrated Impact Advisory works at the organizational level, Modular Impact Services addresses specific programs and projects, and Impact Capacity Building strengthens the capabilities of people and teams.",
  },
  {
    q: "How does Immersia select the appropriate methodology?",
    a: "Methodology is selected based on the decision question, operating context, stakeholder needs, program maturity, available evidence, data readiness, institutional capacity, and intended use of the findings.",
  },
  {
    q: "What does the initial engagement process look like?",
    a: "The process normally begins with a scoping discussion, followed by clarification of objectives, methodology, deliverables, stakeholders, timeline, collaboration format, and budget before a proposal is finalized.",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroCarousel slides={slides} />

      <section className="white">
        <div className="wrap split">
          <div>
            <small>Who we are</small>
            <h2>Closing the gap between analysis and action.</h2>
            <p className="lead">
              Immersia operates at the intersection of research, design, and
              organizational development.
            </p>
          </div>
          <img
            loading="lazy"
            src="/assets/photos/practice1.webp"
            alt="Immersia facilitators working with a partner organization"
            width="560"
            height="380"
          />
        </div>
      </section>

      <section className="why-matters">
        <div className="wrap">
          <div className="why-head">
            <div>
              <small>Why it matters</small>
              <h2>Most organizations know what they want to achieve.</h2>
              <p className="why-subtitle">
                Few have the systems to prove it, or sustain it.
              </p>
            </div>
            <img
              loading="lazy"
              src="/assets/photos/general27.webp"
              alt="Participants in an Immersia capacity-building session"
              width="440"
              height="300"
            />
          </div>
          <div className="why-grid">
            <article>
              <span>01</span>
              <h3>Programs designed without evidence</h3>
              <p>
                Interventions built on assumptions rather than baseline
                realities lead to misaligned efforts and resources spent on the
                wrong problems.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Impact measured but not acted on</h3>
              <p>
                Evaluation reports produced on schedule but rarely translated
                into decisions, learning, or real adjustments to program
                direction.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Capacity that does not transfer</h3>
              <p>
                Training delivered without embedding into day-to-day practice
                leaves organizations permanently dependent on external support.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="navy">
        <div className="wrap">
          <small>What we do</small>
          <h2>Three domains. One connected impact system.</h2>
          <div className="three">
            <article className="service">
              <img
                loading="lazy"
                src="/assets/photos/organization.webp"
                alt=""
                width="360"
                height="190"
              />
              <div>
                <small>For organization</small>
                <h3>Integrated Impact Advisory</h3>
                <p>
                  Impact architecture, M&amp;E systems, implementation, and
                  grant support.
                </p>
                <Link to="/integrated-advisory.html">
                  Explore Service
                  <Icon name="arrowRight" size={17} />
                </Link>
              </div>
            </article>
            <article className="service">
              <img
                loading="lazy"
                src="/assets/photos/human2.webp"
                alt=""
                width="360"
                height="190"
              />
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
              <img
                loading="lazy"
                src="/assets/photos/general27.webp"
                alt=""
                width="360"
                height="190"
              />
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
        </div>
      </section>

      <section className="white">
        <div className="wrap">
          <div className="approachhead">
            <div>
              <small>Our approach</small>
              <h2>Grounded insight. Actionable design. Lasting ownership.</h2>
            </div>
            <img
              loading="lazy"
              src="/assets/photos/general26.webp"
              alt="Immersia team facilitating a validation workshop"
              width="420"
              height="230"
            />
          </div>
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

      <section className="trust">
        <div className="wrap">
          <div className="stats">
            <div>
              <strong>15+</strong>Years of Methodological Practice
            </div>
            <div>
              <strong>23</strong>Cities and Regencies Covered
            </div>
            <div>
              <strong>3</strong>Domains of Engagement
            </div>
          </div>
          <small>Trusted across sectors</small>
          <div
            className="logowin"
            role="img"
            aria-label="Logos of 26 client and partner institutions Immersia has worked with"
          >
            <div className="logotrack" aria-hidden="true">
              {logos.map((n) => (
                <div key={n}>
                  <img loading="lazy" src={`/assets/logos/${n}.webp`} alt="" />
                </div>
              ))}
              {logos.map((n) => (
                <div key={`dup-${n}`}>
                  <img loading="lazy" src={`/assets/logos/${n}.webp`} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="white">
        <div className="wrap">
          <small>Selected project records</small>
          <h2>Representative work across every domain.</h2>
          <div className="three">
            {records.map((r) => (
              <article key={r.name} className="record">
                <img
                  loading="lazy"
                  src={r.img}
                  alt=""
                  width="360"
                  height="190"
                />
                <div>
                  <small>{r.domain}</small>
                  <h3>{r.name}</h3>
                  <p>{r.desc}</p>
                  <Link to="/project-records.html">
                    <span>
                      View Record
                      <span className="visually-hidden"> for {r.name}</span>
                    </span>
                    <Icon name="arrowRight" size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <small>News &amp; articles</small>
          <h2>Learning from evidence and practice.</h2>
          <div className="three">
            {insights.map((a) => (
              <Link key={a.href} className="article" to={a.href}>
                <img
                  loading="lazy"
                  src={a.img}
                  alt=""
                  width="360"
                  height="190"
                />
                <div>
                  <small>{a.label}</small>
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                  <span className="more">
                    Read Article
                    <Icon name="arrowRight" size={17} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <p>
            <Link className="btn" to="/news.html">
              View All Articles
            </Link>
          </p>
        </div>
      </section>

      <section className="white">
        <div className="wrap">
          <small>Selected publications</small>
          <h2>Representative reports and knowledge products.</h2>
          <div className="three">
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
                  <Link to={p.href}>
                    <span>
                      View Publication
                      <span className="visually-hidden"> {p.title}</span>
                    </span>
                    <Icon name="arrowRight" size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p>
            <Link className="btn" to="/publications.html">
              Explore Publications
            </Link>
          </p>
        </div>
      </section>

      <section className="team">
        <div className="wrap">
          <small>Our team</small>
          <h2>The people behind the practice.</h2>
          <div className="four">
            {team.map((m) => (
              <Link key={m.name} className="person" to="/team.html">
                <div className="portrait">
                  <img
                    loading="lazy"
                    src={m.img}
                    alt={`Portrait of ${m.name}`}
                  />
                </div>
                <div>
                  <h3>{m.name}</h3>
                  <b>{m.role}</b>
                  <p>{m.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap split">
          <div>
            <small>FAQ</small>
            <h2>Questions before starting an engagement?</h2>
            <Link className="btn" to="/faq.html">
              View All FAQs
            </Link>
          </div>
          <div>
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ExecCta />
    </>
  );
}
