import { useEffect, useState } from "react";

export function useScrollProgress() {
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(docHeight > 0 ? window.scrollY / docHeight : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return readProgress;
}