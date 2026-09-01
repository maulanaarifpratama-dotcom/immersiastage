/**
 * Authored icon set. One family, one stroke weight (1.9), one 24x24 grid.
 * Replaces the Unicode glyphs (☰ ▾ ‹ › →) the site used as stand-in icons:
 * those inherit the text font, cannot be sized or aligned reliably, and are
 * announced by screen readers as characters.
 */

const paths = {
  menu: <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  chevronDown: <path d="m6 9.5 6 6 6-6" />,
  chevronLeft: <path d="m14.5 6-6 6 6 6" />,
  chevronRight: <path d="m9.5 6 6 6-6 6" />,
  arrowRight: <path d="M4.5 12h15m-6.5-6.5L19.5 12 13 18.5" />,
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.75v5M12 16.1h.01" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  pause: <path d="M9.5 5.5v13M14.5 5.5v13" />,
  play: <path d="M7.5 5.2v13.6L19 12z" />,
};

export default function Icon({
  name,
  size = 18,
  className,
  strokeWidth = 1.9,
}) {
  const d = paths[name];
  if (!d) return null;

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {d}
    </svg>
  );
}
