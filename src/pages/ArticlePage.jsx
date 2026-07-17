import { Link } from "react-router-dom";
import ExecCta from "../components/sections/ExecCta";

export default function ArticlePage({ article }) {
  if (!article) return null;

  return (
    <>
      <header
        className={`articlehero${article.long ? " long" : ""}`}
        style={{ "--hero": `url(${article.hero})` }}
      >
        <div className="wrap">
          <small>{article.label}</small>
          <h1>{article.title}</h1>
        </div>
      </header>
      <article className="articlebody">
        <p className="lead">{article.lead}</p>
        <figure>
          <img
            loading="lazy"
            src={article.figure}
            alt="Immersia practice documentation"
          />
        </figure>
        {article.sections.map((sec, i) => (
          <section key={i}>
            {sec.h2 && <h2>{sec.h2}</h2>}
            {sec.ps && sec.ps.map((p, j) => <p key={j}>{p}</p>)}
            {sec.items && (
              <ul className={sec.refs ? "references" : ""}>
                {sec.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
        <div className="articlecta">
          <h2>{article.ctaTitle}</h2>
          <p>{article.ctaDesc}</p>
          <Link className="btn gold" to="request-proposal.html">
            {article.ctaBtn}
          </Link>
        </div>
      </article>
      <ExecCta />
    </>
  );
}
