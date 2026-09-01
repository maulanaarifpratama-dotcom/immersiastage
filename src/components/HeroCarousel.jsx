import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";

const AUTOPLAY_MS = 6500;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return reduced;
}

export default function HeroCarousel({ slides }) {
  const trackRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  // WCAG 2.2.2: auto-advancing content needs an explicit pause control.
  // Reduced-motion users get it stopped from the start.
  const [playing, setPlaying] = useState(true);
  const [hovering, setHovering] = useState(false);

  const count = slides.length;
  const autoplay = playing && !reduced && !hovering;

  const goTo = useCallback(
    (next) => {
      const track = trackRef.current;
      if (!track) return;
      const i = (next + count) % count;
      setIndex(i);
      track.scrollTo({
        left: i * track.clientWidth,
        behavior: reduced ? "auto" : "smooth",
      });
    },
    [count, reduced],
  );

  // Autoplay. Restarts whenever the index changes, so a manual jump always
  // gets a full dwell before the next advance.
  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => {
      const track = trackRef.current;
      if (!track || document.hidden) return;
      const next = (index + 1) % count;
      setIndex(next);
      track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [autoplay, index, count]);

  // Sync state back from native swipe / trackpad scrolling.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    let timer = 0;
    const settle = () => {
      const w = track.clientWidth || 1;
      const i = Math.round(track.scrollLeft / w);
      setIndex((prev) =>
        prev === i ? prev : Math.min(Math.max(i, 0), count - 1),
      );
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      raf = requestAnimationFrame(() => {
        timer = setTimeout(settle, 120);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [count]);

  // Keep the active slide aligned when the viewport resizes.
  useEffect(() => {
    const onResize = () => {
      const track = trackRef.current;
      if (track) track.scrollLeft = index * track.clientWidth;
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(index - 1);
    }
  };

  return (
    <header
      className="hero"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured engagements"
      onKeyDown={onKeyDown}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovering(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHovering(false);
      }}
    >
      <div className="track" ref={trackRef}>
        {slides.map((s, i) => (
          <article
            key={s.title}
            className="slide"
            style={{ "--bg": `url(${s.bg})` }}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}: ${s.title}`}
            aria-hidden={i !== index}
            inert={i !== index}
          >
            <div className="slidecopy">
              <small>{s.label}</small>
              {i === 0 ? <h1>{s.title}</h1> : <h2>{s.title}</h2>}
              <p className="slidesub">{s.subtitle}</p>
              <p>
                Evidence, systems, and capability connected to practical
                decisions.
              </p>
              <div className="actions">
                <Link className="btn gold" to="/project-records.html">
                  View Project
                </Link>
                <Link className="btn ghost" to="/services.html">
                  Explore Service
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="herocount" aria-hidden="true">
        {index + 1} / {count}
      </p>

      <div className="heroctl">
        <button
          type="button"
          aria-label="Previous engagement"
          onClick={() => goTo(index - 1)}
        >
          <Icon name="chevronLeft" size={20} />
        </button>

        <div id="dots" role="tablist" aria-label="Choose engagement">
          {slides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              role="tab"
              aria-current={i === index}
              aria-selected={i === index}
              aria-label={`${s.title}, slide ${i + 1} of ${count}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label={
            playing ? "Pause automatic rotation" : "Resume automatic rotation"
          }
          onClick={() => setPlaying((v) => !v)}
        >
          <Icon name={playing ? "pause" : "play"} size={18} />
        </button>

        <button
          type="button"
          aria-label="Next engagement"
          onClick={() => goTo(index + 1)}
        >
          <Icon name="chevronRight" size={20} />
        </button>
      </div>

      <p className="visually-hidden" aria-live="polite">
        Slide {index + 1} of {count}: {slides[index].title},{" "}
        {slides[index].subtitle}
      </p>
    </header>
  );
}
