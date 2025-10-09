'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const sections = [
  { id: "t1", label: "Festival Coordinators" },
  { id: "t2", label: "Events & Competitions" },
  { id: "t3", label: "Marketing" },
  { id: "t4", label: "Media & Publicity" },
  { id: "t5", label: "Show Management" },
  { id: "t6", label: "Finance" },
  { id: "t7", label: "Public Relations" },
  { id: "t8", label: "Security" },
  { id: "t10", label: "Web & App" },
  { id: "t9", label: "Design" },
];

const SideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    {
      threshold: 1,              // trigger as soon as it enters
      rootMargin: "-10% 0px -90% 0px", 
      // top margin makes it trigger when heading is ~just below navbar,
      // bottom margin ensures next section won't override too early
    }
  );

  sections.forEach((section) => {
    const el = document.getElementById(section.id);
    if (el) observer.observe(el);
  });

  return () => observer.disconnect();
}, []);




  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex justify-between items-center p-4 bg-[#0c0b26] text-white shadow-lg">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-md hover:bg-white/10 text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-transparent transform transition-transform duration-300 z-50 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-1/4 lg:w-1/5`}
      >
        <div className="flex justify-between items-center p-6 md:hidden">
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md hover:bg-white/10 text-2xl text-gray-200"
          >
            ✕
          </button>
        </div>

        <ul className="flex flex-col justify-center h-full space-y-6 px-10">
          {sections.map((section) => (
            <li key={section.id}>
              <Link
  href={`#${section.id}`}
  className={`block transition-all duration-300 font-bold text-lg
    ${
      activeSection === section.id
        ? "text-white scale-105"
        : "text-gray-400 hover:text-white hover:scale-105"
    }`}
  onClick={() => setIsOpen(false)} // close sidebar on link click (mobile)
>
  {section.label}
</Link>

            </li>
          ))}
        </ul>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SideBar;
