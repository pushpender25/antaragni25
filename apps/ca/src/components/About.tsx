"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import Splitting from "splitting"; 
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function About() {
    const pathname = usePathname();
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const infoRef = useRef<HTMLParagraphElement>(null);
    const imageRef = useRef<HTMLDivElement>(null); 

    const aboutHeading = "About Antaragni";
    const infoText = 
        "Born in 1965, Antaragni is North India's largest cultural festival, hosted by IIT Kanpur. Every year, we welcome over 150,000 students from 400+ colleges for a celebration of creativity and talent. Our stages have been graced by global icons like KSHMR, Adnan Sami, and Shankar-Ehsaan-Loy. Join us as we write the next chapter in our legacy.";

    useGSAP(() => {
        if (infoRef.current) {
            const results = Splitting({ target: infoRef.current, by: "words" });
            const words = results[0]?.words;
            if (words) {
                gsap.from(words, {
                    scrollTrigger: {
                        trigger: infoRef.current,
                        start: "top 85%", 
                        end: "bottom 60%",
                        scrub: 1,
                    },
                    opacity: 0.1,
                    y: 30, 
                    stagger: 0.1, 
                    ease: "power2.out",
                });
            }
        }
        
        gsap.from(headingRef.current, {
             scrollTrigger: {
                trigger: headingRef.current,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power3.out"
        });

         gsap.from(imageRef.current, {
             scrollTrigger: {
                trigger: imageRef.current,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            scale: 0.9,
            duration: 1,
            ease: "power3.out"
        });

    }, { scope: containerRef, dependencies: [pathname], revertOnUpdate: true });

    return (
        <section
            ref={containerRef}
            className="min-h-screen w-full text-white flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div className="flex flex-col justify-center text-center lg:text-left">
                    <h2 
                        ref={headingRef}
                        className="text-4xl sm:!text-5xl lg:!text-6xl font-bold heading mb-8"
                    >
                        {aboutHeading}
                    </h2>
                    <p 
                        ref={infoRef}
                        className="text-lg md:!text-xl lg:!text-2xl text-gray-300 leading-relaxed font-serif"
                    >
                        {infoText}
                    </p>
                </div>

                <div 
                    ref={imageRef} 
                    className="h-64 sm:h-80 md:h-96 lg:h-[500px] w-full  rounded-lg flex items-center justify-center"
                >
                    <Image src="/about.png" alt="about_us" className="object-contain h-full w-full rounded-lg" fill/>
                </div>

            </div>
        </section>
    );
}