import PageHero from "../components/sections/PageHero";
import ExecCta from "../components/sections/ExecCta";

const team = [
  {
    img: "/assets/team/dasril.webp",
    role: "Executive Director",
    name: "Dasril Guntara",
    desc: "Impact advisory and evaluation leader with more than 15 years of experience across development, humanitarian response, and institutional systems.",
  },
  {
    img: "/assets/team/fariz.webp",
    role: "Business Development Director",
    name: "Fariz Adlan Saputra",
    desc: "Impact-driven business builder leading service architecture, proposal development, institutional partnerships, and purpose-led growth.",
  },
  {
    img: "/assets/team/maulana.webp",
    role: "Marketing and Partnership Director",
    name: "Maulana Arif Pratama",
    desc: "Digital growth strategist leading marketing, brand presence, partnership outreach, and technology-enabled communication infrastructure.",
  },
  {
    img: "/assets/team/handriyana.webp",
    role: "PMO and Operations Director",
    name: "Handriyana",
    desc: "Operations and project management professional leading workflows, delivery tracking, reporting, documentation, and stakeholder coordination.",
  },
];

export default function TeamPage() {
  return (
    <>
      <PageHero label="OUR TEAM" title="The people behind the practice." />
      <section className="team">
        <div className="wrap">
          {team.map((m) => (
            <article key={m.name} className="profile">
              <div className="portrait">
                <img loading="lazy" src={m.img} alt={m.name} />
              </div>
              <div>
                <small>{m.role}</small>
                <h2>{m.name}</h2>
                <p>{m.desc}</p>
                <b>
                  Selected expertise and project exposure are based on the
                  approved CV review.
                </b>
              </div>
            </article>
          ))}
        </div>
      </section>
      <ExecCta />
    </>
  );
}
