import { useId, useMemo, useState } from "react";
import PageHero from "../components/sections/PageHero";

const DOMAIN_LABEL = {
  organization: "Organization",
  "program-project": "Program / Project",
  people: "People",
};

const STATUS_LABEL = {
  active: "Active engagement",
  "Founding Team Experience": "Founding Team Experience",
  "Coming Soon": "Coming Soon",
};

const projects = [
  {
    domain: "organization",
    status: "Founding Team Experience",
    img: "/assets/photos/nama.webp",
    name: "NAMA Foundation Malaysia",
    desc: "CSO and School Index Development",
  },
  {
    domain: "organization",
    status: "active",
    img: "/assets/photos/edufarmers.webp",
    name: "Edu Farmers International",
    desc: "SROI Monitoring and M&E Framework Development",
  },
  {
    domain: "organization",
    status: "active",
    img: "/assets/photos/dispora.webp",
    name: "Dispora Kabupaten Bogor",
    desc: "Risk Management System and Business Process Documentation",
  },
  {
    domain: "organization",
    status: "active",
    img: "/assets/photos/nfdmc.webp",
    name: "NFDMC and Save the Children",
    desc: "Violence Prevention Program: Implementation Monitoring",
  },
  {
    domain: "program-project",
    status: "active",
    img: "/assets/photos/ycab2.webp",
    name: "YCAB Foundation",
    desc: "ANDAL Baseline and Feasibility Study",
  },
  {
    domain: "program-project",
    status: "Coming Soon",
    img: "/assets/photos/coming.webp",
    name: "Atome and Bisa Baik Bersama",
    desc: "Atome Untuk Negeri: CSR Program Design and Implementation Advisory",
    soon: true,
  },
  {
    domain: "program-project",
    status: "Coming Soon",
    img: "/assets/photos/coming.webp",
    name: "PLAN International",
    desc: "CS5 Annual Survey: Community Scorecard",
    soon: true,
  },
  {
    domain: "program-project",
    status: "active",
    img: "/assets/photos/nfdmc-road-safety.webp",
    name: "NFDMC and Save the Children Korea",
    desc: "Road Safety Program Monitoring: Phase 3",
  },
  {
    domain: "program-project",
    status: "active",
    img: "/assets/photos/wvi.webp",
    name: "World Vision Indonesia",
    desc: "Multiple Program Evaluations",
  },
  {
    domain: "program-project",
    status: "active",
    img: "/assets/photos/bri.webp",
    name: "PT Bank Rakyat Indonesia",
    desc: "Desa Brilian Impact Assessment",
  },
  {
    domain: "program-project",
    status: "active",
    img: "/assets/photos/baznas.webp",
    name: "BAZNAS RI",
    desc: "4 Programs Impact Study Using SROI and OECD-DAC",
  },
  {
    domain: "program-project",
    status: "active",
    img: "/assets/photos/human2.webp",
    name: "Human Initiative and Pertamina EP",
    desc: "Community Empowerment Impact Study",
  },
  {
    domain: "program-project",
    status: "active",
    img: "/assets/photos/ybm2.webp",
    name: "YBM BRILiaN",
    desc: "Impact Study Series Using SROI, MSC, and CSI",
  },
  {
    domain: "program-project",
    status: "active",
    img: "/assets/photos/edufarmers.webp",
    name: "Edu Farmers International",
    desc: "SROI Monitoring and M&E Framework Development",
  },
  {
    domain: "program-project",
    status: "active",
    img: "/assets/photos/zakat-sukses.webp",
    name: "LAZ Zakat Sukses",
    desc: "Zakat Impact Assessment",
  },
  {
    domain: "program-project",
    status: "active",
    img: "/assets/photos/people.webp",
    name: "People and Project Management Consultant",
    desc: "Project Management System Development",
  },
  {
    domain: "program-project",
    status: "Founding Team Experience",
    img: "/assets/photos/baznas-memorandum.webp",
    name: "BAZNAS RI, BNPB, Ministry of Social Affairs",
    desc: "Post-Disaster Coordination and Needs Assessment Memorandum",
  },
  {
    domain: "program-project",
    status: "Founding Team Experience",
    img: "/assets/photos/ybm1.webp",
    name: "YBM BRILiaN",
    desc: "YBM BRILiaN Scholarship Program Impact Assessment",
  },
  {
    domain: "program-project",
    status: "Founding Team Experience",
    img: "/assets/photos/ycab1.webp",
    name: "YCAB Foundation",
    desc: "ANDAL: Baseline and Feasibility Study",
  },
  {
    domain: "program-project",
    status: "Founding Team Experience",
    img: "/assets/photos/seahum1.webp",
    name: "SEAHUM",
    desc: "MEAL Capacity Building Program for SEAHUM Partner Organizations",
  },
  {
    domain: "program-project",
    status: "active",
    img: "/assets/photos/practice1.webp",
    name: "Immersia",
    desc: "Immersia Impact Lab: MEAL for Impact Batch 01",
  },
  {
    domain: "program-project",
    status: "Coming Soon",
    img: "/assets/photos/coming.webp",
    name: "SEAHUM",
    desc: "MEAL for Impact Batch 02",
    soon: true,
  },
  {
    domain: "program-project",
    status: "Coming Soon",
    img: "/assets/photos/coming.webp",
    name: "Atome and Bisa Baik Bersama",
    desc: "Atome Untuk Negeri: Impact Assessment",
    soon: true,
  },
  {
    domain: "organization",
    status: "active",
    img: "/assets/photos/seahum2.webp",
    name: "SEAHUM",
    desc: "MEAL Capacity Building",
  },
  {
    domain: "organization",
    status: "active",
    img: "/assets/photos/wvi.webp",
    name: "World Vision Indonesia",
    desc: "Multiple Program Evaluations, TPAT Assessment",
  },
  {
    domain: "organization",
    status: "Founding Team Experience",
    img: "/assets/photos/nama.webp",
    name: "NAMA Foundation Malaysia",
    desc: "CSO and School Index Development",
  },
  {
    domain: "organization",
    status: "Founding Team Experience",
    img: "/assets/photos/ybm3.webp",
    name: "YBM BRILiaN",
    desc: "Regulatory Compliance Support",
  },
  {
    domain: "program-project",
    status: "Founding Team Experience",
    img: "/assets/photos/practice3.webp",
    name: "World Vision Singapore / YCAB Foundation",
    desc: "ANDAL: Participant and Community Training",
  },
  {
    domain: "program-project",
    status: "Founding Team Experience",
    img: "/assets/photos/practice4.webp",
    name: "YBM BRILiaN",
    desc: "Social Return on Investment Training",
  },
];

// Filters are derived from the records themselves. The previous version
// hard-coded a "People" domain button that no record could ever match, so it
// always returned an empty grid with no explanation.
const domains = [...new Set(projects.map((p) => p.domain))];
const statuses = [...new Set(projects.map((p) => p.status))];

export default function ProjectRecordsPage() {
  const [domain, setDomain] = useState("all");
  const [status, setStatus] = useState("all");
  const [query, setQuery] = useState("");
  const searchId = useId();
  const statusId = useId();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter(
      (p) =>
        (domain === "all" || p.domain === domain) &&
        (status === "all" || p.status === status) &&
        (!q ||
          `${p.name} ${p.desc} ${DOMAIN_LABEL[p.domain]}`
            .toLowerCase()
            .includes(q)),
    );
  }, [domain, status, query]);

  return (
    <>
      <PageHero
        label="Project records"
        title="Evidence, systems, and capability in practice."
      />
      <section>
        <div className="wrap">
          <div className="filters" role="group" aria-label="Filter records">
            <button
              type="button"
              aria-pressed={domain === "all"}
              onClick={() => setDomain("all")}
            >
              All domains
            </button>
            {domains.map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={domain === d}
                onClick={() => setDomain(d)}
              >
                {DOMAIN_LABEL[d] || d}
              </button>
            ))}

            <label className="visually-hidden" htmlFor={statusId}>
              Filter by status
            </label>
            <select
              id={statusId}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">All statuses</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABEL[s] || s}
                </option>
              ))}
            </select>

            <label className="visually-hidden" htmlFor={searchId}>
              Search client or project
            </label>
            <input
              id={searchId}
              type="search"
              value={query}
              placeholder="Search client or project"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <p className="filtercount" role="status">
            {results.length === projects.length
              ? `${projects.length} records`
              : `${results.length} of ${projects.length} records`}
          </p>

          {results.length === 0 ? (
            <div className="emptystate">
              <h2>No records match these filters.</h2>
              <p>Try a different domain or status, or clear the search term.</p>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setDomain("all");
                  setStatus("all");
                  setQuery("");
                }}
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="three">
              {results.map((p, i) => (
                <article
                  key={`${p.name}-${p.desc}-${i}`}
                  className={`project${p.soon ? " soon" : ""}`}
                >
                  {p.soon && <span className="badge">Coming soon</span>}
                  <img
                    loading="lazy"
                    src={p.img}
                    alt=""
                    width="360"
                    height="185"
                  />
                  <div>
                    <small>{DOMAIN_LABEL[p.domain]}</small>
                    <h2>{p.name}</h2>
                    <p>{p.desc}</p>
                    {p.status !== "active" && !p.soon && (
                      <em>{STATUS_LABEL[p.status]}</em>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
