"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faXTwitter,
  faYoutube,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import MobileDrawer from "./MobileDrawer";

import typefacefinal from "../assets/title.png"; // place title.png in /public

const Header = () => {
	const pathname = usePathname();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  const toggleMobileDrawer = () => setIsMobileDrawerOpen(!isMobileDrawerOpen);

  const isRootPage = pathname === "/";

  if (pathname === "/3d") return null;

	return (
    <nav className="flex justify-between items-center px-4  fixed top-0 left-0 right-0 bg-black/20  backdrop-blur-lg border-b border-white/10 z-[999] font-[Mooli]">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/">
          <Image src={typefacefinal} alt="typeface" className="h-[70px] w-auto" />
						</Link>
					</div>

      {/* Mobile Hamburger */}
      <div
        className="text-white text-2xl cursor-pointer block lg:hidden"
        onClick={toggleMobileDrawer}
      >
        <div
          className={`transition-transform ${
            isMobileDrawerOpen ? "rotate-90 text-[var(--secondary-color)]" : ""
          }`}
        >
          &#9776;
        </div>
					</div>

      {/* Desktop Nav Links */}
      <ul className="hidden lg:flex items-center space-x-4 text-white">
        {/* Register Dropdown */}
        <li className="relative group">
          <span className="cursor-pointer flex items-center hover:text-[var(--secondary-color)]">
            Register
            <svg
              viewBox="0 0 360 360"
              className="w-3 h-3 ml-1 fill-white group-hover:fill-[var(--secondary-color)] transition-transform"
            >
              <path d="M325.6,79.4c-5.9-5.9-15.4-5.9-21.2,0l-139.4,139.4L25.6,79.4c-5.9-5.9-15.4-5.9-21.2,0s-5.9,15.4,0,21.2l150,150c2.8,2.8,6.6,4.4,10.6,4.4s7.8-1.6,10.6-4.4l150-150C331.5,94.7,331.5,85.3,325.6,79.4z" />
										</svg>
          </span>
          <ul className="absolute hidden group-hover:block top-full left-0 bg-[#333] rounded-lg shadow-md p-2 text-center">
            <li>
              <a
                href="https://events.antaragni.in/"
                target="_blank"
                rel="noreferrer"
                className="block text-white text-sm py-1 hover:text-[var(--secondary-color)]"
              >
                Events
              </a>
            </li>
            <li>
              <a
                href="https://ca.antaragni.in/"
                target="_blank"
                rel="noreferrer"
                className="block text-white text-sm py-1 hover:text-[var(--secondary-color)]"
              >
                CA Program
              </a>
            </li>
          </ul>
        </li>

        {/* Roadtrips Dropdown */}
        <li>
  <a
    href="https://events.antaragni.in/roadtrips"
    target="_blank"
    rel="noreferrer"
    className="cursor-pointer flex items-center hover:text-[var(--secondary-color)]"
  >
    Roadtrips
  </a>
</li>

        {/* Merch */}
        <li>
          <Link
            href="/merch"
            className={`relative hover:text-[var(--secondary-color)] ${
              pathname === "/merch" ? "text-[var(--secondary-color)]" : ""
            }`}
          >
            Merchandise
													</Link>
        </li>

        {/* Schedule */}
        <li>
          <Link
            href="/schedule"
            className={`relative hover:text-[var(--secondary-color)] ${
              pathname === "/schedule" ? "text-[var(--secondary-color)]" : ""
            } ${isRootPage ? "hover:text-[var(--secondary-color)]" : ""}`}
          >
            Schedule
          </Link>
        </li>

        {/* Gallery Dropdown */}
        <li className="relative group">
          <span className="cursor-pointer flex items-center hover:text-[var(--secondary-color)]">
            Gallery
            <svg
              viewBox="0 0 360 360"
              className="w-3 h-3 ml-1 fill-white group-hover:fill-[var(--secondary-color)]"
            >
              <path d="M325.6,79.4c-5.9-5.9-15.4-5.9-21.2,0l-139.4,139.4L25.6,79.4c-5.9-5.9-15.4-5.9-21.2,0s-5.9,15.4,0,21.2l150,150c2.8,2.8,6.6,4.4,10.6,4.4s7.8-1.6,10.6-4.4l150-150C331.5,94.7,331.5,85.3,325.6,79.4z" />
													</svg>
          </span>
          <ul className="absolute hidden group-hover:block top-full left-0 bg-[#333] rounded-lg shadow-md p-2 text-center">
            {[
              ["Gallery", "/gallery"],
              ["Brochure", "/brochure"],
              ["Media", "/media"],
            ].map(([label, href]) => (
              <li key={label}>
                <Link
                  href={href!}
                  className={`block text-white text-sm py-1 hover:text-[var(--secondary-color)] ${
                    pathname === href ? "text-[var(--secondary-color)]" : ""
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </li>

        {/* Other Links */}
        <li>
          <Link
            href="/attractions"
            className={`hover:text-[var(--secondary-color)] ${
              pathname === "/attractions" ? "text-[var(--secondary-color)]" : ""
            }`}
          >
            Star Attractions
          </Link>
        </li>
        {/* <li>
          <Link
            href="/hof"
            className={`hover:text-[var(--secondary-color)] ${
              pathname === "/hof" ? "text-[var(--secondary-color)]" : ""
            }`}
          >
            Hall Of Fame
          </Link>
        </li> */}

        {/* Contact Dropdown */}
        <li className="relative group">
          <span className="cursor-pointer flex items-center hover:text-[var(--secondary-color)]">
            Contact
            <svg
              viewBox="0 0 360 360"
              className="w-3 h-3 ml-1 fill-white group-hover:fill-[var(--secondary-color)]"
            >
              <path d="M325.6,79.4c-5.9-5.9-15.4-5.9-21.2,0l-139.4,139.4L25.6,79.4c-5.9-5.9-15.4-5.9-21.2,0s-5.9,15.4,0,21.2l150,150c2.8,2.8,6.6,4.4,10.6,4.4s7.8-1.6,10.6-4.4l150-150C331.5,94.7,331.5,85.3,325.6,79.4z" />
								</svg>
          </span>
          <ul className="absolute hidden group-hover:block top-full left-0 bg-[#333] rounded-lg shadow-md p-2 text-center">
            {[
              ["Core Team", "/coreteam"],
              ["Queries", "/queries"],
            ].map(([label, href]) => (
              <li key={label}>
                <Link
                  href={href!}
                  className={`block text-white text-sm py-1 hover:text-[var(--secondary-color)] ${
                    pathname === href ? "text-[var(--secondary-color)]" : ""
                  }`}
                >
                  {label}
						</Link>
              </li>
            ))}
          </ul>
        </li>

        <li>
									<Link
            href="/sponsors"
            className={`hover:text-[var(--secondary-color)] ${
              pathname === "/sponsors" ? "text-[var(--secondary-color)]" : ""
            }`}
          >
            Sponsors
									</Link>
        </li>
      </ul>

      {/* Social Icons */}
      <div className="hidden lg:flex space-x-3 text-white">
        <a href="https://whatsapp.com/channel/0029Vak8LmD9mrGWHTsPIR3r">
          <FontAwesomeIcon icon={faWhatsapp} className="hover:text-[var(--secondary-color)]" />
        </a>
        <a href="https://www.instagram.com/antaragni.iitkanpur/">
          <FontAwesomeIcon icon={faInstagram} className="hover:text-[var(--secondary-color)]" />
        </a>
        <a href="https://twitter.com/antaragni">
          <FontAwesomeIcon icon={faXTwitter} className="hover:text-[var(--secondary-color)]" />
        </a>
        <a href="https://www.youtube.com/user/antaragniiitkanpur">
          <FontAwesomeIcon icon={faYoutube} className="hover:text-[var(--secondary-color)]" />
        </a>
        <a href="https://www.linkedin.com/company/antaragni-iit-kanpur/mycompany/">
          <FontAwesomeIcon icon={faLinkedin} className="hover:text-[var(--secondary-color)]" />
        </a>
        <a href="https://www.facebook.com/antaragni.iitk/">
          <FontAwesomeIcon icon={faFacebook} className="hover:text-[var(--secondary-color)]" />
        </a>
							</div>

      {/* Mobile Drawer */}
      <MobileDrawer isOpen={isMobileDrawerOpen} onClose={toggleMobileDrawer} />
    </nav>
	);
};

export default Header;
