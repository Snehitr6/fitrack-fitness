import { useEffect } from "react";

export default function useScrollAnimation() {
  useEffect(() => {
    const elements = document.querySelectorAll(
      [
        "section",
        ".section-wrap",
        ".glass-card",
        ".workout-card",
        ".feature-card",
        ".stat-card",
        ".dashboard-card",
        ".progress-card",
        ".nutrition-card",
        ".goal-card",
        ".profile-card",
      ].join(",")
    );

    elements.forEach((element, index) => {
      if (element.closest(".ft-intro")) return;

      element.classList.add("scroll-reveal");

      // Slight stagger between sibling cards.
      const siblings = Array.from(element.parentElement?.children || []);
      const siblingIndex = siblings.indexOf(element);

      element.style.setProperty(
        "--reveal-delay",
        `${Math.min(siblingIndex, 5) * 80}ms`
      );
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      }
    );

    elements.forEach((element) => {
      if (!element.closest(".ft-intro")) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);
}