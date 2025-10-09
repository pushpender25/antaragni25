"use client";

import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaChevronDown } from "react-icons/fa";

const faqData = [
  {
    question: "What is the Campus Ambassador Program?",
    answer:
      "The Campus Ambassador Program is a student-driven initiative where selected ambassadors promote our brand, organize events, and provide feedback from their respective campuses. This program aims to create a strong community and enhance brand awareness among students.",
  },
  {
    question: "Who can apply for the Campus Ambassador Program?",
    answer:
      "Any currently enrolled university or college student with good communication skills, an active social media presence, and a passion for Antaragni can apply.",
  },
  {
    question: "How do I apply for the program?",
    answer:
      "You can apply by registering on our website. The application process requires just submitting your details.",
  },
  {
    question: "What are the responsibilities of a Campus Ambassador?",
    answer:
      "Campus Ambassadors promote Antaragni, organize events, provide feedback, create content, and network with other students to enhance engagement and awareness.",
  },
  {
    question: "What benefits do Campus Ambassadors receive?",
    answer:
      "Ambassadors gain professional development experience, exclusive access to products and events, mentorship, networking opportunities, certificates of recognition, and various incentives like merchandise and gift cards.",
  },
  {
    question: "How is the points system structured?",
    answer:
      'The points system, "Engagement Tokens," rewards ambassadors for their activities and contributions. Points can be earned through various tasks such as event organization, social media promotion, and content creation.',
  },
  {
    question: "What is the level system in the program?",
    answer:
      'The level system, referred to as "Achievement Tiers," signifies the progression of ambassadors based on their points and contributions. It ranges from initial stages like "Ambassador Apprentice" to advanced stages like "Ambassador Legend."',
  },
  {
    question: "How long does the program last?",
    answer:
      "The Campus Ambassador Program typically lasts for 6 months, with the possibility of extension based on performance and mutual interest.",
  },
  {
    question: "Can I apply if my university is not listed?",
    answer:
      "Yes, you can still apply. We welcome applications from students from all universities and colleges.",
  },
  {
    question: "How will I know if I am selected?",
    answer:
      "Once registered on the portal, you can start doing the task and join the Antaragni Outreach Team.",
  },
  {
    question: "What kind of events am I expected to organize?",
    answer:
      "Events can include workshops, seminars, webinars, social gatherings, and promotional activities tailored to your campus's interests and needs.",
  },
  {
    question: "How do I track my progress and points?",
    answer:
      "You can track your progress by Leaderboard and Dashboard through our website, where all activities and points are logged and updated.",
  },
  {
    question: "What support will I receive as a Campus Ambassador?",
    answer:
      "You will receive guidance and a Roadmap from our team.",
  },
  {
    question: "What happens if I cannot fulfill my duties?",
    answer:
      "If you need help in fulfilling your duties, please contact our team as soon as possible. We understand that academic commitments are a priority and can discuss possible solutions or adjustments to your responsibilities.",
  },
];

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

  useGSAP(() => {
    const answerElement = answerRef.current;
    if (!answerElement) return;

    if (isOpen) {
      gsap.to(answerElement, {
        height: "auto", 
        opacity: 1,
        marginTop: "16px",
        duration: 0.3,
        ease: "power2.inOut",
      });
    } 
    else {
      gsap.to(answerElement, {
        height: 0,
        opacity: 0,
        marginTop: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, { dependencies: [isOpen], scope: containerRef });

  return (
    <div ref={containerRef} className="border-b border-white/10 py-6">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between text-left"
      >
        <h3 className="text-lg font-medium text-white md:!text-xl">
          {item.question}
        </h3>
        <div className="gsap-chevron-icon">
          <FaChevronDown className="h-6 w-6 text-[var(--pink)]" />
        </div>
      </button>
      <div ref={answerRef} className="h-0 overflow-hidden opacity-0">
        <p className="text-base text-gray-300 md:!text-lg">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqContainerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
      const allChevrons = gsap.utils.toArray(".gsap-chevron-icon", faqContainerRef.current);
      allChevrons.forEach((chevron, index) => {
          gsap.to(chevron as HTMLElement, {
              rotate: openIndex === index ? 180 : 0,
              duration: 0.3,
              ease: "power2.inOut"
          });
      });
  }, { dependencies: [openIndex], scope: faqContainerRef });

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full  py-16 md:py-24">
      <div ref={faqContainerRef} className="container mx-auto max-w-4xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-white md:!text-5xl lg:!text-6xl heading">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Have questions? We&apos;ve got answers. If you need more help, feel free
            to contact us.
          </p>
        </div>

        <div>
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
