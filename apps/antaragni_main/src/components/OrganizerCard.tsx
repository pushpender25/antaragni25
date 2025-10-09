/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FaEnvelope, FaPhone, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

interface FileContent {
  url?: string;
  downloadURL?: string;
  [key: string]: any;
}

interface Field {
  type: string;
  content: any;
}

interface TeamMember {
  Id?: string;
  Name?: Field;
  Post?: Field;
  Dept?: Field;
  Email?: Field;
  Contact?: Field;
  LinkedIn?: Field;
  Instagram?: Field;
  Facebook?: Field;
  Pic?: { type: string; content: FileContent };
}

interface OrganiserCardProps {
  member?: TeamMember;
}

const OrganiserCard: React.FC<OrganiserCardProps> = ({ member }) => {
  if (!member) return null;

  const name = member.Name?.content ?? member.Id ?? "Unknown";
  const post = member.Post?.content ?? "";
  const dept = member.Dept?.content ?? "";
  const email = member.Email?.content ?? "";
  const phone = member.Contact?.content ?? "";
  const linkedin = member.LinkedIn?.content ?? "";
  const instagram = member.Instagram?.content ?? "";
  const facebook = member.Facebook?.content ?? "";

  const imageUrl =
    member.Pic?.content?.url || member.Pic?.content?.downloadURL || "";

  return (
    <div className="relative w-[230px] h-[320px] flex flex-col justify-end items-center p-3  text-white text-center ">
      
      {/* profile image */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          className="absolute inset-0 rounded w-full h-full object-cover hover:scale-110 transition-all duration-500"
        />
      )}

      {/* content */}
      <div className="relative  flex flex-col items-center space-y-1">
        <p className="font-semibold text-sm tracking-wide uppercase">{name}</p>
        <p className="font-light text-xs">{post} {dept && `• ${dept}`}</p>

        {/* contact icons */}
        <div className="mt-2 flex gap-3 text-white text-sm">
          {email && (
            <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
              <FaEnvelope />
            </a>
          )}
          {phone && (
            <a href={`tel:${phone}`} target="_blank" rel="noopener noreferrer">
              <FaPhone />
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          )}
          {instagram && (
            <a href={instagram} target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          )}
          {facebook && (
            <a href={facebook} target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default OrganiserCard;
