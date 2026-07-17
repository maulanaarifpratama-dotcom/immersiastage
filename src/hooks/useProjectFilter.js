import { useEffect } from "react";

export function useProjectFilter(key) {
  useEffect(() => {
    let cs = [...document.querySelectorAll(".project")];
    let bs = [...document.querySelectorAll("[data-filter]")];
    let q = document.querySelector("#search");
    let st = document.querySelector("#status");

    if (!cs.length || !q || !st) return;

    let dom = "all";
    let f = () => {
      let x = q.value.toLowerCase();
      let v = st.value;
      cs.forEach(
        (e) =>
          (e.hidden = !(
            (dom === "all" || e.dataset.domain === dom) &&
            e.textContent.toLowerCase().includes(x) &&
            (v === "all" || e.dataset.status === v)
          )),
      );
    };

    bs.forEach(
      (b) =>
        (b.onclick = () => {
          dom = b.dataset.filter;
          bs.forEach((x) => x.classList.toggle("active", x === b));
          f();
        }),
    );
    q.oninput = f;
    st.onchange = f;
    f();
  }, [key]);
}
