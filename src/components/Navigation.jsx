import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav>
      <div className="wrap ni">
        <Link to="/">
          <img loading="lazy" src="/assets/brand/logo.webp" alt="Immersia" />
        </Link>
        <button id="menu" aria-label="Open menu">
          ☰
        </button>
        <div id="links">
          <Link to="/">Home</Link>
          <Link to="/about.html">About</Link>
          <span className="dd">
            <Link to="/services.html">Services ▾</Link>
            <i>
              <Link to="/integrated-advisory.html">
                Integrated Impact Advisory
              </Link>
              <Link to="/modular-services.html">Modular Impact Services</Link>
              <Link to="/impact-lab.html">Impact Capacity Building</Link>
            </i>
          </span>
          <span className="dd">
            <Link to="/project-records.html">Work & Insights ▾</Link>
            <i>
              <Link to="/project-records.html">Project Records</Link>
              <Link to="/news.html">News & Articles</Link>
            </i>
          </span>
          <Link to="/publications.html">Publications</Link>
          <Link to="/team.html">Team</Link>
          <Link to="/faq.html">FAQ</Link>
          <Link className="proposal" to="/request-proposal.html">
            Request Proposal
          </Link>
        </div>
      </div>
    </nav>
  );
}
