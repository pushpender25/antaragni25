"use client";

import { useEffect, useState } from "react";

interface GalleryItem {
  pic: { content: { url: string } };
}

const Gallery = ({ data }: { data: GalleryItem[] }) => {
  const [gridCols, setGridCols] = useState(4);
  const [imageCount, setImageCount] = useState(6);

  useEffect(() => {
    const updateGrid = () => {
      if (window.innerWidth <= 576) {
        setGridCols(2);
        setImageCount(5);
      } else if (window.innerWidth <= 768) {
        setGridCols(3);
        setImageCount(6);
      } else {
        setGridCols(4);
        setImageCount(6);
      }
    };
    window.addEventListener("resize", updateGrid);
    updateGrid();
    return () => window.removeEventListener("resize", updateGrid);
  }, []);

  return (
    <section className="bg-[#0b0a23] text-white py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 text-center mb-10">
        Gallery
      </h2>

      {/* Grid */}
      <div
        className={`grid gap-4 max-w-6xl mx-auto`}
        style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)` }}
      >
        {data.slice(0, imageCount).map((item, i) => {
          // Custom dimensions like your screenshot
          let extraClasses = "";
          if (i === 0) extraClasses = "col-span-2 row-span-2"; // big block
          if (i === 1) extraClasses = "row-span-2"; // tall
          if (i === 2) extraClasses = "col-span-2"; // wide
          // rest normal

          return (
            <div
              key={i}
              className={`relative overflow-hidden rounded-lg border border-yellow-400 ${extraClasses}`}
            >
              <img
                src={item.pic.content.url}
                alt={`gallery-${i}`}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>

      {/* Buttons below */}
      <div className="flex justify-center gap-4 mt-8">
        {["Media", "Photo Zone", "Aftermovie"].map((btn, i) => (
          <button
            key={i}
            className="px-4 py-2 rounded-md border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition"
          >
            {btn}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
