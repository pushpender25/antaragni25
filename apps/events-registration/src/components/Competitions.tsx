"use client";

import { useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ReactMarkdown from 'react-markdown';

gsap.registerPlugin(useGSAP);

interface Competition {
  name: string;
  desc: string; 
}

interface CompetitionsProps {
  competitions: Competition[];
  openCompetition: string | null;
  setOpenCompetition: (name: string | null) => void;
}

function AccordionItem({
  item,
  isOpen,
  onClick,
}: {
  item: { question: string; answer: string };
  isOpen: boolean;
  onClick: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const answerElement = answerRef.current;
    if (!answerElement) return;

    gsap.to(answerElement, {
      height: isOpen ? "auto" : 0,
      opacity: isOpen ? 1 : 0,
      marginTop: isOpen ? "16px" : 0,
      duration: 0.4,
      ease: "power3.inOut",
    });

    gsap.to(iconRef.current, {
        rotate: isOpen ? 180 : 0,
        duration: 0.3,
        ease: "power2.out"
    });

  }, { dependencies: [isOpen], scope: containerRef });

  return (
    <div ref={containerRef} className="border-b border-primary/10 py-6">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between text-left"
      >
        <h3 className="font-title text-2xl text-secondary">
          {item.question}
        </h3>
        <div ref={iconRef}>
          <FaChevronDown className="h-5 w-5 text-primary" />
        </div>
      </button>
      <div ref={answerRef} className="h-0 overflow-hidden opacity-0">
        <div className="prose prose-invert prose-lg max-w-none text-foreground/80 prose-strong:text-secondary">
            <ReactMarkdown>{item.answer}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export const Competitions = ({ competitions, openCompetition, setOpenCompetition }: CompetitionsProps) => {
  const handleToggle = (name: string) => {
    setOpenCompetition(openCompetition === name ? null : name);
  };

  return (
    <div className="bg-foreground/5 p-6 sm:p-8 rounded-lg border border-primary/10">
      <div className="flex flex-col">
        {competitions.map((comp) => (
          <AccordionItem
            key={comp.name}
            item={{ question: comp.name, answer: comp.desc }}
            isOpen={openCompetition === comp.name}
            onClick={() => handleToggle(comp.name)}
          />
        ))}
      </div>
    </div>
  );
};
