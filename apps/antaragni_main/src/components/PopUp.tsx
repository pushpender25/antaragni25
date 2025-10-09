// "use client";
// import { useEffect, useState } from "react";

// export default function Popup() {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setVisible(true), 1200); // small delay
//     return () => clearTimeout(timer);
//   }, []);

//   if (!visible) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
//       <div className="relative bg-gradient-to-b from-[#0c0b26] to-[#162043] text-white border border-white/20 rounded-2xl shadow-2xl w-[90%] sm:w-[420px] p-6 animate-fadeIn">

//         {/* Close Button */}
//         <button
//           onClick={() => setVisible(false)}
//           className="absolute top-3 right-3 text-white/70 hover:text-white text-2xl leading-none"
//           aria-label="Close popup"
//         >
//           ✕
//         </button>

//         {/* Content */}
//         <h2 className="text-2xl font-bold text-center mb-3 text-[#ffcc70]">
//           Antaragni ’25 is Here!
//         </h2>

//         <p className="text-center text-gray-300 mb-6 leading-relaxed">
//           For the latest updates, announcements, and schedules,  
//           join the official WhatsApp Channel below.
//         </p>

//         <div className="flex justify-center mb-6">
//           <a
//             href="https://www.whatsapp.com/channel/0029Vak8LmD9mrGWHTsPIR3r"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="px-6 py-2 text-lg font-medium rounded-lg bg-[#ffcc70]/90 text-[#0c0b26] hover:bg-[#ffd98a] transition-all duration-300 shadow-md"
//           >
//             Join WhatsApp Channel
//           </a>
          
//         </div>

//         <div className="text-center text-lg font-semibold mb-6 text-red-400">
//           ⚠ Mandatory — You must have the official IITK App installed and logged in  
//           to enter the Pronites venue.
//         </div>
//          <div className="flex justify-center mb-6">
//           <a
//             href="https://play.google.com/store/apps/details?id=com.shrawank.IITKCred&hl=en_IN"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="px-6 py-2 text-lg font-medium rounded-lg bg-[#ffcc70]/90 text-[#0c0b26] hover:bg-[#ffd98a] transition-all duration-300 shadow-md"
//           >
//             Install IITK App
//           </a>
          
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from "react";

export default function Popup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1200); // small delay
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative bg-gradient-to-b from-[#0c0b26] to-[#162043] text-white border border-white/20 rounded-2xl shadow-2xl w-[90%] sm:w-[420px] p-6 animate-fadeIn">

        {/* Close Button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 text-white/70 hover:text-white text-2xl leading-none"
          aria-label="Close popup"
        >
          ✕
        </button>

        {/* Content */}
        <h2 className="text-2xl font-bold text-center mb-3 text-[#ffcc70]">
          Antaragni ’25 is Here!
        </h2>

        <p className="text-center text-gray-300 mb-6 leading-relaxed">
          For the latest updates, announcements, and schedules,  
          join the official WhatsApp Channel below.
        </p>

        <div className="flex justify-center mb-6">
          <a
            href="https://www.whatsapp.com/channel/0029Vak8LmD9mrGWHTsPIR3r"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 text-lg font-medium rounded-lg bg-[#ffcc70]/90 text-[#0c0b26] hover:bg-[#ffd98a] transition-all duration-300 shadow-md"
          >
            Join WhatsApp Channel
          </a>
        </div>

        <div className="text-center text-lg font-semibold mb-6 text-red-400">
          ⚠ Mandatory — You must have the official IITK App installed and logged in  
          to enter the Pronites venue.
        </div>

        <div className="flex justify-center mb-6">
          <a
            href="https://play.google.com/store/apps/details?id=com.shrawank.IITKCred&hl=en_IN"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 text-lg font-medium rounded-lg bg-[#ffcc70]/90 text-[#0c0b26] hover:bg-[#ffd98a] transition-all duration-300 shadow-md"
          >
            Install IITK App
          </a>
        </div>

        {/* Guidelines PDFs */}
        <div className="flex flex-col gap-3 mt-6">
          <a
            href="/iitk.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 text-lg font-medium rounded-lg text-center bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300"
          >
            📘 Setup Guide for IITK Users
          </a>

          <a
            href="/noniitk.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 text-lg font-medium rounded-lg text-center bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300"
          >
            📗 Setup Guide for Non-IITK Users
          </a>
        </div>
      </div>
    </div>
  );
}
