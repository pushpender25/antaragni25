// app/components/Loader.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useStore } from '@repo/store';

export default function Loader() {
  const [isFinished, setIsFinished] = useState(false);

  const loaderRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imagesLoaded = useStore((state) => state.imagesLoaded);

  useEffect(() => {
    if (imagesLoaded) {
      const videoElement = videoRef.current;
      if (!dotRef.current || !videoElement) return;

      const tl_entry = gsap.timeline();

      tl_entry.to(dotRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.set(dotRef.current, { display: 'none' });
          gsap.set(videoElement, { display: 'block' });
          
          gsap.fromTo(videoElement, 
            { clipPath: 'circle(0% at 50% 50%)', opacity: 0 }, 
            { clipPath: 'circle(100% at 50% 50%)', opacity: 1, duration: 0.6, ease: 'power2.out',
              onComplete: () => {
                videoElement.play().catch(error => {
                  console.error("Video autoplay was blocked:", error);
                  if (loaderRef.current) {
                    handleExitAnimation(loaderRef.current, videoElement, setIsFinished);
                  }
                });
              }
            }
          );
        },
      });
    }
  }, [imagesLoaded]);

  useEffect(() => {
    const videoElement = videoRef.current;
    const loaderContainer = loaderRef.current;
    if (!videoElement || !loaderContainer) return;

    const handleVideoEnd = () => {
      handleExitAnimation(loaderContainer, videoElement, setIsFinished);
    };

    videoElement.addEventListener('ended', handleVideoEnd);

    return () => {
      videoElement.removeEventListener('ended', handleVideoEnd);
    };
  }, []);

  if (isFinished) {
    return null;
  }

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[999999] flex items-center justify-center bg-black"
      style={{ clipPath: 'circle(150% at 50% 50%)' }} 
    >
      <div
        ref={dotRef}
        className="h-6 w-6 animate-bounce rounded-full bg-[#fcdd8d]"
      ></div>
      <video
        ref={videoRef}
        src="/videos/video.mp4"
        muted
        playsInline
        className="absolute w-full max-w-4xl h-[60vh] object-cover rounded-lg shadow-xl hidden"
        style={{ clipPath: 'circle(0% at 50% 50%)' }} 
      ></video>
    </div>
  );
}

function handleExitAnimation(
  loaderContainer: HTMLDivElement, 
  videoElement: HTMLVideoElement, 
  setIsFinished: (finished: boolean) => void
) {
  const tl_exit = gsap.timeline({
    onComplete: () => {
      setIsFinished(true);
    },
  });

  tl_exit.to(videoElement, {
    scale: 0.8,
    opacity: 0,
    duration: 0.4,
    ease: 'power2.in',
  });

  tl_exit.to(loaderContainer, {
    clipPath: 'circle(0% at 50% 50%)',
    opacity: 0,
    duration: 0.8,
    ease: 'power3.inOut',
  }, ">-0.3"); 
}