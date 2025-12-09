"use client";
import { useEffect, useState } from "react";
import { ArrowUpIcon } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 p-3 rounded-full shadow-lg
        bg-green-nav text-white transition-opacity duration-300
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      <ArrowUpIcon />
    </button>
  );
}