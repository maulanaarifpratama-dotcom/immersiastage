import { useEffect } from "react";

export function useCarousel(key) {
  useEffect(() => {
    let t = document.querySelector("#track");
    if (!t) return;

    let s = [...t.children];
    let d = [...document.querySelectorAll("#dots button")];
    let c = document.querySelector("#count");
    let i = 0;
    let z;
    let a = 0;

    let go = (n) => {
      i = (n + s.length) % s.length;
      t.scrollTo({ left: i * t.clientWidth, behavior: "smooth" });
      d.forEach((x, j) => x.classList.toggle("active", i === j));
      if (c) c.textContent = `${i + 1} / ${s.length}`;
      clearInterval(z);
      z = setInterval(() => go(i + 1), 6500);
    };

    document.querySelector("#prev")?.addEventListener("click", () => go(i - 1));
    document.querySelector("#next")?.addEventListener("click", () => go(i + 1));
    d.forEach((x, j) => (x.onclick = () => go(j)));
    t.onpointerdown = (e) => (a = e.clientX);
    t.onpointerup = (e) => {
      if (Math.abs(e.clientX - a) > 40) go(i + (e.clientX < a ? 1 : -1));
    };
    go(0);

    return () => clearInterval(z);
  }, [key]);
}
