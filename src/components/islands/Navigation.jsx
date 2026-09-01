import { useEffect, useRef, useState } from "react";
import Icon from "../Icon";

/**
 * Astro island. Adapted from src/components/Navigation.jsx — the only changes
 * are the two react-router dependencies:
 *
 *   <Link to>       -> <a href>       (Astro does full page navigation)
 *   useLocation()   -> `pathname` prop passed in from the layout
 *
 * Everything else — the hover/click state split, Escape, outside-click, the
 * scrolled border — is unchanged, so the accessibility work from the audit
 * carries over intact.
 */

const menus = [
  {
    id: "services",
    label: "Services",
    items: [
      { to: "/services.html", label: "All Services" },
      { to: "/integrated-advisory.html", label: "Integrated Impact Advisory" },
      { to: "/modular-services.html", label: "Modular Impact Services" },
      { to: "/impact-lab.html", label: "Impact Capacity Building" },
    ],
  },
  {
    id: "work",
    label: "Work & Insights",
    items: [
      { to: "/project-records.html", label: "Project Records" },
      { to: "/news.html", label: "News & Articles" },
    ],
  },
];

export default function Navigation({ pathname = "/" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  // `source` records whether the open submenu came from hover or from an
  // explicit click. Without it, hover opened the menu and the click that
  // followed immediately toggled it shut again.
  const [dd, setDd] = useState({ id: null, source: null });
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const toggleRef = useRef(null);

  const openDd = dd.id;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (openDd) {
        setDd({ id: null, source: null });
      } else if (menuOpen) {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (e) => {
      if (navRef.current?.contains(e.target)) return;
      setMenuOpen(false);
      setDd({ id: null, source: null });
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen, openDd]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isCurrent = (to) => (pathname === to ? "page" : undefined);

  const canHover = () =>
    typeof window !== "undefined" &&
    window.matchMedia?.("(hover: hover) and (pointer: fine)").matches &&
    window.innerWidth > 950;

  const hoverProps = (id) => ({
    onPointerEnter: (e) => {
      if (e.pointerType === "mouse" && canHover())
        setDd({ id, source: "hover" });
    },
    onPointerLeave: (e) => {
      if (e.pointerType === "mouse" && canHover())
        setDd((d) => (d.source === "hover" ? { id: null, source: null } : d));
    },
    onBlur: (e) => {
      if (!e.currentTarget.contains(e.relatedTarget))
        setDd({ id: null, source: null });
    },
  });

  return (
    <nav ref={navRef} aria-label="Primary" data-scrolled={scrolled}>
      <div className="wrap ni">
        <a className="navlogo" href="/" aria-label="Immersia — home">
          <img
            src="/assets/brand/logo.webp"
            alt="Immersia"
            width="150"
            height="46"
            fetchPriority="high"
          />
        </a>

        <button
          id="menu"
          ref={toggleRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="links"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <Icon name={menuOpen ? "close" : "menu"} size={22} />
        </button>

        <div id="links" className={menuOpen ? "open" : undefined}>
          <a href="/" aria-current={isCurrent("/")}>
            Home
          </a>
          <a href="/about.html" aria-current={isCurrent("/about.html")}>
            About
          </a>

          {menus.map((m) => (
            <span
              key={m.id}
              className="dd"
              data-open={openDd === m.id}
              {...hoverProps(m.id)}
            >
              <button
                type="button"
                aria-expanded={openDd === m.id}
                aria-controls={`dd-${m.id}`}
                onClick={() =>
                  setDd((d) =>
                    d.id === m.id && d.source === "click"
                      ? { id: null, source: null }
                      : { id: m.id, source: "click" },
                  )
                }
              >
                {m.label}
                <Icon name="chevronDown" size={15} />
              </button>
              <i id={`dd-${m.id}`}>
                {m.items.map((item) => (
                  <a
                    key={item.to}
                    href={item.to}
                    aria-current={isCurrent(item.to)}
                  >
                    {item.label}
                  </a>
                ))}
              </i>
            </span>
          ))}

          <a
            href="/publications.html"
            aria-current={isCurrent("/publications.html")}
          >
            Publications
          </a>
          <a href="/team.html" aria-current={isCurrent("/team.html")}>
            Team
          </a>
          <a href="/faq.html" aria-current={isCurrent("/faq.html")}>
            FAQ
          </a>
          <a
            className="proposal"
            href="/request-proposal.html"
            aria-current={isCurrent("/request-proposal.html")}
          >
            Request Proposal
          </a>
        </div>
      </div>
    </nav>
  );
}
