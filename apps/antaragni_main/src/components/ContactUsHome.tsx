import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa6";
import { motion } from "framer-motion";

const Contact: React.FC = () => {
  return (
    <motion.div
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-16 md:py-24 text-white overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Background gradient with blur effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030919] via-[#050b1a] to-black backdrop-blur-3xl opacity-90"></div>

      {/* Section Title */}
      <h2 className="relative text-4xl md:text-6xl font-bold font-[Karantina] tracking-[3px] text-center mb-10 z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.25)]">
        JOIN THE COMMUNITY
      </h2>

      {/* Content Container */}
      <div className="relative flex flex-col md:flex-row items-center justify-between w-11/12 max-w-6xl gap-8 md:gap-16 p-8 md:p-12 rounded-3xl backdrop-blur-2xl bg-white/5 shadow-[0_0_50px_rgba(0,0,0,0.7)] border border-white/10 z-10">

        {/* Text Side */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">
              Welcome to Antaragni – IIT Kanpur's Cultural Fest!
            </h3>
            <p className="text-gray-300 leading-relaxed text-base md:text-lg max-w-lg">
              Stay tuned for the latest updates, event announcements, and
              exclusive content from Antaragni — our annual cultural
              extravaganza. Celebrate creativity, talent, and the vibrant
              spirit of campus life. Don’t miss out on the action.
              <strong className="block mt-2 text-white">
                This is where the magic happens!
              </strong>
            </p>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 ">
            {/* Google Play */}
            {/* <a
              href="https://play.google.com/store/apps/details?id=antaragni.flame"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-2 rounded-xl bg-[#00C853] text-black font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_#00C853cc]"
            >
              <FaGooglePlay className="text-lg" />
              Get the App
            </a> */}

            {/* WhatsApp */}
            <a
              href="https://whatsapp.com/channel/0029Vak8LmD9mrGWHTsPIR3r"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-2 rounded-xl bg-[#25D366] text-black font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_#25D366cc]"
            >
              <FaWhatsapp className="text-lg" />
              Join WhatsApp Channel
            </a>
          </div>
        </div>

        {/* Image Side */}
        <div className="flex-1 w-full relative overflow-hidden rounded-2xl">
          <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(255,255,255,0.1)]">
            <img
              src="/contact.jpg"
              alt="Live concert performance"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 hover:brightness-110"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/contact.jpg";
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
