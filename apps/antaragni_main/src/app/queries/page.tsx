/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from "react";
import { getSingleDoc } from "@repo/firebase";
import OrganizerCard from "../../components/OrganizerCard";
import { Freehand } from "next/font/google";

const freehand = Freehand({
  subsets: ["latin"],
  weight: "400",
});

interface Organizer {
  Name: string;
  Dept: { content: string };
  Email?: string;
  Phone?: string;
  [key: string]: any;
}

const QueriesPage = () => {
  const [organizers, setOrganizers] = useState<Organizer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const organizerData = await getSingleDoc("WebContentsNew", "NewQueries");
      if (organizerData && organizerData.data) {
        const filtered = organizerData.data.filter(
          (org: any) => org.Dept.content === "Hospitality and Transport"
        );
        setOrganizers(filtered);
      }
      console.log("Fetched organizers:", organizerData);
    } catch (err) {
      console.error("Error fetching organizers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0c0b26] pt-25 text-gray-200 relative">
      <div className="absolute inset-0 pointer-events-none" />

      <div className="relative flex flex-col items-center px-6 md:px-12 lg:px-20 py-12 z-10">
        <h1
          className={`${freehand.className} text-center text-5xl sm:text-6xl font-extrabold 
                      text-white mb-12
                      [text-shadow:0_0_20px_rgba(255,192,203,0.9),0_0_40px_rgba(255,192,203,0.5)]`}
        >
          For Any Queries, Please Contact
        </h1>

        {!loading && (
  <div className="w-full max-w-6xl mx-auto">
    <div className="flex flex-wrap justify-center gap-6">
      {organizers.map((organizer, index) => (
        <div
          key={index}
          className="w-full sm:w-[300px] md:w-[280px] lg:w-[260px] p-1 rounded-md flex justify-center"
        >
          <OrganizerCard member={organizer as any} />
        </div>
      ))}
    </div>
  </div>
)}


        {loading && (
          <div className="text-white mt-10 text-lg">Loading organizers...</div>
        )}
      </div>
    </div>
  );
};

export default QueriesPage;
