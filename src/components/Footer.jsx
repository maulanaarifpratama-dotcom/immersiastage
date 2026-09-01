export default function Footer() {
  return (
    <footer aria-label="Site footer">
      <div className="wrap footergrid">
        <div>
          <img
            className="flogo"
            src="/assets/brand/logo-white.webp"
            alt="Immersia"
            width="205"
            height="64"
          />
          <p>
            Strategic impact advisory for institutions that need to design,
            measure, and strengthen programs with greater precision.
          </p>
        </div>

        <div>
          <h2 className="footerhead">Office</h2>
          <p className="contact">
            <img
              loading="lazy"
              className="ico"
              src="/assets/icons/location.webp"
              alt=""
              width="20"
              height="20"
            />
            <span>
              Jl. Sepat No.43, Kebagusan, Ps. Minggu, Jakarta Selatan 12520
            </span>
          </p>
          <a className="contact" href="mailto:info@immersia.id">
            <img
              loading="lazy"
              className="ico"
              src="/assets/icons/mail.webp"
              alt=""
              width="20"
              height="20"
            />
            <span>info@immersia.id</span>
          </a>
          <a
            className="contact"
            href="https://wa.me/6281646035257"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              loading="lazy"
              className="ico"
              src="/assets/icons/whatsapp.webp"
              alt=""
              width="20"
              height="20"
            />
            <span>+62 816-4603-5257</span>
            <span className="visually-hidden">
              on WhatsApp, opens in a new tab
            </span>
          </a>
        </div>

        <div>
          <h2 className="footerhead">Social</h2>
          <a
            className="contact"
            href="https://www.instagram.com/immersia.id"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              loading="lazy"
              className="ico"
              src="/assets/icons/instagram.webp"
              alt=""
              width="20"
              height="20"
            />
            <span>@immersia.id</span>
            <span className="visually-hidden">
              on Instagram, opens in a new tab
            </span>
          </a>
          <a
            className="contact"
            href="https://www.linkedin.com/company/immers-asia/posts/?feedView=all"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              loading="lazy"
              className="ico"
              src="/assets/icons/linkedin.webp"
              alt=""
              width="20"
              height="20"
            />
            <span>Immersia on LinkedIn</span>
            <span className="visually-hidden">opens in a new tab</span>
          </a>
        </div>
      </div>

      <p className="wrap copyright">
        &copy; 2026 Immersia. All rights reserved.
      </p>
    </footer>
  );
}
