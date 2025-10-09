/* eslint-disable @next/next/no-img-element */
"use client";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState, useEffect, MouseEventHandler } from "react";
import { Freehand } from "next/font/google";

// === Hardcoded image imports (1 → 54) ===
import img1 from "../../assets/brochure/1.jpg";
import img2 from "../../assets/brochure/2.jpg";
import img3 from "../../assets/brochure/3.jpg";
import img4 from "../../assets/brochure/4.jpg";
import img5 from "../../assets/brochure/5.jpg";
import img6 from "../../assets/brochure/6.jpg";
import img7 from "../../assets/brochure/7.jpg";
import img8 from "../../assets/brochure/8.jpg";
import img9 from "../../assets/brochure/9.jpg";
import img10 from "../../assets/brochure/10.jpg";
import img11 from "../../assets/brochure/11.jpg";
import img12 from "../../assets/brochure/12.jpg";
import img13 from "../../assets/brochure/13.jpg";
import img14 from "../../assets/brochure/14.jpg";
import img15 from "../../assets/brochure/15.jpg";
import img16 from "../../assets/brochure/16.jpg";
import img17 from "../../assets/brochure/17.jpg";
import img18 from "../../assets/brochure/18.jpg";
import img19 from "../../assets/brochure/19.jpg";
import img20 from "../../assets/brochure/20.jpg";
import img21 from "../../assets/brochure/21.jpg";
import img22 from "../../assets/brochure/22.jpg";
import img23 from "../../assets/brochure/23.jpg";
import img24 from "../../assets/brochure/24.jpg";
import img25 from "../../assets/brochure/25.jpg";
import img26 from "../../assets/brochure/26.jpg";
import img27 from "../../assets/brochure/27.jpg";
import img28 from "../../assets/brochure/28.jpg";
import img29 from "../../assets/brochure/29.jpg";
import img30 from "../../assets/brochure/30.jpg";
import img31 from "../../assets/brochure/31.jpg";
import img32 from "../../assets/brochure/32.jpg";
import img33 from "../../assets/brochure/33.jpg";
import img34 from "../../assets/brochure/34.jpg";
import img35 from "../../assets/brochure/35.jpg";
import img36 from "../../assets/brochure/36.jpg";
import img37 from "../../assets/brochure/37.jpg";
import img38 from "../../assets/brochure/38.jpg";
import img39 from "../../assets/brochure/39.jpg";
import img40 from "../../assets/brochure/40.jpg";
import img41 from "../../assets/brochure/41.jpg";
import img42 from "../../assets/brochure/42.jpg";
import img43 from "../../assets/brochure/43.jpg";
import img44 from "../../assets/brochure/44.jpg";
import img45 from "../../assets/brochure/45.jpg";
import img46 from "../../assets/brochure/46.jpg";
import img47 from "../../assets/brochure/47.jpg";
import img48 from "../../assets/brochure/48.jpg";
import img49 from "../../assets/brochure/49.jpg";
import img50 from "../../assets/brochure/50.jpg";
import img51 from "../../assets/brochure/51.jpg";
import img52 from "../../assets/brochure/52.jpg";
import img53 from "../../assets/brochure/53.jpg";
import img54 from "../../assets/brochure/54.jpg";

const images = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
  img21, img22, img23, img24, img25, img26, img27, img28, img29, img30,
  img31, img32, img33, img34, img35, img36, img37, img38, img39, img40,
  img41, img42, img43, img44, img45, img46, img47, img48, img49, img50,
  img51, img52, img53, img54,
];

const freehand = Freehand({
  subsets: ["latin"],
  weight: "400",
});

// === Types for animation handler ===
interface AnimationHandlerProps {
  transitionTime: number;
}

interface AnimationHandlerState {
  previousItem: number;
  selectedItem: number;
}

interface AnimationHandlerReturn {
  slideStyle: React.CSSProperties;
  selectedStyle: React.CSSProperties;
  prevStyle: React.CSSProperties;
}

// === Custom rotate + blur animation ===
const rotateAnimationHandler = (
  props: AnimationHandlerProps,
  state: AnimationHandlerState
): AnimationHandlerReturn => {
  const transitionTime = props.transitionTime + "ms";
  const transitionTimingFunction = "ease-in-out";

  const slideStyle: React.CSSProperties = {
    display: "block",
    minHeight: "100%",
    transitionTimingFunction,
    transform: `rotate(0)`,
    position: state.previousItem === state.selectedItem ? "relative" : "absolute",
    inset: "0 0 0 0",
    zIndex: state.previousItem === state.selectedItem ? 1 : -2,
    opacity: state.previousItem === state.selectedItem ? 1 : 0,
    transitionDuration: transitionTime,
  };

  return {
    slideStyle,
    selectedStyle: {
      ...slideStyle,
      opacity: 1,
      position: "relative",
      zIndex: 2,
      filter: `blur(0)`,
    },
    prevStyle: {
      ...slideStyle,
      transformOrigin: "0 100%",
      transform: `rotate(${
        state.previousItem > state.selectedItem ? "-45deg" : "45deg"
      })`,
      opacity: 0,
      filter: `blur(${
        state.previousItem === state.selectedItem ? "0px" : "5px"
      })`,
    },
  };
};

export default function Brochure() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#161444] to-black flex flex-col justify-center items-center overflow-hidden">
      {/* Heading */}
      <h1
        className={`${freehand.className} pt-25 text-center text-6xl sm:text-7xl font-extrabold
                        text-white mb-12
                        [text-shadow:0_0_20px_rgba(255,192,203,0.9),0_0_40px_rgba(255,192,203,0.5)]`}
      >
        Brochure
      </h1>

      <div className="w-[90vh] max-w-full mt-5 md:mt-3">
        <Carousel
          selectedItem={currentSlide}
          showIndicators={false}
          transitionTime={350}
          animationHandler={rotateAnimationHandler}
          renderArrowPrev={(clickHandler: MouseEventHandler<HTMLButtonElement> | undefined, hasPrev: any) =>
            hasPrev && (
              <button
                onClick={clickHandler}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )
          }
          renderArrowNext={(clickHandler: MouseEventHandler<HTMLButtonElement> | undefined, hasNext: any) =>
            hasNext && (
              <button
                onClick={clickHandler}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )
          }
        >
          {images.map((URL, i) => (
            <div key={i} className="flex items-center justify-center pt-8">
              <img
                src={URL.src}
                alt={`Brochure Page ${i + 1}`}
                className="max-h-[75vh] w-auto rounded-xl shadow-xl border-4 border-yellow-200 object-contain"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
