import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useDocumentMeta, resolveMeta } from "../lib/meta";
import { getPageComponent } from "./index";

export default function ContentPage() {
  const { pathname } = useLocation();
  const key = pathname === "/" ? "index.html" : pathname.split("/").pop();
  const mainRef = useRef(null);
  const first = useRef(true);

  const { Component, props } = getPageComponent(key);

  useDocumentMeta(key);

  useEffect(() => {
    window.scrollTo(0, 0);

    // A client-side route change does not move focus on its own, so keyboard
    // and screen reader users stayed parked at the end of the nav. Send focus
    // to the top of the new document instead.
    if (first.current) {
      first.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [key]);

  return (
    <>
      <main id="main" ref={mainRef} tabIndex={-1}>
        <Component {...props} />
      </main>
      <p className="visually-hidden" aria-live="polite" aria-atomic="true">
        {resolveMeta(key).title}
      </p>
    </>
  );
}
