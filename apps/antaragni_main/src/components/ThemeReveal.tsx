// "use client";

// import { motion } from "framer-motion";

// export default function ThemeReveal() {
//   return (
//     <section className="relative w-full h-screen overflow-hidden">
//       {/* Background Image */}
//       <motion.img
//         src="/hero-section.png" // put your theme image here
//         alt="Antaragni Theme"
//         initial={{ opacity: 0, scale: 1.1 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 1.5, ease: "easeOut" }}
//         className="absolute inset-0 w-full h-full object-cover"
//       />

//       {/* Overlay Gradient for readability */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-[#0c0b26]" />

//       {/* Hero Text */}
//       <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
//         <motion.h1
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
//           className="text-5xl md:text-7xl font-extrabold text-yellow-400 drop-shadow-lg"
//         >
//           Antaragni 2025
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, ease: "easeOut", delay: 1 }}
//           className="mt-4 max-w-2xl text-lg md:text-xl text-gray-200"
//         >
//           The Eternal Duel of Light & Shadow
//         </motion.p>
//       </div>
//     </section>
//   );
// }
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AnimatedDiv = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default function ThemeReveal() {
  return (
    <AnimatedDiv>
      <div className="mx-auto my-12 w-[90vw] max-w-5xl  backdrop-blur-lg border border-[#FFC370] shadow-[0_8px_32px_rgba(31,38,135,0.37)] rounded-2xl flex flex-col items-center text-center text-white p-8 md:p-12">
        {/* === Golden THEME header === */}
        <div className="flex flex-col items-center justify-center w-full mb-3">
          <div className="flex flex-wrap items-center justify-center  text-[#FFC370] font-karantina text-[2rem] md:text-[3rem] tracking-[2px]">
            <span>KANREKI'S</span>
            <span className="ml-2 text-[#FFC370]">ORACULUM</span>
          </div>
          <div className="h-[2px] w-1/2 bg-[#FFC370] mt-2 rounded-full"></div>
        </div>

        {/* === Theme Text === */}
        <div className="text-[1.15rem] md:text-[1.25rem] leading-8 font-mooli text-white/90  md:px-10">
          <p className="mb-2">
            Beneath October’s restless skies, Antaragni rises once more—its flame
            unbroken through sixty radiant years.
          </p>
          <p className="mb-2">
            From the mists of time, two eternal figures emerge: the wizard of light,
            weaving brilliance and creation, and the master of shadow, conjuring chaos
            and doubt. Their duel is timeless, and Antaragni becomes their battlefield.
          </p>
          <p className="mb-2">
            Here, art is magic. Every beat, every step, every verse is a spell cast in
            this eternal war. Performers do not just take the stage—they step into
            legend, channeling the fire within.
          </p>
          <p className="mb-2">
            High above watches Kanreki, the silent scribe of sixty cycles. Keeper of
            the tale, it whispers not in words but in omens—sparks passed from one era
            to the next.
          </p>
          <p className="mb-2">
            This year, the fire does not return. It renews. And the battle of light
            and shadow begins again.
          </p>
        </div>
      </div>
    </AnimatedDiv>
  );
}
