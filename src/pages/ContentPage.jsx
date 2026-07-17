import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCarousel } from "../hooks/useCarousel";
import { useProjectFilter } from "../hooks/useProjectFilter";
import { getPageComponent } from "./index";

export default function ContentPage() {
  let { pathname } = useLocation();
  let k = pathname === "/" ? "index.html" : pathname.split("/").pop();

  let { Component, props } = getPageComponent(k);

  useEffect(() => {
    scrollTo(0, 0);
    let m = document.querySelector("#menu");
    let l = document.querySelector("#links");
    if (m) m.onclick = () => l?.classList.toggle("open");
  }, [k]);

  useCarousel(k);
  useProjectFilter(k);

  return (
    <main>
      <Component {...props} />
    </main>
  );
}
