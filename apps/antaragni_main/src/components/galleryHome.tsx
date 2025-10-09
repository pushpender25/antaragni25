/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { doc, getSingleDoc } from "@repo/firebase";
import { useStore } from "@repo/store";
import { Freehand } from "next/font/google";
import Link from "next/link";

const freehand = Freehand({
  weight: "400",
  subsets: ["latin"],
});

interface GalleryItem {
  imageSrc: string;
  redirectUrl?: string;
  year?: string;
}

const Gallery = () => {
  const { setLoading } = useStore();
  const [rawData, setRawData] = useState<doc | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getSingleDoc("WebContentsNew", "applandingpagenew");
        setRawData(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setLoading]);

  useEffect(() => {
    if (rawData) {
      const details = rawData.data as any[] | undefined;

      const processedItems: GalleryItem[] =
        details
          ?.filter((d) => d.vertical?.content === "Gallery")
          .map((c) => ({
            redirectUrl: c.link?.content,
            imageSrc: c.pic?.content?.url,
            year: c.year?.content,
          })) || [];

      setGalleryItems(processedItems);
    }
  }, [rawData]);

  if (galleryItems.length < 6) {
    return (
      <div className="text-center p-10">
        {galleryItems.length === 0
          ? "No gallery items found or insufficient data."
          : "Loading..."}
      </div>
    );
  }

  const [img1, img2, img3, img4, img5, img6] = galleryItems;

  return (
    <div title="Gallery" className="flex flex-col items-center">
      
      <div className="p-6 rounded-lg max-w-7xl mx-5 mb-[5%] justify-center w-full pt-0">
        <div className="mt-8 px-4 grid grid-cols-2 gap-3 lg:gap-10 mb-8">
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-3 lg:gap-10">
            <div className="w-full">
              <img
                className="w-full h-[180px] md:h-[400px] rounded-[16px] border-2 border-primary/30 overflow-hidden object-cover border border-purple-400/30 bg-white/5 backdrop-blur-sm shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                src={img1!.imageSrc}
                alt="Gallery Image 1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 lg:gap-5">
              <img
                className="w-full h-[154px] rounded-[16px] border-2 border-primary/30 overflow-hidden object-cover border border-purple-400/30 bg-white/5 backdrop-blur-sm shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                src={img2!.imageSrc}
                alt="Gallery Image 2"
              />
              <img
                className="w-full h-[154px] rounded-[16px] border-2 border-primary/30 overflow-hidden object-cover border border-purple-400/30 bg-white/5 backdrop-blur-sm shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                src={img3!.imageSrc}
                alt="Gallery Image 3"
              />
            </div>
          </div>

          <div className="col-span-2 lg:col-span-1 flex flex-col gap-3 lg:gap-10">
            <div className="grid grid-cols-2 gap-3 lg:gap-5">
              <img
                className="w-full h-[154px] rounded-[16px] border-2 border-primary/30 overflow-hidden object-cover border border-purple-400/30 bg-white/5 backdrop-blur-sm shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                src={img4!.imageSrc}
                alt="Gallery Image 4"
              />
              <img
                className="w-full h-[154px] rounded-[16px] border-2 border-primary/30 overflow-hidden object-cover border border-purple-400/30 bg-white/5 backdrop-blur-sm shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                src={img5!.imageSrc}
                alt="Gallery Image 5"
              />
            </div>
            <div className="w-full">
              <img
                className="w-full h-[180px] md:h-[400px] rounded-[16px] border-2 border-primary/30 overflow-hidden object-cover border border-purple-400/30 bg-white/5 backdrop-blur-sm shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                src={img6!.imageSrc}
                alt="Gallery Image 6"
              />
            </div>
          </div>
        </div>

        {/* Centered Golden Button */}
        <div className="flex justify-center items-center gap-3 mt-10 flex-wrap">
  {[
    { href: "/media", label: "Media" },
    { href: "/gallery", label: "View More" },
    { href: "/brochure", label: "Brochure" },
  ].map((link, i) => (
    <Link
      key={i}
      href={link.href}
      className="md:w-[160px]  w-[110px] text-center  py-3 text-lg font-medium text-white 
        border border-white/40 rounded-xl bg-white/5 backdrop-blur-md 
        shadow-[0_0_15px_rgba(255,255,255,0.15)] 
        hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] 
        hover:bg-white/10 hover:text-white/90 
        transition-all duration-500 ease-in-out"
    >
      {link.label}
    </Link>
  ))}
</div>


      </div>
    </div>
  );
};

export default Gallery;
