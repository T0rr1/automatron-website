"use client";
import { useEffect, useRef, useState } from "react";

export function CountUp({ to, duration = 700 }: { to: number; duration?: number }) {
  const [n, setN] = useState(0);
  const start = useRef<number | null>(null);
  useEffect(() => {
    let raf = 0;
    const step = (t: number) => {
      if (!start.current) start.current = t;
      const p = Math.min(1, (t - start.current) / duration);
      // cosine ease
      setN(Math.round(to * (0.5 - 0.5 * Math.cos(Math.PI * p))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <span>{n}</span>;
}