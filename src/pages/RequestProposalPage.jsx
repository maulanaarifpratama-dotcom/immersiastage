import PageHero from "../components/sections/PageHero";

export default function RequestProposalPage() {
  return (
    <>
      <PageHero
        label="REQUEST PROPOSAL"
        title="Tell us what you need to strengthen."
      />
      <section>
        <div className="wrap form">
          <form id="proposalForm">
            <input
              name="organization"
              placeholder="Organization name"
              required
            />
            <input name="contact" placeholder="Contact person" required />
            <input name="email" type="email" placeholder="Email" required />
            <select name="service">
              <option>Integrated Impact Advisory</option>
              <option>Modular Impact Services</option>
              <option>Impact Capacity Building</option>
            </select>
            <textarea
              name="challenge"
              placeholder="Background or challenge"
              required
            />
            <textarea name="outputs" placeholder="Expected outputs" />
            <button className="btn gold">Prepare Proposal Request</button>
          </form>
        </div>
      </section>
    </>
  );
}
