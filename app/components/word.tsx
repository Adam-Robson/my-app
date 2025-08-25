import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type WordType = {
  words: string[];
  intervalMs?: number;   // how long each word shows before swapping
  durationMs?: number;   // crossfade duration
  reserveCh?: number;    // optional width reservation to prevent jitter
  className?: string;
  ariaLive?: "off" | "polite" | "assertive";
};

export default function Word({
  words,
  intervalMs = 2500,
  durationMs = 500,
  reserveCh,
  className,
  ariaLive = "polite",
}: WordType) {
  const [index, setIndex] = useState(0);
  const n = words.length || 1;

  useEffect(() => {
    if (n <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % n);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, n]);

  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b), "");
  const widthCh = reserveCh ?? Math.max(2, longest.length);

  return (
    <span
      className={className}
      style={{ position: "relative", display: "inline-block", minWidth: `${widthCh}ch` }}
      aria-live={ariaLive}
      aria-atomic="true"
    >
      <span aria-hidden="true" style={{ visibility: "hidden", whiteSpace: "nowrap", display: "block" }}>
        {longest}
      </span>

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={index}
          style={{
            position: "absolute",
            inset: 0,
            display: "inline-block",
            whiteSpace: "nowrap",
            lineHeight: "inherit",
          }}
          initial={{ opacity: 0, y: "0.2em" }}
          animate={{ opacity: 1, y: "0em" }}
          exit={{ opacity: 0, y: "-0.2em" }}
          transition={{ duration: durationMs / 1000, ease: "easeOut" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
