/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import React, { useEffect, useState } from "react";
import { doc, getSingleDoc } from "@repo/firebase";
import { useStore } from "@repo/store";
import { Freehand } from "next/font/google";
import "swiper/css";

const freehand = Freehand({
  weight: "400",
  subsets: ["latin"],
});

interface Item {
  imageSrc: string;
  redirectUrl?: string;
}

const StarCard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setLoading } = useStore();
  const [rawData, setRawData] = useState<doc | null>(null);
  const [items, setItems] = useState<Item[]>([]);

  // --- Fetch Data ---
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

  // --- Process Data ---
  useEffect(() => {
    if (rawData) {
      const details = rawData.data as any[] | undefined;
      const processedItems: Item[] =
        details
          ?.filter((d) => d.vertical?.content === "Discover More")
          .map((c) => ({
            redirectUrl: c.link?.content,
            imageSrc: c.pic?.content?.url,
          })) || [];
      setItems(processedItems);
    }
  }, [rawData]);

  // --- Helper: get correct highlighted index ---
  const getHighlightIndex = (swiper: any) => {
    let index = swiper.realIndex;
    if (window.innerWidth >= 640 && swiper.params.slidesPerView === 3) {
      index = (swiper.realIndex) % items.length; // middle one
    }
    return index;
  };

  return (
    <div
      title="Attraction"
      className="bg-[#101621] flex flex-col items-center"
    >
      <h2
        className={`${freehand.className} text-5xl md:text-6xl font-bold text-[#D9C06C] m-2 pt-20`}
      >
        Star Attractions
      </h2>

      <div className="w-full mx-auto my-10 md:my-20 lg:h-[600px] h-[300px] overflow-hidden">
        <Swiper
          spaceBetween={20}
          centeredSlides={true}
          grabCursor={true}
          modules={[Autoplay]}
          loop={true}
          breakpoints={{
            0: {
              slidesPerView: "auto",
            },
            640: {
              slidesPerView: 3,
            },
          }}
          onSlideChange={(swiper) => setCurrentSlide(getHighlightIndex(swiper))}
          onInit={(swiper) => setCurrentSlide(getHighlightIndex(swiper))}
          className="rounded-2xl"
        >
          {items.map((item, idx) => (
            <a href={item.redirectUrl || "#"} key={idx}>
              <SwiperSlide
                key={item.imageSrc + idx}
                className="max-w-[70%] sm:max-w-full"
              >
                <div
                  className={`transition-all duration-500 flex items-center justify-center h-full ${
                    currentSlide === idx
                      ? "opacity-100 scale-105"
                      : "opacity-50 scale-90 relative"
                  }`}
                >
                  <div
                    className={`absolute w-[100%] h-[100%] rounded-2xl bg-[#d2d2d200] ${
                      currentSlide !== idx ? "backdrop-blur-[4px]" : ""
                    } `}
                  ></div>

                  <img
                    src={item.imageSrc}
                    alt={`Slide ${idx + 1}`}
                    className="w-full h-[200px] overflow-hidden sm:h-fit object-cover rounded-2xl"
                  />
                </div>
              </SwiperSlide>
            </a>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default StarCard;
