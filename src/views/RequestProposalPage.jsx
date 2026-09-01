import { useId, useRef, useState } from "react";
import PageHero from "../components/sections/PageHero";
import Icon from "../components/Icon";

const SERVICES = [
  "Integrated Impact Advisory",
  "Modular Impact Services",
  "Impact Capacity Building",
  "Not sure yet",
];

const FIELDS = [
  {
    name: "organization",
    label: "Organization name",
    type: "text",
    autoComplete: "organization",
    required: true,
  },
  {
    name: "contact",
    label: "Contact person",
    type: "text",
    autoComplete: "name",
    required: true,
  },
  {
    name: "email",
    label: "Work email",
    type: "email",
    autoComplete: "email",
    required: true,
  },
  {
    name: "phone",
    label: "Phone or WhatsApp",
    type: "tel",
    autoComplete: "tel",
    required: false,
    hint: "Optional",
  },
];

const EMPTY = {
  organization: "",
  contact: "",
  email: "",
  phone: "",
  service: SERVICES[0],
  challenge: "",
  outputs: "",
};

function validate(values) {
  const errors = {};
  if (!values.organization.trim())
    errors.organization = "Enter the name of your organization.";
  if (!values.contact.trim())
    errors.contact = "Enter the name of the person we should reply to.";
  if (!values.email.trim()) {
    errors.email = "Enter an email address so we can respond.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "That email address does not look complete.";
  }
  if (!values.challenge.trim())
    errors.challenge =
      "Describe the background or challenge, even in one or two sentences.";
  return errors;
}

export default function RequestProposalPage() {
  const uid = useId();
  const formRef = useRef(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sent, setSent] = useState(null);

  const fieldId = (name) => `${uid}-${name}`;
  const errorId = (name) => `${uid}-${name}-error`;

  const set = (name) => (e) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [name]: value }));
    if (submitted) {
      setErrors(validate({ ...values, [name]: value }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const next = validate(values);
    setErrors(next);

    const firstBad = Object.keys(next)[0];
    if (firstBad) {
      formRef.current
        ?.querySelector(`#${CSS.escape(fieldId(firstBad))}`)
        ?.focus();
      return;
    }

    // There is no form backend on this deployment yet, so the submit composes
    // a pre-filled message in the sender's own mail client instead of
    // pretending to have sent something. See the note below the form.
    const body = [
      `Organization: ${values.organization}`,
      `Contact person: ${values.contact}`,
      `Email: ${values.email}`,
      values.phone ? `Phone / WhatsApp: ${values.phone}` : null,
      `Service of interest: ${values.service}`,
      "",
      "Background or challenge:",
      values.challenge,
      "",
      "Expected outputs:",
      values.outputs || "(not specified)",
    ]
      .filter(Boolean)
      .join("\n");

    const href =
      `mailto:info@immersia.id` +
      `?subject=${encodeURIComponent(`Proposal request: ${values.organization}`)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setSent(values.organization);
  };

  if (sent) {
    return (
      <>
        <PageHero
          label="Request proposal"
          title="Your draft is ready to send."
        />
        <section>
          <div className="wrap form">
            <div className="formsuccess">
              <h2>Check your mail app</h2>
              <p>
                A pre-filled message to <strong>info@immersia.id</strong> has
                been opened in your mail application, with the details for{" "}
                {sent}. Send it and the Immersia team will follow up to clarify
                scope, methodology, and deliverables.
              </p>
              <p>
                If nothing opened, email{" "}
                <a href="mailto:info@immersia.id">
                  <strong>info@immersia.id</strong>
                </a>{" "}
                or message{" "}
                <a
                  href="https://wa.me/6281646035257"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong>+62 816-4603-5257</strong>
                </a>{" "}
                directly.
              </p>
              <p>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setSent(null);
                    setSubmitted(false);
                    setErrors({});
                  }}
                >
                  Edit the request
                </button>
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        label="Request proposal"
        title="Tell us what you need to strengthen."
      />
      <section>
        <div className="wrap form">
          <form ref={formRef} onSubmit={onSubmit} noValidate>
            {FIELDS.map((f) => (
              <div key={f.name} className="field">
                <label htmlFor={fieldId(f.name)}>
                  {f.label}
                  {!f.required && <span className="hint"> (optional)</span>}
                </label>
                <input
                  id={fieldId(f.name)}
                  name={f.name}
                  type={f.type}
                  autoComplete={f.autoComplete}
                  value={values[f.name]}
                  onChange={set(f.name)}
                  required={f.required}
                  aria-invalid={errors[f.name] ? "true" : undefined}
                  aria-describedby={
                    errors[f.name] ? errorId(f.name) : undefined
                  }
                />
                {errors[f.name] && (
                  <p className="errortext" id={errorId(f.name)}>
                    <Icon name="alert" size={15} />
                    {errors[f.name]}
                  </p>
                )}
              </div>
            ))}

            <div className="field wide">
              <label htmlFor={fieldId("service")}>Service of interest</label>
              <select
                id={fieldId("service")}
                name="service"
                value={values.service}
                onChange={set("service")}
              >
                {SERVICES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="field wide">
              <label htmlFor={fieldId("challenge")}>
                Background or challenge
              </label>
              <p className="hint" id={`${uid}-challenge-hint`}>
                What decision or problem is this work meant to support?
              </p>
              <textarea
                id={fieldId("challenge")}
                name="challenge"
                value={values.challenge}
                onChange={set("challenge")}
                required
                aria-invalid={errors.challenge ? "true" : undefined}
                aria-describedby={
                  errors.challenge
                    ? `${uid}-challenge-hint ${errorId("challenge")}`
                    : `${uid}-challenge-hint`
                }
              />
              {errors.challenge && (
                <p className="errortext" id={errorId("challenge")}>
                  <Icon name="alert" size={15} />
                  {errors.challenge}
                </p>
              )}
            </div>

            <div className="field wide">
              <label htmlFor={fieldId("outputs")}>
                Expected outputs
                <span className="hint"> (optional)</span>
              </label>
              <textarea
                id={fieldId("outputs")}
                name="outputs"
                value={values.outputs}
                onChange={set("outputs")}
              />
            </div>

            <div className="formfoot">
              <button className="btn gold" type="submit">
                Prepare Proposal Request
              </button>
              <p className="formnote">
                This opens a pre-filled email to info@immersia.id in your own
                mail app. Nothing is stored on this site.
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
