"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Carousel } from "@repo/ui/carousel"; // Assuming this is the path to your carousel
import { eventsData } from "../data/events";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// --- Carousel Dummy Data ---
const dummyEvents = [
  {
    name: "Synchronicity",
    desc: "The ultimate battle of the bands.",
    link: "/events/synchronicity",
  },
  {
    name: "Jitterbug",
    desc: "A celebration of choreography and raw energy.",
    link: "/events/jitterbug",
  },
  {
    name: "Ritambhara",
    desc: "Where fashion meets the stage.",
    link: "/events/ritambhara",
  },
  {
    name: "ComicKaun",
    desc: "Find the next voice of stand-up comedy.",
    link: "/national-competitions/comickaun",
  },
  {
    name: "DJ Wars",
    desc: "Electrifying beats and masterful mixes.",
    link: "/national-competitions/dj-wars",
  },
];

const dummyImages = [
  "https://placehold.co/600x800/1A202C/FFD700?text=Event+1",
  "https://placehold.co/600x800/1A202C/FBBF24?text=Event+2",
  "https://placehold.co/600x800/1A202C/9B1C31?text=Event+3",
  "https://placehold.co/600x800/9B1C31/F7FAFC?text=Event+4",
  "https://placehold.co/600x800/FFD700/1A202C?text=Event+5",
];

const data = eventsData;

const SLIDE_COUNT = data.length;
const slides = Array.from(Array(SLIDE_COUNT).keys());

const emblaOptions = {
  loop: true,
  skipSnaps: false,
};

export const Events = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        // Animate the section itself into view
        gsap.from(sectionRef.current, {
            opacity: 0,
            y: 100,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
            },
        });
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative py-20 overflow-hidden"
        >
            <div className="container mx-auto px-6 text-center mb-16">
                <h2 className="font-title text-5xl md:!text-6xl text-primary">
                    A Glimpse of the Spectacle
                </h2>
                <p className="text-lg text-secondary mt-2 max-w-3xl mx-auto">
                    From electrifying dance-offs to soul-stirring musical nights, discover
                    the arenas where legends are forged.
                </p>
            </div>

            <Carousel
                options={emblaOptions}
                events={data}
            />
        </section>
    );
};
