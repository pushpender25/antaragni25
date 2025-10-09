"use client";

import { useState } from "react";
import Link from "next/link";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const [isRoadtripsOpen, setIsRoadtripsOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <>
      {/* Overlay (dim background) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[9999998]"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-[4.5rem]
          ${isOpen ? "right-0" : "-right-full"}
          w-[260px] p-6
          bg-black/90 backdrop-blur-lg
          flex flex-col items-center justify-center
          rounded-l-[30px]
          transition-all duration-300 z-[9999999]
        `}
      >
        <ul className="flex flex-col items-center list-none p-0">
          {/* Register */}
          <li className="my-2">
            <a
              href="https://events.antaragni.in"
              target="_blank"
              rel="noreferrer"
              onClick={onClose}
              className="text-white text-[22px] hover:text-white"
            >
              Register
            </a>
          </li>

          {/* CA Program */}
          <li className="my-2">
            <a
              href="https://ca.antaragni.in"
              target="_blank"
              rel="noreferrer"
              onClick={onClose}
              className="text-white text-[22px] hover:text-white"
            >
              CA Program
            </a>
          </li>

          {/* Roadtrips Dropdown */}
          <li className="my-2">
  <a
    href="https://events.antaragni.in/roadtrips"
    target="_blank"
    rel="noreferrer"
    onClick={onClose}
    className="text-white text-[22px] cursor-pointer hover:text-white"
  >
    Roadtrips
  </a>
</li>


          {/* Gallery Dropdown */}
          <li className="relative my-2">
            <span
              className="text-white text-[22px] cursor-pointer hover:text-white"
              onClick={() => setIsGalleryOpen(!isGalleryOpen)}
            >
              Gallery
            </span>
            <ul
              className={`
                ${isGalleryOpen ? "block" : "hidden"}
                absolute -left-[155%] -top-[200%]
                bg-[#333] rounded-lg shadow-md px-4 py-2
              `}
            >
              <li>
                <Link
                  href="/gallery"
                  onClick={onClose}
                  className="block text-white text-xs py-1 hover:text-white"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/brochure"
                  onClick={onClose}
                  className="block text-white text-xs py-1 hover:text-white"
                >
                  Brochure
                </Link>
              </li>
              <li>
                <Link
                  href="/media"
                  onClick={onClose}
                  className="block text-white text-xs py-1 hover:text-white"
                >
                  Media
                </Link>
              </li>
            </ul>
          </li>

          {/* Internal Links */}
          {/* <li className="my-2">
            <Link
              href="/hof"
              onClick={onClose}
              className="text-white text-[22px] hover:text-white"
            >
              Hall of Fame
            </Link>
          </li> */}
          <li className="my-2">
            <Link
              href="/merch"
              onClick={onClose}
              className="text-white text-[22px] hover:text-white"
            >
              Merchandise
            </Link>
          </li>
          <li className="my-2">
            <Link
              href="/schedule"
              onClick={onClose}
              className="text-white text-[22px] hover:text-white"
            >
              Schedule
            </Link>
          </li>
          <li className="my-2">
            <Link
              href="/attractions"
              onClick={onClose}
              className="text-white text-[22px] hover:text-white"
            >
              Star Attractions
            </Link>
          </li>
          <li className="my-2">
            <Link
              href="/coreteam"
              onClick={onClose}
              className="text-white text-[22px] hover:text-white"
            >
              Core Team
            </Link>
          </li>
          <li className="my-2">
            <Link
              href="/queries"
              onClick={onClose}
              className="text-white text-[22px] hover:text-white"
            >
              Queries
            </Link>
          </li>
          <li className="my-2">
            <Link
              href="/sponsors"
              onClick={onClose}
              className="text-white text-[22px] hover:text-white"
            >
              Sponsors
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MobileDrawer;
