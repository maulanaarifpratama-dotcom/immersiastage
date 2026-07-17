import PageHero from "../components/sections/PageHero";

const projects = [
  {
    domain: "organization",
    status: "Founding Team Experience",
    img: "/assets/photos/nama.webp",
    label: "organization",
    name: "NAMA Foundation Malaysia",
    desc: "CSO and School Index Development",
    em: "Founding Team Experience",
  },
  {
    domain: "organization",
    status: "active",
    img: "/assets/photos/edufarmers.webp",
    label: "organization",
    name: "Edu Farmers International",
    desc: "SROI Monitoring and M&E Framework Development",
  },
  {
    domain: "organization",
    status: "active",
    img: "/assets/photos/dispora.webp",
    label: "organization",
    name: "Dispora Kabupaten Bogor",
    desc: "Risk Management System and Business Process Documentation",
  },
  {
    domain: "organization",
    status: "active",
    img: "/assets/photos/nfdmc.webp",
    label: "organization",
    name: "NFDMC and Save the Children",
    desc: "Violence Prevention Program: Implementation Monitoring",
  },
  {
    domain: "program-project",
    status: "active",
    img: "/assets/photos/ycab2.webp",
    label: "program-project",
    name: "YCAB Foundation",
    desc: "ANDAL Baseline and Feasibility Study",
  },
  {
    domain: "program-project",
    status: "Coming Soon",
    img: "/assets/photos/coming.webp",
    label: "program-project",
    name: "Atome and Bisa Baik Bersama",
    desc: "Atome Untuk Negeri: CSR Program Design and Implementation Advisory",
    em: "Coming Soon",
    soon: true,
  },
  {
    domain: "program-project",
    status: "Coming Soon",
    img: "/assets/photos/coming.webp",
    label: "program-project",
    name: "PLAN International",
    desc: "CS5 Annual Survey: Community Scorecard",
    em: "Coming Soon",
    soon: true,
  },
  {
    domain: "program-project",
    status: "active",
    img: "/assets/photos/nfdmc-road-safety.webp",
    label: "program-project",
    name: "NFDMC and Save the Children Korea",
    desc: "Road Safety Program Monitoring: Phase 3",
  },
  {
    domain: "program-project",
    status: "active",
    img: "/assets/photos/wvi.webp",
    label: "program-project",
    name: "World Vision Indonesia",
    desc: "Multiple Program Evaluations",
  },
  {
    domain: "program-project",
    status: "active",
    img: "/assets/photos/bri.webp",
    label: "program-project",
    name: "PT Bank Rakyat Indonesia",
    desc: "Desa Brilian Impact Assessment",
  },
  {
    domain: "program-project",
    status: "active",
    img: "/assets/photos/baznas.webp",
    label: "program-project",
    name: "BAZNAS RI",
    desc: "4 Programs Impact Study Using SROI and OECD-DAC",
  },
  {
    domain: "program-project",
    status: "active",
    img: "/assets/photos/human2.webp",
    label: "program-project",
    name: "Human Initiative and Pertamina EP",
    desc: "Community Empowerment Impact Study",
  },
  {
    domain: "program-project",
    status: "active",
    img: "/assets/photos/ybm2.webp",
    label: "program-project",
    name: "YBM BRILiaN",
    desc: "Impact Study Series Using SROI, MSC, and CSI",
  },
  {
    domain: "program-project",
    status: "active",
    img: "/assets/photos/edufarmers.webp",
    label: "program-project",
    name: "Edu Farmers International",
    desc: "SROI Monitoring and M&E Framework Development",
  },
  {
    domain: "program-project",
    status: "active",
    img: "/assets/photos/zakat-sukses.webp",
    label: "program-project",
    name: "LAZ Zakat Sukses",
    desc: "Zakat Impact Assessment",
  },
  {
    domain: "program-project",
    status: "active",
    img: "/assets/photos/people.webp",
    label: "program-project",
    name: "People and Project Management Consultant",
    desc: "Project Management System Development",
  },
  {
    domain: "program-project",
    status: "Founding Team Experience",
    img: "/assets/photos/baznas-memorandum.webp",
    label: "program-project",
    name: "BAZNAS RI, BNPB, Ministry of Social Affairs",
    desc: "Post-Disaster Coordination and Needs Assessment Memorandum",
    em: "Founding Team Experience",
  },
  {
    domain: "program-project",
    status: "Founding Team Experience",
    img: "/assets/photos/ybm1.webp",
    label: "program-project",
    name: "YBM BRILiaN",
    desc: "YBM BRILiaN Scholarship Program Impact Assessment",
    em: "Founding Team Experience",
  },
  {
    domain: "program-project",
    status: "Founding Team Experience",
    img: "/assets/photos/ycab1.webp",
    label: "program-project",
    name: "YCAB Foundation",
    desc: "ANDAL: Baseline and Feasibility Study",
    em: "Founding Team Experience",
  },
  {
    domain: "program-project",
    status: "Founding Team Experience",
    img: "/assets/photos/seahum1.webp",
    label: "program-project",
    name: "SEAHUM",
    desc: "MEAL Capacity Building Program for SEAHUM Partner Organizations",
    em: "Founding Team Experience",
  },
  {
    domain: "program-project",
    status: "active",
    img: "/assets/photos/practice1.webp",
    label: "program-project",
    name: "Immersia",
    desc: "Immersia Impact Lab: MEAL for Impact Batch 01",
  },
  {
    domain: "program-project",
    status: "Coming Soon",
    img: "/assets/photos/coming.webp",
    label: "program-project",
    name: "SEAHUM",
    desc: "MEAL for Impact Batch 02",
    em: "Coming Soon",
    soon: true,
  },
  {
    domain: "program-project",
    status: "Coming Soon",
    img: "/assets/photos/coming.webp",
    label: "program-project",
    name: "Atome and Bisa Baik Bersama",
    desc: "Atome Untuk Negeri: Impact Assessment",
    em: "Coming Soon",
    soon: true,
  },
  {
    domain: "organization",
    status: "active",
    img: "/assets/photos/seahum2.webp",
    label: "organization",
    name: "SEAHUM",
    desc: "MEAL Capacity Building",
  },
  {
    domain: "organization",
    status: "active",
    img: "/assets/photos/wvi.webp",
    label: "organization",
    name: "World Vision Indonesia",
    desc: "Multiple Program Evaluations, TPAT Assessment",
  },
  {
    domain: "organization",
    status: "Founding Team Experience",
    img: "/assets/photos/nama.webp",
    label: "organization",
    name: "NAMA Foundation Malaysia",
    desc: "CSO and School Index Development",
    em: "Founding Team Experience",
  },
  {
    domain: "organization",
    status: "Founding Team Experience",
    img: "/assets/photos/ybm3.webp",
    label: "organization",
    name: "YBM BRILiaN",
    desc: "Regulatory Compliance Support",
    em: "Founding Team Experience",
  },
  {
    domain: "program-project",
    status: "Founding Team Experience",
    img: "/assets/photos/practice3.webp",
    label: "program-project",
    name: "World Vision Singapore / YCAB Foundation",
    desc: "ANDAL: Participant and Community Training",
    em: "Founding Team Experience",
  },
  {
    domain: "program-project",
    status: "Founding Team Experience",
    img: "/assets/photos/practice4.webp",
    label: "program-project",
    name: "YBM BRILiaN",
    desc: "Social Return on Investment Training",
    em: "Founding Team Experience",
  },
];

export default function ProjectRecordsPage() {
  return (
    <>
      <PageHero
        label="PROJECT RECORDS"
        title="Evidence, systems, and capability in practice."
      />
      <section>
        <div className="wrap">
          <div className="filters">
            <button className="active" aria-pressed="true" data-filter="all">
              All
            </button>
            <button data-filter="organization">Organization</button>
            <button data-filter="program-project">Program/Project</button>
            <button data-filter="people">People</button>
            <select id="status">
              <option value="all">All Statuses</option>
              <option>Founding Team Experience</option>
              <option>Coming Soon</option>
            </select>
            <input id="search" placeholder="Search client or project" />
          </div>
          <div className="three" id="projectGrid">
            {projects.map((p, i) => (
              <article
                key={i}
                className={`project${p.soon ? " soon" : ""}`}
                data-domain={p.domain}
                data-status={p.status}
              >
                <img loading="lazy" src={p.img} alt="" />
                <div>
                  <small>{p.label}</small>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  {p.em && <em>{p.em}</em>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
