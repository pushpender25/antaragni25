// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client"
// import React, { useEffect, useState } from "react";
// import { doc, getSingleDoc } from "@repo/firebase";
// import { useStore } from "@repo/store";
// import { Freehand } from "next/font/google";

// const freehand = Freehand({
//   weight: "400",
//   subsets: ["latin"],
// });

// interface AftermovieData {
//   year: string;
//   redirectUrl: string; // YouTube embed link
// }

// const initialTimelineData: AftermovieData[] = [];

// // Local Aftermovies links (hardcoded)
// const links: Record<string, string> = {
//   2024: "https://www.youtube.com/embed/3lAv1eKVeRo?si=XwX1BjoopZeQdGfA",
//   2023: "https://www.youtube.com/embed/EDfXjGl1kys?si=CumkenpxHZvqZF_s",
//   2022: "https://www.youtube.com/embed/boF7X5yBEXo?si=0uo73lUCqeK-EzOf",
//   2021: "https://www.youtube.com/embed/qZmtHBF0AKQ?si=p0N76On1zYzxN23x",
//   2019: "https://www.youtube.com/embed/cMoHcuD6vOQ?si=dzJW99oqLeSYdb6L",
//   2018: "https://www.youtube.com/embed/hQQLEFmkqwg?si=be3JGjx1rDpWlOL5",
//   2017: "https://www.youtube.com/embed/zFtS63KKhvc?si=Vim71YV3G08xiebJ",
// };

// const Aftermovies = () => {
//   const { setLoading } = useStore();
//   const [Data, setData] = useState<doc | null>(null);
//   const [timelineData, setTimelineData] = useState<AftermovieData[]>(initialTimelineData);
//   const [selectedYear, setSelectedYear] = useState<AftermovieData | undefined>(undefined);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const data = await getSingleDoc("WebContentsNew", "applandingpagenew");
//         setData(data);
//       } catch (error) {
//         console.error("Failed to fetch data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [setLoading]);

//   useEffect(() => {
//     if (Data) {
//       const details = Data.data as any[] | undefined;

//       // If needed, fetch About Antaragni or other sections here:
//       // const about = details?.find((d) => d.vertical?.content === "About")?.desc?.content;

//       // Instead of using backend Aftermovies, use our local links
//       const processedData: AftermovieData[] = Object.entries(links).map(
//         ([year, redirectUrl]) => ({ year, redirectUrl })
//       );

//       // Sort years in descending order
//       processedData.sort((a, b) => Number(b.year) - Number(a.year));

//       setTimelineData(processedData);

//       if (processedData.length > 0) {
//         setSelectedYear(processedData[0]); // Latest year first
//       }
//     }
//   }, [Data]);

//   const handleYearClick = (data: AftermovieData) => {
//     setSelectedYear(data);
//   };

//   if (!selectedYear) {
//     return (
//       <section className="text-white py-40 flex justify-center items-center bg-[#101621]">
//         <p className="text-xl text-yellow-500">Loading...</p>
//       </section>
//     );
//   }

//   return (
//     <section className="text-white py-10 px-4 sm:px-[20%] md:px-[10%]">
//       <div className="grid 2xl:grid-cols-3 gap-5 items-start m-5">
//         {/* === Left Column (Aftermovies player) === */}
//         <div className="flex justify-center items-center flex-col">
//           <h2
//             className={`${freehand.className} text-center text-5xl md:text-6xl font-bold text-[#D9C06C] mb-12`}
//           >
//             Aftermovies
//           </h2>

//           <div className="border-2 w-[100%] md:w-[500px] border-[#D9C06C] rounded-lg overflow-hidden shadow-lg">
//             <iframe
//               src={selectedYear.redirectUrl}
//               title={`Aftermovie ${selectedYear.year}`}
//               className="w-full h-[220px] sm:h-[300px] md:h-[250px] lg:h-[300px] xl:h-[350px]"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             />
//           </div>
//         </div>

//         {/* === Middle Column (Timeline) === */}
//         <div className="relative flex justify-center items-center py-4 mt-5 2xl:mt-30">
//           {/* Vertical timeline (only visible ≥2xl) */}
//           <div className="hidden 2xl:block absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gray-500 z-0"></div>
//           <div className="hidden 2xl:block absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-black border-2 border-white z-10"></div>

//           <div className="hidden 2xl:block pt-8">
//             {timelineData.map((data, idx) => (
//               <div
//                 key={idx}
//                 className="mb-6 relative flex justify-center items-center"
//               >
//                 <button
//                   onClick={() => handleYearClick(data)}
//                   className={`relative z-10 font-semibold px-6 py-2 rounded-lg text-lg tracking-wider transition-colors
//             ${selectedYear.year === data.year
//                       ? "bg-[#D9C06C] text-black border-2 border-white scale-105"
//                       : "bg-[#D9C06C] text-black/70 hover:bg-yellow-400"
//                     }`}
//                 >
//                   {data.year}
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Horizontal buttons for <2xl */}
//           <div className="flex flex-wrap gap-4 justify-center items-center w-full 2xl:hidden">
//             {timelineData.map((data, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => handleYearClick(data)}
//                 className={`font-semibold px-4 py-2 rounded-lg text-sm sm:text-base tracking-wider transition-colors
//           ${selectedYear.year === data.year
//                     ? "bg-[#D9C06C] text-black border-2 border-white scale-105"
//                     : "bg-[#D9C06C] text-black/70 hover:bg-yellow-400"
//                   }`}
//               >
//                 {data.year}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* === Right Column (About Antaragni) === */}
//         <div className="flex justify-center items-center flex-col">
//           <h2
//             className={`${freehand.className} text-5xl md:text-6xl font-bold text-[#D9C06C] mb-12`}
//           >
//             About Antaragni
//           </h2>
//           <p className="text-gray-300 leading-relaxed text-center text-xl">
//             Antaragni - The Annual Cultural Festival Of IIT Kanpur Is One Of The
//             Largest And Most Anticipated Festivals Throughout Asia. Translated
//             Literally To The Fire Within, Everyone Associated Will Feel Inside.
//             Continuing Its Rich Legacy Of 58 Years, Antaragni Combines The Zeal
//             And Desire Of The Students Of IIT Kanpur And Across India To
//             Showcase And Celebrate Their Amazing Cultural Talent As It Has
//             Evolved To Be A Platform For Global Cultural Interaction Over The
//             Years. It Has Been The Touchstone Of India&apos;s College Cultural
//             Heritage.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Aftermovies;
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";

/* ======= AnimatedDiv ======= */
const AnimatedDiv = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

/* ======= AftermoviesMob Component ======= */
export default function Aftermovies() {
  const [selectedYear, setSelectedYear] = useState(2023);
  const [countKey, setCountKey] = useState(0);

  const links: Record<number, string> = {
    2024: "https://www.youtube.com/embed/3lAv1eKVeRo?si=XwX1BjoopZeQdGfA",
    2023: "https://www.youtube.com/embed/EDfXjGl1kys?si=CumkenpxHZvqZF_s",
    2022: "https://www.youtube.com/embed/boF7X5yBEXo?si=0uo73lUCqeK-EzOf",
    2021: "https://www.youtube.com/embed/qZmtHBF0AKQ?si=p0N76On1zYzxN23x",
    2019: "https://www.youtube.com/embed/cMoHcuD6vOQ?si=dzJW99oqLeSYdb6L",
    2018: "https://www.youtube.com/embed/hQQLEFmkqwg?si=be3JGjx1rDpWlOL5",
    2017: "https://www.youtube.com/embed/zFtS63KKhvc?si=Vim71YV3G08xiebJ",
  };

  const handleClick = () => {
    window.open(links[selectedYear], "_blank");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCountKey((prev) => prev + 1);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatedDiv>
      {/* === Outer Black Shadow Box === */}
      <div className="relative mx-auto w-[95%] md:w-[90%] rounded-2xl border border-white/20 bg-black/70 shadow-[0_0_40px_rgba(0,0,0,0.9)] backdrop-blur-lg overflow-hidden">
        <div className="flex flex-col-reverse lg:flex-row justify-center items-start gap-8 px-6 md:px-12 lg:px-16 py-12 text-white">
          {/* LEFT SIDE */}
          <div className="lg:w-1/2 flex flex-col items-center lg:items-end border-t-0 lg:border-r-4 border-white/40 pr-0 lg:pr-8">
            <p className="text-[#FFC370] text-4xl md:text-5xl font-karantina font-light tracking-[3px] mb-6">
              AFTERMOVIES
            </p>

            {/* Year Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {Object.keys(links).map((year) => {
                const isActive = selectedYear === Number(year);
                return (
                  <div
                    key={year}
                    onClick={() => setSelectedYear(Number(year))}
                    className={`cursor-pointer px-4 py-2 rounded-md border transition-all text-base md:text-lg shadow-md ${
                      isActive
                        ? "border-[#FF8888] shadow-[#ff8888] text-white translate-y-[-3px]"
                        : "border-white hover:-translate-y-1"
                    }`}
                  >
                    {year}
                  </div>
                );
              })}
            </div>

            {/* Video Frame */}
            <div className="w-full aspect-video rounded-lg overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] mb-4">
              <iframe
                width="100%"
                height="100%"
                src={links[selectedYear]}
                title="Antaragni Aftermovie"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <button
              onClick={handleClick}
              className="text-2xl font-islandmoments border-b-2 border-neutral-600 hover:border-[#FF8888] transition-all"
            >
              Watch on YouTube
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <p className="text-[#FFC370] text-4xl md:text-5xl font-karantina font-light tracking-[3px] mb-4">
              ABOUT ANTARAGNI
            </p>

            <p className="text-white/90 text-[1.1rem] leading-8 font-mooli mb-8">
              Antaragni — The Annual Cultural Festival of IIT Kanpur — is one of
              the largest and most anticipated college festivals across Asia.
              Literally meaning “The Fire Within,” Antaragni embodies passion,
              creativity, and expression. For over 58 years, it has united
              students from across India to celebrate culture and talent,
              serving as a global platform for artistic collaboration and
              exchange.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 md:gap-12">
              {[
                { end: 150, label: "Corporates", suffix: "+" },
                { end: 60, label: "Govt. Orgs", suffix: "+" },
                { end: 350, label: "Colleges", suffix: "+" },
                { end: 75, label: "Events", suffix: "+" },
                { end: 140, label: "Footfall", suffix: "K+" },
                { end: 30, label: "Eyeballs", suffix: "M+" },
              ].map(({ end, label, suffix }, i) => (
                <div
                  key={i}
                  className="flex flex-col justify-center items-center text-center"
                >
                  <p className="text-3xl md:text-4xl font-semibold text-white flex items-baseline gap-1">
                    <CountUp key={countKey} start={0} end={end} duration={6} />
                    <span>{suffix}</span>
                  </p>
                  <p className="text-sm md:text-base text-gray-300">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedDiv>
  );
}
