import { useEffect, useState } from "react";

export function useStickyCTA(heroHeightRatio = 0.6, offset = 100) {
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight * heroHeightRatio;
      setShowStickyCta(window.scrollY > heroHeight - offset);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [heroHeightRatio, offset]);

  return showStickyCta;
}