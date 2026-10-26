import { useEffect } from "react";
import useScrollAnimation from "../hooks/useScrollAnimation";

export default function ScrollAnimations() {
  useScrollAnimation();

  useEffect(() => {
    const observer = new MutationObserver(() => {
      document.querySelectorAll(
        "section, .glass-card, .workout-card, .stat-card, .dashboard-card"
      ).forEach((element) => {
        if (
          element.classList.contains("scroll-reveal") ||
          element.closest(".ft-intro")
        ) {
          return;
        }

        element.classList.add("scroll-reveal");
        observer.observe(element);
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}