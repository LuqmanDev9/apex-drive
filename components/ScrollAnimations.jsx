"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    if (
      pathname === "/admin" ||
      pathname.startsWith("/admin/")
    ) {
      return;
    }

    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return;
    }

    const selector = [
      "main h1",
      "main h2",
      "main h3",
      "main p",
      "main img",
      "section h1",
      "section h2",
      "section h3",
      "section p",
      "section img",
      "section a",
      "section button",
      "footer h2",
      "footer h3",
      "footer p",
      "footer li",
      "[data-reveal]",
    ].join(", ");

    const tracked = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("scroll-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll(selector);

      elements.forEach((element) => {
        if (tracked.has(element)) return;

        if (
          element.closest(
            "nav, header, [data-no-animation]"
          )
        ) {
          return;
        }

        tracked.add(element);

        const rect = element.getBoundingClientRect();

        // Keep initially visible content immediately visible.

        if (
          rect.top < window.innerHeight &&
          rect.bottom > 0
        ) {
          element.classList.add("scroll-visible");
          return;
        }

        element.classList.add("scroll-reveal");

        observer.observe(element);
      });
    };

    observeElements();

    // Detect newly rendered cars and other dynamic content.

    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();

      tracked.forEach((element) => {
        element.classList.remove(
          "scroll-reveal",
          "scroll-visible"
        );
      });

      tracked.clear();
    };
  }, [pathname]);

  return null;
}