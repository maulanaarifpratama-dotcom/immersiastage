import PageHero from "../components/sections/PageHero";
import ExecCta from "../components/sections/ExecCta";

export default function PublicationPage({ label, title, img }) {
  return (
    <>
      <PageHero label={label} title={title} />
      <section className="white">
        <div className="wrap split">
          <img loading="lazy" src={img} alt="" />
          <div>
            <h2>Representative Publication</h2>
            <p>
              The full report contains client and program information that is
              not publicly available.
            </p>
          </div>
        </div>
      </section>
      <ExecCta />
    </>
  );
}
