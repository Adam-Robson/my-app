// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect } from "react";

// export default function CenterPiece() {
//   const [showFirst, setShowFirst] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setShowFirst(false), 10000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div style={{ position: "relative" }}>
//       <div className="absolute h-screen max-w-screen-md mx-auto w-full flex justify-center items-center">
//         <div className="text-center text-lg">Le Fog is{` `}</div>
//         <AnimatePresence>

//           {showFirst ? (
//             <motion.span
//               key="first"
//               initial={{ opacity: 1 }}
//               animate={{ opacity: 0 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 10 }}
//             >
//               {` `}First
//             </motion.span>
//           ) : (
//             <motion.span
//               key="second"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 1 }}
//               transition={{ duration: 2 }}
//             >
//               Second
//             </motion.span>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>

//   );
// }


'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

type Props = {
  words: string[];
  /** seconds the word stays fully visible (default 4) */
  hold?: number;
  /** seconds to fade between words (default 1.5) */
  fade?: number;
  className?: string;
};

export default function CenterPiece({
  words,
  hold = 4,
  fade = 1.5,
  className,
}: Props) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const id = setInterval(
      () => setI((n) => (n + 1) % words.length),
      (hold + fade) * 950
    );
    return () => clearInterval(id);
  }, [words.length, hold, fade]);

  if (!words.length) return null;

  return (
    <div className={className} style={{ position: 'relative' }}>
      <div className="absolute inset-0 h-screen max-w-screen-md mx-auto w-full flex justify-center items-center">
        <div className="text-left text-3xl">
          {/* Left static part keeps its natural baseline */}
          <span>Le Fog is music for {` `}</span>
          {/* Cycling word container: inline-block, baseline-sized box */}
          <span
            className="relative inline-block align-baseline"
            style={{
              minWidth: '8vw',     // reserve width to avoid jitter (tune as needed)
              height: '1.65rem',       // baseline box height
              lineHeight: '1.14em',   // align text to baseline
              verticalAlign: 'baseline',
            }}
          >
            <AnimatePresence mode="sync" initial={false}>
              <motion.span
                key={words[i]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: fade, ease: 'linear' }}
                // Stack on top; match container line box
                style={{
                  position: 'absolute',
                  inset: 0,
                  lineHeight: '1em',
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                }}
              >
                {words[i]}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>
      </div>
    </div>
  );
}
