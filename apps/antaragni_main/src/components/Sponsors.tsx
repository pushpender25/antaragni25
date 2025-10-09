"use client";

import { useState, useEffect, useRef } from "react";
import { useStore } from "@repo/store";
import { getSingleDoc } from "@repo/firebase";
import { Freehand } from "next/font/google";
import Image from "next/image";

const freehand = Freehand({
  subsets: ["latin"],
  weight: "400",
});

// Helper to unwrap Firestore fields
function unwrapField(field: unknown): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (typeof field === "object" && field !== null) {
    const f = field as Record<string, unknown>;
    if ("content" in f) {
      const v = f["content"];
      return typeof v === "string" ? v : String(v ?? "");
    }
    if ("ref" in f) {
      const v = f["ref"];
      return typeof v === "string" ? v : String(v ?? "");
    }
    if ("url" in f) {
      const v = f["url"];
      return typeof v === "string" ? v : String(v ?? "");
    }
  }
  return "";
}

// Safe path accessor for unknown objects
function getPath(obj: unknown, path: string[]): unknown {
  let cur: unknown = obj;
  for (const seg of path) {
    if (cur && typeof cur === "object") {
      const rec = cur as Record<string, unknown>;
      cur = rec[seg];
    } else {
      return undefined;
    }
  }
  return cur;
}

interface Sponsor {
  category: { content: string };
  name: string;
  logo: string;
  description: string;
  weblink?: string;
}

export default function Sponsors() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const loading = useStore((s) => s.loading);
  const setLoading = useStore((s) => s.setLoading);
  const [activeTab, setActiveTab] = useState("Marketing");
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine sponsors per row based on screen width
  const sponsorsPerRow = windowWidth > 1024 ? 3 : windowWidth > 640 ? 2 : 1;

  useEffect(() => {
    const fetchSponsors = async () => {
      setLoading(true);
      try {
        const data = await getSingleDoc("WebContentsNew", "sponsorsnew");
        if (data && data.data && Array.isArray(data.data)) {
          type RawSponsor = Record<string, unknown>;
          const cleaned: Sponsor[] = data.data.map((s: RawSponsor) => {
            const name: string = unwrapField(getPath(s, ["name"]));
            const logo: string =
              unwrapField(getPath(s, ["img", "content", "url"])) ||
              unwrapField(getPath(s, ["logo"]));
            const description: string =
              unwrapField(getPath(s, ["desc", "content"])) ||
              unwrapField(getPath(s, ["description"]));
            const categoryContent: string =
              unwrapField(getPath(s, ["category", "content"])) ||
              unwrapField(getPath(s, ["category"]));
            const weblink: string = unwrapField(getPath(s, ["weblink"]));

            return {
              category: { content: categoryContent },
              name,
              logo,
              description,
              weblink,
            } as Sponsor;
          });
          setSponsors(cleaned);
        }
      } catch (e) {
        console.error("Error fetching sponsors:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchSponsors();
  }, []);

  if (loading) {
    return null; // global Loader shown by ClientComponent
  }

  const mediaSponsors = sponsors.filter((s) => s.category.content === "Marketing");
  const eventSponsors = sponsors.filter((s) => s.category.content === "Events");
  const MnPSponsors = sponsors.filter((s) => s.category.content === "MnP");

  const getCurrentSponsors = () => {
    switch (activeTab) {
      case "Marketing":
        return mediaSponsors;
      case "Events":
        return eventSponsors;
      case "MnP":
        return MnPSponsors;
      default:
        return mediaSponsors;
    }
  };

  return (
    <div className="h-[92.2vh] overflow-hidden bg-gradient-to-b from-[#0c0b26] to-[#1a1440] flex flex-col items-center">
      <h1
        className={`${freehand.className} text-center text-5xl sm:text-6xl text-white mb-6 mt-3
        [text-shadow:0_0_15px_rgba(255,192,203,0.8),0_0_30px_rgba(255,192,203,0.4)]`}
      >
        Our Sponsors
      </h1>

      <div className="flex justify-center space-x-4 mb-10">
        {["Marketing", "Events", "MnP"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full text-lg transition-transform duration-300
              ${
                activeTab === tab
                  ? "bg-[#FF8888] text-white neon-border scale-105"
                  : "glass text-[#FF8888] hover:text-white hover:scale-110"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <SponsorSlotMachine sponsors={getCurrentSponsors()} sponsorsPerRow={sponsorsPerRow} />
    </div>
  );
}

/* ------------------------------------------------------ */
/* ------------------ Slot Machine ---------------------- */
/* ------------------------------------------------------ */

interface SponsorSlotMachineProps {
  sponsors: Sponsor[];
  sponsorsPerRow: number;
}

const SponsorSlotMachine: React.FC<SponsorSlotMachineProps> = ({ sponsors, sponsorsPerRow }) => {
  if (sponsors.length === 0) {
    return <div className="text-white text-center">No sponsors available</div>;
  }

  // Create a MASSIVE repeating pattern for virtually infinite scrolling
  // This creates enough rows that users would need to scroll for hours to reach the end
  const minRows = 900; // Create -- rows worth of content
  const totalSponsorsNeeded = minRows * sponsorsPerRow;
  
  // Create a repeating pattern of sponsors
  const repeatedSponsors: Sponsor[] = [];
  let sponsorIndex = 0;
  for (let i = 0; i < totalSponsorsNeeded; i++) {
    repeatedSponsors.push(sponsors[sponsorIndex % sponsors.length]!);
    sponsorIndex++;
  }

  // Group repeated sponsors into rows
  const rows: Sponsor[][] = [];
  for (let i = 0; i < repeatedSponsors.length; i += sponsorsPerRow) {
    rows.push(repeatedSponsors.slice(i, i + sponsorsPerRow));
  }

  return (
    <div className="w-full max-w-7xl px-4">
      <Reel rows={rows} />
    </div>
  );
};

interface ReelProps {
  rows: Sponsor[][];
}

const Reel: React.FC<ReelProps> = ({ rows }) => {
  const visibleRows = 3; // Number of rows visible at once
  const rowHeight = 240;

  // Create extended rows - now with much more content, we need less duplication
  const extendedRows = [...rows, ...rows];
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Start at the beginning (we have so much content now, no need to jump to middle)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = 0;
  }, [rows.length]);

  // Auto-scroll logic
  useEffect(() => {
    const interval = window.setInterval(() => {
      const el = containerRef.current;
      if (!el) return;
      el.scrollBy({ top: rowHeight, behavior: "smooth" });
    }, 3000);
    return () => window.clearInterval(interval);
  }, []);

  // Handle manual scroll + seamless loop only at the very end
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const scrollTop = el.scrollTop;
    const centerIndex = Math.round(scrollTop / rowHeight);
    setActiveIndex(centerIndex % extendedRows.length);

    // Only reset when we're near the absolute end
    const singleSpan = rows.length * rowHeight;
    const resetPoint = singleSpan * 1.95; // Reset at 95% of the second block
    
    if (scrollTop >= resetPoint) {
      // Jump back to the start seamlessly
      el.scrollTop = scrollTop - singleSpan;
    }
  };

  return (
    <div
      className="relative glass rounded-xl neon-border overflow-hidden"
      style={{ height: `${rowHeight * visibleRows}px` }}
    >
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex flex-col overflow-y-scroll scroll-smooth snap-y snap-mandatory
                   [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ height: `${rowHeight * visibleRows}px` }}
      >
        {extendedRows.map((row, rowIdx) => {
          const isActive = rowIdx === activeIndex + 1;

          return (
            <div
              key={rowIdx}
              className={`w-full flex-shrink-0 flex items-center justify-center gap-4 px-4
                          border-b border-gray-500 transition-all duration-1000 ease-in-out
                          snap-start
                          ${
                            isActive
                              ? "scale-100 opacity-100"
                              : "scale-90 opacity-70"
                          }`}
              style={{
                height: `${rowHeight}px`,
                minHeight: `${rowHeight}px`,
              }} ///////////////////////////////////////////////////////////////////////////////////////////////////
            >
              {row.map((sponsor, sponsorIdx) => {
                const sponsorLink = sponsor.weblink || "#";
                
                return (
                  <a
                    key={sponsorIdx}
                    href={sponsorLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex flex-col items-center justify-start cursor-pointer h-full py-2"
                  >
                    {sponsor.logo ? (
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        width={180}
                        height={120}
                        className="object-contain mb-2 w-[180px] h-[120px]"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="mb-2 w-[180px] h-[120px]" />
                    )}
                    <p className="text-xl text-center font-semibold w-full truncate sm:whitespace-normal sm:line-clamp-2 text-[#FF8888]">
                      {sponsor.name}
                    </p>
                    <p className="text-md text-center break-words font-semibold w-full sm:line-clamp-3 text-[#FF8888]">
                      {sponsor.description}
                    </p>
                  </a>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};