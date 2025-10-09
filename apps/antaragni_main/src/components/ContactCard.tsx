import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";

interface Pic {
  ref: string;
  url: string;
}

interface TeamMember {
  Id: string;
  Name: string;
  Vertical: string;
  Email?: string;
  Phone?: string;
  LinkedIn?: string;
  Instagram?: string;
  Facebook?: string;
  Twitter?: string;
  Pic?: Pic;
}

interface ContactCardProps {
  member: TeamMember;
}

const ContactCard: React.FC<ContactCardProps> = ({ member }) => {
  const [showInfo, setShowInfo] = useState(false);

  // Only toggle on mobile screens
  const handleCardClick = () => {
    if (window.innerWidth <= 768) {
      setShowInfo((prev) => !prev);
    }
  };

  //helper for consistent icon button
  const renderIcon = (icon: React.ReactNode, href?: string) => {
    if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 flex justify-center items-center rounded bg-black/40 text-white/80 hover:text-white hover:bg-black/60 transition"
        >
          {icon}
        </a>
      );
    }
    return (
      <span className="w-8 h-8 flex justify-center items-center rounded bg-black/30 text-white/40 cursor-not-allowed">
        {icon}
      </span>
    );
  };

  return (
    <div
      className="relative w-[270px] h-[320px] flex justify-center items-center group overflow-hidden rounded-md cursor-pointer"
      onClick={handleCardClick}
    >
      {/* gradient frame */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-pink-600"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500 to-pink-600 blur-2xl"></div>

      {/* inner dark overlay */}
      <b className="absolute inset-[6px] bg-black/60 z-20"></b>

      {/* profile image fills card */}
      {member.Pic?.url && (
        <img
          src={member.Pic.url}
          alt={member.Name}
          className={`absolute inset-[6px] z-30 w-[calc(100%-12px)] h-[calc(100%-12px)] object-cover transition-all duration-500 ${
            showInfo ? "scale-95" : "group-hover:scale-95"
          }`}
        />
      )}

      {/* bottom gradient for readability */}
      <div className="absolute bottom-[6px] left-[6px] right-[6px] h-24 hover:bg-gradient-to-t from-black/80 to-transparent z-40"></div>

      {/* content overlay */}
      <div
        className={`absolute bottom-4 flex flex-col items-center z-50 transition-all duration-500
          ${
            showInfo
              ? "opacity-100 scale-100"
              : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
          }`}
      >
        <p className="text-white font-semibold text-sm tracking-wide uppercase text-center drop-shadow-lg">
          {member.Name}
          <br />
          <span className="font-light text-xs opacity-90">
            {member.Vertical}
          </span>
        </p>

        {/* social icons */}
        <ul className="flex gap-2 mt-2">
          <li>
            {renderIcon(
              <FaPhone size={14} />,
              `tel:${member.Phone}`
            )}
          </li>
          <li>
            {renderIcon(
              <FaEnvelope size={14} />,
               `mailto:${member.Email}`
            )}
          </li>
          {member.LinkedIn && (
     <li>{renderIcon(<FaLinkedin size={14} />, member.LinkedIn)}</li>
    )}
    {member.Instagram && (
  <li>{renderIcon(<FaInstagram size={14} />, member.Instagram)}</li>
    )}

        
          
        </ul>
      </div>
    </div>
  );
};

export default ContactCard;
