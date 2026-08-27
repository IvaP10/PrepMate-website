"use client";

import { useEffect } from "react";

export function MotionEnhancer() {
  useEffect(() => {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const parallaxElements = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    document.documentElement.classList.add("motion-ready");

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.08 },
    );

    revealElements.forEach((element) => revealObserver.observe(element));

    const visibleParallax = new Set<HTMLElement>();
    const parallaxObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) visibleParallax.add(element);
          else visibleParallax.delete(element);
        });
        scheduleParallax();
      },
      { rootMargin: "18% 0px" },
    );

    let animationFrame = 0;
    const updateParallax = () => {
      animationFrame = 0;
      const viewportCenter = window.innerHeight / 2;
      visibleParallax.forEach((element) => {
        const bounds = element.getBoundingClientRect();
        const elementCenter = bounds.top + bounds.height / 2;
        const distance = (elementCenter - viewportCenter) / Math.max(window.innerHeight, 1);
        const amplitude = Number(element.dataset.parallax || 12);
        const offset = Math.max(-amplitude, Math.min(amplitude, distance * amplitude * -1.8));
        element.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
      });
    };

    const scheduleParallax = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateParallax);
    };

    parallaxElements.forEach((element) => parallaxObserver.observe(element));
    window.addEventListener("scroll", scheduleParallax, { passive: true });
    window.addEventListener("resize", scheduleParallax, { passive: true });
    scheduleParallax();

    return () => {
      revealObserver.disconnect();
      parallaxObserver.disconnect();
      window.removeEventListener("scroll", scheduleParallax);
      window.removeEventListener("resize", scheduleParallax);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
