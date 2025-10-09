"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface MediaCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  direction: "left" | "right";
}

const MediaCard: React.FC<MediaCardProps> = ({
  title,
  description,
  image,
  link,
  direction,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Slide-in entrance depending on direction
    gsap.fromTo(
      el,
      {
        opacity: 0,
        x: direction === "left" ? -60 : 60,
        rotateY: direction === "left" ? -10 : 10,
      },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: 1.2,
        ease: "power3.out",
      }
    );

    // Ambient breathing glow
    gsap.to(el, {
      boxShadow: "0 0 25px rgba(150,130,255,0.3)",
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: "sine.inOut",
    });
  }, [direction]);

  // Mouse tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x - rect.width / 2) / rect.width) * 10;
    const rotateX = ((rect.height / 2 - y) / rect.height) * 10;
    gsap.to(el, { rotateY, rotateX, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.6, ease: "power3.out" });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        relative group overflow-hidden 
        flex flex-col justify-between items-center 
        rounded-2xl border border-white/10
        bg-gradient-to-b from-[#0c0b26] via-[#161444] to-[#262354]
        text-white shadow-lg p-5 w-72 cursor-pointer
        transition-all duration-500 ease-out
        hover:scale-105 hover:-translate-y-1
      `}
    >
      {/* Rising mist particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/20 rounded-full"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              bottom: `-${Math.random() * 20}px`,
              animation: `rise ${3 + Math.random() * 4}s linear ${Math.random() *
                2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Glow pulse overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#9b8cff]/10 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700"></div>

      <div className="z-10 flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold mb-3 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#a9b2ff] to-[#d3c7ff]">
          {title}
        </h2>
        <div className="relative mb-4 w-full h-40 rounded-lg overflow-hidden   transition-all duration-700">
  <img
    src={image}
    alt={title}
    className="w-full h-full object-contain transition-transform duration-700 ease-out 
               group-hover:scale-110 group-hover:rotate-2"
  />
</div>

      </div>

      <div className="z-10 text-center">
        <p className="text-base text-gray-300 mb-4 px-3">{description}</p>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <button className="relative overflow-hidden bg-gradient-to-r from-[#4038ff] to-[#8a76ff] text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:shadow-[#8a76ff]/40 transition-all duration-300 hover:scale-105">
            <span className="relative z-10">View More</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[buttonShimmer_2s_linear_infinite]"></span>
          </button>
        </a>
      </div>
    </div>
  );
};

export default MediaCard;