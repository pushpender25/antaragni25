'use client';

import Link from 'next/link';
import { useStore } from '@repo/store';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

const LandingPage = () => {
  const isAnimationComplete = !useStore((state) => state.initialAnimation);

  useGSAP(() => {
    gsap.set('.hero-text', {
        opacity: 0
    })
    if (isAnimationComplete) {
      gsap.fromTo('.hero-text', {
        y: 70,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
      }, {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
      });
    }
  }, { dependencies: [isAnimationComplete] });

  return (
    <section className="min-h-screen flex items-center justify-center text-center">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center">
        <h1 className="hero-text font-title text-6xl sm:!text-7xl md:!text-9xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-lg pb-4">
          ANTARAGNI
        </h1>
        <p className="hero-text text-lg sm:!text-xl md:!text-2xl text-secondary mt-4 max-w-2xl">
          Celebrating 60 years of legacy. A rebirth of culture, energy, and art.
        </p>

        <div className="hero-text mt-12">
          <Link 
            href="/events" 
            className="bg-primary text-background px-8 py-3 rounded-full font-bold text-lg hover:bg-secondary transition-all duration-300 shadow-lg shadow-primary/20"
          > 
            Explore Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
