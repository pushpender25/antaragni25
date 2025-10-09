"use client";

import { useState, useEffect } from "react";
import { getSingleDoc } from "@repo/firebase";
// import Image from "next/image";

interface Merch {
  img?: { url?: string } | string;
  link?: string;
  isAvailable?: boolean;
  desc?: string;
}

export default function MerchPage() {
  const [merch, setMerch] = useState<Merch | null>(null);

  useEffect(() => {
    const fetchMerch = async () => {
      try {
        const data = await getSingleDoc("WebContents", "Merch");
        if (data && data.data && Array.isArray(data.data) && data.data.length > 0) {
          setMerch(data.data[0] as Merch);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchMerch();
  }, []);

  if (!merch) {
    return (
      <div className="min-h-screen w-screen bg-gradient-to-b from-[#161444] via-[#1b1858] to-[#090720] flex items-center justify-center text-white text-3xl font-semibold">
        Loading Merchandise...
      </div>
    );
  }

  if (!merch?.isAvailable) {
    return (
      <div className="min-h-screen w-screen bg-gradient-to-b from-[#161444] via-[#1b1858] to-[#090720] flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-[#e0d8ff] drop-shadow-[0_0_15px_rgba(200,190,255,0.6)] text-center">
          Coming Soon
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#0c0b26] via-[#1b1858] to-[#090720] flex flex-col items-center overflow-x-hidden text-white">
      {/* ===== Glass Card Container ===== */}
      <div className="mt-24 mb-8 w-[85vw] md:w-[67vw] flex flex-wrap justify-center items-center 
                      bg-white/10 border border-[#7f76ff] rounded-2xl 
                      shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-md 
                      p-6 sm:p-8 gap-12 transition-transform duration-500 hover:scale-[1.01]">
        
        {/* === Image Section === */}
        <div className="flex flex-col items-center justify-center w-full md:w-auto">
          <div className="relative flex justify-center">
            <img
              src="/MERCH.png"
              alt="Merch"
              width={500}
              height={500}
              className="rounded-2xl max-h-[25rem] w-auto object-contain hover:scale-[1.03] transition-transform duration-500"
            />
              {/* <Merch3DModel modelUrl="/tshirt_model.glb" /> */}

          </div>

          <a href={merch.link} target="_blank" rel="noopener noreferrer">
            <button className="mt-6 mb-8 bg-[#7f76ff] text-[#0e0b2a] 
                               font-semibold text-lg px-8 py-2 rounded-xl 
                               hover:scale-105 hover:bg-[#a59aff] transition-all duration-300 shadow-md">
              Order Now
            </button>
          </a>
        </div>

        {/* === Description Section === */}
        <div className="w-full md:w-[55%] min-w-[300px] text-left">
          <div
            className="prose prose-invert max-w-none text-[#d8d3ff] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: typeof merch.desc === 'string' ? merch.desc.substring(5) : '' }}
          ></div>
        </div>
      </div>

      <footer className="pb-10 text-sm text-gray-400 text-center">
        © Antaragni&apos;25 — Merchandise by IIT Kanpur
      </footer>
    </div>
  );
}
