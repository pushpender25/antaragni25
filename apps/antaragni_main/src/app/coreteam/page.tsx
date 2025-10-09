// 'use client';

// import React, { useState, useEffect } from 'react';
// import { getSingleDoc } from '@/config/firebaseFirestore';
// import ContactCard from '@/components/ContactCard';
// import SideBar from '@/components/SideBar';
// import { Freehand } from "next/font/google";

// const freehand = Freehand({
//   subsets: ["latin"],
//   weight: "400",
// });

// interface Pic {
//   ref: string;
//   url: string;
// }

// interface TeamMember {
//   Id: string;
//   Name: string;
//   Vertical: string;
//   Email?: string;
//   Phone?: string;
//   LinkedIn?: string;
//   Instagram?: string;
//   Facebook?: string;
//   Pic?: Pic;
// }

// const CoreTeamPage = () => {
//   const [coreTeam, setCoreTeam] = useState<TeamMember[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   const fetchCoreTeam = async () => {
//     try {
//       const data = await getSingleDoc('WebContents', 'coreTeam');
//       if (data && data.data) {
//         setCoreTeam(data.data as TeamMember[]);
//         setLoading(false);
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   useEffect(() => {
//     fetchCoreTeam();
//   }, []);

//   const sections = [
//     { id: "t1", title: "Festival Coordinators", match: "Festival Coordinator" },
//     { id: "t2", title: "Events & Competitions" },
//     { id: "t3", title: "Marketing" },
//     { id: "t4", title: "Media & Publicity" },
//     { id: "t5", title: "Show Management" },
//     { id: "t6", title: "Finance" },
//     { id: "t7", title: "Public Relations" },
//     { id: "t8", title: "Security" },
//     { id: "t10", title: "Web & App" },
//     { id: "t9", title: "Design" }
//   ];

//   return (
//     <div className="min-h-screen bg-[#0c0b26] bg-fixed text-gray-200 pt-25 relative">


//       <div className="absolute inset-0  pointer-events-none"></div>

//       <div className="relative flex">
//         <div className="hidden md:block md:w-1/4 lg:w-1/5 ml-5 fixed h-full">
//           <SideBar />
//         </div>

//         <div className="flex-1 p-6 md:p-10 w-full md:ml-[25%] lg:ml-[20%] relative z-10">
//           <h1
//             className={`${freehand.className} text-center text-6xl sm:text-7xl font-extrabold
//                         text-white mb-12
//                         [text-shadow:0_0_20px_rgba(255,192,203,0.9),0_0_40px_rgba(255,192,203,0.5)]`}
//           >
//             OUR CORE TEAM
//           </h1>

//           {sections.map((section) => (
//             <div key={section.id} className="mb-20 text-center">
//               <h2
//                 id={section.id}
//                 className="text-4xl font-extrabold mb-8 
//                            bg-gradient-to-r from-gray-400 via-gray-100 to-gray-400 
//                            bg-clip-text text-transparent drop-shadow-lg
//                            [text-shadow:0_1px_0_rgba(255,255,255,0.4)]"
//               >
//                 {section.title}
//               </h2>

//               <div className="grid grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-6 justify-items-center justify-center">
//                 {coreTeam
//                   .filter(
//                     (member) =>
//                       member.Vertical === (section.match || section.title)
//                   )
//                   .map((member, index) => (
//                     <div
//                       key={index}
//                       className="w-full max-w-xs text-center 
//                                  transform transition-all hover:scale-105 hover:shadow-xl 
//                                  rounded-2xl  p-4"
//                     >
//                       <ContactCard member={member} />
//                     </div>
//                   ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CoreTeamPage;

'use client';

import React, { useState, useEffect } from 'react';
import { getSingleDoc } from '@repo/firebase';
import ContactCard from '../../components/ContactCard';
import SideBar from '../../components/SideBar';
import { Freehand } from "next/font/google";

const freehand = Freehand({
  subsets: ["latin"],
  weight: "400",
});

interface Pic {
  ref: string;
  url: string;
}

interface TeamMember {
  Id: string;
  Name: string;
  Vertical: string;
  Email?: string;
  Phone?: string;
  LinkedIn?: string;
  Instagram?: string;
  Facebook?: string;
  Pic?: Pic;
}

const CoreTeamPage = () => {
  const [coreTeam, setCoreTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [yearType, setYearType] = useState<'current' | 'previous'>('current');

  // 🔥 Fetch data for current or previous year
  const fetchCoreTeam = async (type: 'current' | 'previous') => {
    try {
      setLoading(true);
      let data;

      if (type === 'current') {
        data = await getSingleDoc('WebContents', 'coreTeam');
        // console.log("🔥 Current Year Data (WebContents/coreTeam):", data);

        if (data?.data) setCoreTeam(data.data as TeamMember[]);
      } else {
        data = await getSingleDoc('WebContentsNew', 'NEW_coreTeam');
        // console.log("🕰️ Previous Year Data (WebContentsNew/NEW_coreTeam):", data);

        if (data?.data && Array.isArray(data.data)) {
          // 🧩 Flatten nested structure with `.content`
          const contentOf = (u: unknown) => {
            if (!u) return "";
            if (typeof u === "string") return u;
            if (typeof u === "object" && u !== null) {
              const o = u as Record<string, unknown>;
              const c = o["content"];
              if (typeof c === "string") return c;
              return String(c ?? "");
            }
            return "";
          };

          const flattened = (data.data as unknown[]).map((item) => {
            const rec = item as Record<string, unknown>;
            const picCandidate = rec["pic"] as Record<string, unknown> | undefined;
            const pic = picCandidate && typeof picCandidate["content"] === "object"
              ? (picCandidate["content"] as Pic)
              : undefined;

            return {
              Id: (rec["Id"] as string) || "",
              Name: contentOf(rec["name"]),
              Vertical: contentOf(rec["vertical"]),
              Email: contentOf(rec["Email"]),
              Phone: contentOf(rec["phone"]),
              LinkedIn: contentOf(rec["Linkedin"]),
              Instagram: contentOf(rec["instagram"]),
              Facebook: contentOf(rec["facebook"]),
              Pic: pic,
            } as TeamMember;
          });
          // console.log("🧾 Flattened Previous Year Data:", flattened);
          setCoreTeam(flattened);
        }
      }
    } catch (e) {
      console.error("❌ Error fetching team data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoreTeam(yearType);
  }, [yearType]);

  const sections = [
    { id: "t1", title: "Festival Coordinators", match: "Festival Coordinator" },
    { id: "t2", title: "Events & Competitions" },
    { id: "t3", title: "Marketing" },
    { id: "t4", title: "Media & Publicity" },
    { id: "t5", title: "Show Management" },
    { id: "t6", title: "Finance" },
    { id: "t7", title: "Public Relations" },
    { id: "t8", title: "Security" },
    { id: "t10", title: "Web & App" },
    { id: "t9", title: "Design" },
  ];

  return (
    <div className="min-h-screen bg-[#0c0b26] bg-fixed text-gray-200 pt-24 relative">
      <div className="absolute inset-0 pointer-events-none"></div>

      <div className="relative flex">
        {/* Sidebar */}
        <div className="hidden md:block md:w-1/4 lg:w-1/5 ml-5 fixed h-full">
          <SideBar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-10 w-full md:ml-[25%] lg:ml-[20%] relative z-10">
          <h1
            className={`${freehand.className} text-center text-6xl sm:text-7xl font-extrabold
                        text-white mb-12
                        [text-shadow:0_0_20px_rgba(255,192,203,0.9),0_0_40px_rgba(255,192,203,0.5)]`}
          >
            OUR CORE TEAM
          </h1>

          {/* Toggle Buttons */}
          <div className="flex justify-center gap-6 mb-12">
  <button
    onClick={() => setYearType('current')}
    className={`px-7 py-2.5 rounded-full font-semibold tracking-wide text-sm md:text-base 
      border border-yellow-400/40 backdrop-blur-sm 
      transition-all duration-300 ease-in-out
      ${yearType === 'current'
        ? 'bg-gradient-to-r from-yellow-500 to-amber-400 text-[#0c0b26] shadow-[0_0_20px_rgba(255,215,0,0.4)] scale-105'
        : 'bg-transparent text-yellow-300 hover:bg-yellow-400/10 hover:shadow-[0_0_15px_rgba(255,215,0,0.3)] hover:scale-105'
      }`}
  >
    Current Year
  </button>

  <button
    onClick={() => setYearType('previous')}
    className={`px-7 py-2.5 rounded-full font-semibold tracking-wide text-sm md:text-base 
      border border-blue-400/40 backdrop-blur-sm 
      transition-all duration-300 ease-in-out
      ${yearType === 'previous'
        ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-[#0c0b26] shadow-[0_0_20px_rgba(0,191,255,0.4)] scale-105'
        : 'bg-transparent text-blue-300 hover:bg-blue-400/10 hover:shadow-[0_0_15px_rgba(0,191,255,0.3)] hover:scale-105'
      }`}
  >
    Previous Year
  </button>
</div>


          {loading ? (
            <p className="text-center text-gray-400">Loading {yearType} team...</p>
          ) : (
            sections.map((section) => (
              <div key={section.id} className="mb-20 text-center">
                <h2
                  id={section.id}
                  className="text-4xl font-extrabold mb-8 
                             bg-gradient-to-r from-gray-400 via-gray-100 to-gray-400 
                             bg-clip-text text-transparent drop-shadow-lg
                             [text-shadow:0_1px_0_rgba(255,255,255,0.4)]"
                >
                  {section.title}
                </h2>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-6 justify-items-center justify-center">
                  {coreTeam
                    .filter(
                      (member) =>
                        member.Vertical === (section.match || section.title)
                    )
                    .map((member, index) => (
                      <div
                        key={index}
                        className="w-full max-w-xs text-center 
                                   transform transition-all hover:scale-105 hover:shadow-xl 
                                   rounded-2xl p-4"
                      >
                        <ContactCard member={member} />
                      </div>
                    ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CoreTeamPage;
