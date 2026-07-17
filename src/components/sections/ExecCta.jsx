import { Link } from "react-router-dom";

export default function ExecCta() {
  return (
    <section className="exec">
      <div className="wrap execin">
        <div>
          <small>EXECUTIVE DISCUSSION</small>
          <h2>
            Let&rsquo;s discuss the strategic support your institution needs.
          </h2>
          <p>
            Immersia can help define the right scope, methodology, and
            deliverables.
          </p>
          <div className="actions">
            <Link className="btn gold" to="request-proposal.html">
              Request Proposal
            </Link>
            <a className="btn ghost" href="mailto:info@immersia.id">
              Schedule Strategic Discussion
            </a>
          </div>
          <a
            className="download"
            href="/assets/documents/immersia-company-profile-2026.pdf"
            download
          >
            <b>Download Company Profile</b>
            <span>PDF | 2026 | File download</span>
          </a>
        </div>
        <aside>
          <small>WHAT WE&rsquo;LL DISCUSS</small>
          <ul>
            <li>Mandate and operating context</li>
            <li>Strategic decisions requiring support</li>
            <li>Evidence, systems, and capabilities</li>
            <li>Outputs and deliverables</li>
            <li>Timeline and collaboration format</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
