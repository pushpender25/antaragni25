"use client";

import { useRef } from "react";
import Image from "next/image";
import Aftermovies from "../../components/aboutHome";
import Gallery from "../../components/galleryHome";
import Hello from "../../components/starHome";
import heroImage from "../../assets/home.png";
import title from "../../assets/title.png";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Footer from "../../components/footer";

gsap.registerPlugin(ScrollTrigger);

const LandingPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Headings
  const themeHeadingRef = useRef<HTMLHeadingElement>(null);
  const wizardDarkHeadingRef = useRef<HTMLHeadingElement>(null);
  const wizardLightHeadingRef = useRef<HTMLHeadingElement>(null);

  // Texts
  const themeTextRef = useRef<HTMLParagraphElement>(null);
  const wizardDarkTextRef = useRef<HTMLParagraphElement>(null);
  const wizardLightTextRef = useRef<HTMLParagraphElement>(null);

  // Containers (for slide-in effect)
  const themeBoxRef = useRef<HTMLDivElement>(null);
  const wizardDarkBoxRef = useRef<HTMLDivElement>(null);
  const wizardLightBoxRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    (async () => {
      const Splitting = (await import("splitting")).default;
      await import("splitting/dist/splitting.css");

      const animateChars = (target: HTMLElement | null) => {
        if (!target) return;
        const results = Splitting({ target, by: "chars" });
        const chars = results[0]?.chars;
        if (chars) {
          // create a timeline so ScrollTrigger can smoothly scrub the staggered animation
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: target,
              start: "top 85%",
              end: "bottom 65%",
              scrub: 0.6,
              // ensures smoother rendering
              invalidateOnRefresh: true,
            },
          });

          tl.from(chars, {
            duration: 0.9,
            autoAlpha: 0,
            y: 30,
            stagger: 0.035,
            ease: "power4.out",
            force3D: true,
          });
        }
      };

      animateChars(themeTextRef.current);
      animateChars(wizardDarkTextRef.current);
      animateChars(wizardLightTextRef.current);
    })();

    // Headings simple fade + rise
    // headings: fade in with a gentle, smoother rise
    gsap.from(
      [themeHeadingRef.current, wizardDarkHeadingRef.current, wizardLightHeadingRef.current],
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 92%",
          toggleActions: "play none none reverse",
        },
        autoAlpha: 0,
        y: 48,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.22,
        force3D: true,
      }
    );

    // Slide-in for the whole container boxes
    const slideIn = (target: HTMLElement | null, direction: "left" | "right") => {
      if (!target) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: target,
          start: "top 86%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      tl.from(target, {
        duration: 1.15,
        autoAlpha: 0,
        x: direction === "left" ? -160 : 160,
        ease: "power4.out",
        force3D: true,
      });
    };

    slideIn(themeBoxRef.current, "left");
    slideIn(wizardDarkBoxRef.current, "right");
    slideIn(wizardLightBoxRef.current, "left");
  }, { scope: containerRef });

  return (
    <>
      <div ref={containerRef} className="relative h-[430vh] lg:h-[530vh]">
        {/* Background image */}
        <Image
          src={heroImage}
          alt="Background"
          fill
          className="object-cover object-center w-[100] h-full -z-10 brightness-75"
          priority
        />

        {/* Overlay content container */}
        <div className="relative w-full h-full text-white font-serif">
          {/* Title Image */}
          <div className="absolute w-full max-w-md sm:max-w-xl md:max-w-2xl left-1/2 -translate-x-1/2 top-[30vh] lg:top-[40vh] px-4 sm:px-0">
            <Image
              src={title}
              alt="Top image"
              width={600}
              height={600}
              className="w-full h-auto rounded-lg drop-shadow-[0_0_20px_rgba(255,215,0,0.7)] max-w-full"
            />
          </div>

          {/* First Text Div */}
          <div
            ref={themeBoxRef}
            className="absolute left-1/2 -translate-x-1/2 top-[100vh] lg:top-[145vh] w-[80%] md:w-full max-w-2xl text-center rounded-lg p-4 sm:p-6 bg-black/60 backdrop-blur-sm border border-yellow-400/30 shadow-xl mx-4 sm:mx-0"
          >
            <h2
              ref={themeHeadingRef}
              className="text-[clamp(1.5rem,2.5vw,2.75rem)] sm:text-[clamp(1.75rem,2.8vw,3rem)] lg:text-[clamp(2rem,3vw,3.25rem)] font-bold mb-5 text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]"
            >
              Theme
            </h2>
            <p
              ref={themeTextRef}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-prose mx-auto"
            >
              Beneath October’s restless skies, Antaragni rises once more—its flame unbroken through sixty radiant years.
              <br /><br />
              From the mists of time, two eternal figures emerge: the wizard of light, weaving brilliance and creation, and the master of shadow, conjuring chaos and doubt. Their duel is timeless, and Antaragni becomes their battlefield.
              <br /><br />
              Here, art is magic. Every beat, every step, every verse is a spell cast in this eternal war. Performers do not just take the stage—they step into legend, channeling the fire within.
              <br /><br />
              High above watches Kanreki, the silent scribe of sixty cycles. Keeper of the tale, it whispers not in words but in omens—sparks passed from one era to the next.
              <br /><br />
              This year, the fire does not return. It renews. And the battle of light and shadow begins again.
            </p>
          </div>

          {/* Second Text Div */}
          <div
            ref={wizardDarkBoxRef}
            className="absolute left-1/2 -translate-x-1/2 top-[240vh] lg:top-[290vh] w-[80%] md:w-full max-w-2xl text-center rounded-lg p-4 sm:p-6 bg-black/60 backdrop-blur-sm border border-yellow-400/30 shadow-xl mx-4 sm:mx-0"
          >
            <h2
              ref={wizardDarkHeadingRef}
              className="text-[clamp(1.5rem,2.5vw,2.75rem)] sm:text-[clamp(1.75rem,2.8vw,3rem)] lg:text-[clamp(2rem,3vw,3.25rem)] font-bold mb-5 text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]"
            >
              Wizard of Darkness
            </h2>
            <p
              ref={wizardDarkTextRef}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-prose mx-auto"
            >
              The Wizard of Darkness is the embodiment of chaos and doubt. Cloaked in violet shadows, he conjures illusions, twisting harmony into discord and testing every spark of creation. His power is not mere destruction but challenge—the storm that forces light to burn brighter. In his presence, performers confront their fears and rise above them, turning every act into a triumph of fire against the void.
            </p>
          </div>

          {/* Third Text Div */}
          <div
            ref={wizardLightBoxRef}
            className="absolute left-1/2 -translate-x-1/2 top-[350vh] lg:top-[440vh] w-[80%] md:w-full max-w-2xl text-center rounded-lg p-4 sm:p-6 bg-black/60 backdrop-blur-sm border border-yellow-400/30 shadow-xl mx-4 sm:mx-0"
          >
            <h2
              ref={wizardLightHeadingRef}
              className="text-[clamp(1.5rem,2.5vw,2.75rem)] sm:text-[clamp(1.75rem,2.8vw,3rem)] lg:text-[clamp(2rem,3vw,3.25rem)] font-bold mb-5 text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]"
            >
              Wizard of Light
            </h2>
            <p
              ref={wizardLightTextRef}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-prose mx-auto"
            >
              The Wizard of Light embodies brilliance, creation, and renewal. Draped in radiant robes and wielding a staff of dawn, he channels Antaragni’s eternal flame into symphonies of dance, music, and verse. Each gesture weaves golden runes into living art, igniting the stage with hope and inspiration. Wherever he stands, shadows retreat, and imagination finds its purest form. He is the spark that transforms performance into legend.
            </p>
          </div>
        </div>
      </div>
      
      <Aftermovies />
      <Gallery />
      <Hello />
      <Footer />
    </>
  );
};

export default LandingPage;
