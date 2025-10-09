/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import DomeGallery from "../../components/DomeGallery";
import { Freehand } from "next/font/google";
import { getSingleDoc } from "@repo/firebase";

type ImageItem = {
  src: string;
  alt: string;
};

// ✅ create the font instance
const freehand = Freehand({
  subsets: ["latin"],
  weight: "400",
});

export default function Page() {
  const [images, setImages] = useState<ImageItem[]>([]);

const fetchGalleryImages = async () => {
  try {
    const data = await getSingleDoc("WebContents", "gallery");
    console.log("Raw data from backend:", data);
    let imgs: ImageItem[] = [];
    if (data && data.data) {
      const sortedImages = data.data.sort((a: any, b: any) => b.like - a.like);
      imgs = sortedImages
        .map((image: any) => {
          const src = image.img && image.img.url ? image.img.url : "";
          return src ? { src, alt: `Gallery Image with ${image.like} likes` } : null;
        })
        .filter((img: any) => img && img.src);
    }
    setImages(imgs);
    console.log("Processed images for gallery:", imgs);
  } catch (e) {
    console.log(e);
  }
};

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  

  return (
    <div className="min-h-screen pt-20 w-full bg-[#0b0a22]">
      {/* <h1
        className={`${freehand.className} text-center text-5xl sm:text-6xl
                    text-white    bg-[#0b0a22] p-8 pt-10
                    [text-shadow:0_0_15px_rgba(255,192,203,0.8),0_0_30px_rgba(255,192,203,0.4)]`}>
        GALLERY
      </h1> */}
      <div className="w-full h-full">
        <DomeGallery images={images} containerWidth="100%"
  containerPaddingTop="24px"
  fit={1.1}
    sphereRadius={1600}  // Larger sphere for bigger tiles
  segments={30}  
  containerHeight="90vh"
  smallViewportHeight="80vh" largeViewportHeight="85vh" breakpointPx={768}
  fitBasis="height"/>
      </div>
      
    </div>
  );
}
