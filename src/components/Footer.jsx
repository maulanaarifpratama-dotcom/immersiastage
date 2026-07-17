export default function Footer() {
  return (
    <footer>
      <div className="wrap footergrid">
        <div>
          <img
            className="flogo"
            src="/assets/brand/logo-white.webp"
            alt="Immersia"
          />
          <p>
            Strategic impact advisory for institutions that need to design,
            measure, and strengthen programs with greater precision.
          </p>
        </div>
        <div>
          <small>OFFICE</small>
          <div className="contact">
            <img
              loading="lazy"
              className="ico"
              src="/assets/icons/location.webp"
              alt=""
            />
            <span>
              Jl. Sepat No.43, Kebagusan, Ps. Minggu, Jakarta Selatan 12520
            </span>
          </div>
          <a className="contact" href="mailto:info@immersia.id">
            <img
              loading="lazy"
              className="ico"
              src="/assets/icons/mail.webp"
              alt=""
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
            />
            <span>+62 816-4603-5257</span>
          </a>
        </div>
        <div>
          <small>SOCIAL</small>
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
            />
            <span>@immersia.id</span>
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
            />
            <span>Immersia on LinkedIn</span>
          </a>
        </div>
      </div>
      <div className="wrap copyright">
        &copy; 2026 Immersia. All rights reserved.
      </div>
    </footer>
  );
}
