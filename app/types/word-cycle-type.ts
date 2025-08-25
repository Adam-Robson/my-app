
export type wordCycleType = {
  words: string[];
  intervalMs?: number;
  startIndex?: number;
  className?: string;
  // If provided, we’ll reserve this width to avoid layout shift.
  // Otherwise we compute from the longest word.
  reserveCh?: number;
  pauseOnHoverRef?: React.RefObject<HTMLElement>;
  ariaLive?: "off" | "polite" | "assertive";
};


export type useCycleOptions = {
  intervalMs?: number;      // default 2200
  startIndex?: number;      // default 0
  loop?: boolean;           // default true
  pauseOnHoverRef?: React.RefObject<HTMLElement>;
  respectReducedMotion?: boolean; // default true
};
