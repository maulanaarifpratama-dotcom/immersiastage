import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function NotFoundPage() {
  const { pathname } = useLocation();

  return (
    <section className="notfound">
      <div className="wrap">
        <small>404</small>
        <h1>This page is not here.</h1>
        <p>
          Nothing is published at <code>{pathname}</code>. The address may have
          changed, or the link that brought you here may be out of date.
        </p>
        <div className="actions">
          <Link className="btn gold" to="/">
            Back to home
          </Link>
          <Link className="btn" to="/news.html">
            Browse News &amp; Articles
          </Link>
          <Link className="btn" to="/project-records.html">
            Browse Project Records
          </Link>
        </div>
      </div>
    </section>
  );
}
