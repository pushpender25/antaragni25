"use client";

import {
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaFacebook,
  FaXTwitter,
  FaWhatsapp,
} from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import title from "../assets/title.png";

export default function Footer() {
  return (
    <footer className="bg-black left-0 w-full text-white text-center py-6 flex flex-col items-center justify-center">
      {/* Logo */}
      <div className="flex flex-col items-center justify-center">
        <Image
          src={title}
          alt="Antaragni Logo"
          width={200}
          height={80}
          priority
          className="mx-auto"
        />

        {/* Register Button */}
        <Link
          href="https://events.antaragni.in/login/"
          target="_blank"
          className="mt-4 inline-block bg-gradient-to-r from-pink-500 to-pink-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:scale-105 transition-transform duration-300"
        >
          Register for Events Portal
        </Link>
      </div>

      {/* Top Border */}
      <div className="w-4/5 mx-auto my-6 border-t border-white/50"></div>

      {/* Social Icons */}
      <div className="flex justify-center space-x-6 py-3 text-xl">
        <a
          href="https://www.instagram.com/antaragni.iitkanpur/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-400 transition"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.youtube.com/user/antaragniiitkanpur"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-400 transition"
        >
          <FaYoutube />
        </a>
        <a
          href="https://www.linkedin.com/company/antaragni-iit-kanpur/mycompany/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-400 transition"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://twitter.com/antaragni"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-400 transition"
        >
          <FaXTwitter />
        </a>
        <a
          href="https://www.facebook.com/antaragni.iitk/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-400 transition"
        >
          <FaFacebook />
        </a>
        <a
          href="https://whatsapp.com/channel/0029Vak8LmD9mrGWHTsPIR3r"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-400 transition"
        >
          <FaWhatsapp />
        </a>
      </div>

      {/* Footer Text */}
      <p className="text-center text-sm mt-2 text-gray-300">
        © 2025 Antaragni, IIT Kanpur. All Rights Reserved.
      </p>
    </footer>
  );
}
