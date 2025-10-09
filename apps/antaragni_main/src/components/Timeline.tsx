"use client";

import React from "react";

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  summary: string;
  imageUrl: string;
  latitude?: number;
  longitude?: number;
  start: string;
  end: string;
  venue: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="relative max-w-6xl mx-auto py-16 px-4">
      {/* Central vertical line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800"></div>

      {events.map((event, index) => {
        const isLeft = index % 2 === 0;

        // ✅ Equal-size text box
        const textDiv = (
          <div
            className="w-full lg:w-[500px] h-[300px] p-6 bg-white/10 backdrop-blur-lg border border-white/20 
                       rounded-2xl shadow-lg flex flex-col justify-center text-center 
                       transition duration-300 hover:scale-105 hover:shadow-blue-500/40"
          >
            <h3 className="text-[#FFD700] font-bold text-lg mb-2">
              {event.title}
            </h3>
            <p className="text-sm text-blue-200 mb-1">
              {event.start} - {event.end}
            </p>
            <p className="text-sm text-gray-200 mb-2">Venue: {event.venue}</p>
            <p className="text-gray-100">{event.summary}</p>
            {event.latitude !== undefined && event.longitude !== undefined && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${event.latitude},${event.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-sm text-blue-400 hover:text-blue-300  
                           bg-white/10 rounded px-3 py-1 transition-all"
              >
                View on Map
              </a>
            )}
          </div>
        );

        // ✅ Equal-size image
        const imageDiv = (
          <div
            className={`hidden lg:flex lg:w-[500px] lg:h-[300px] ${
              isLeft ? "justify-start" : "justify-end"
            }`}
          >
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full rounded-xl object-cover shadow-md border-2 border-white/20
                         transition-transform duration-300 ease-in-out 
                         hover:scale-110 hover:shadow-blue-500/50 hover:border-blue-400"
            />
          </div>
        );

        return (
          <div
            key={event.id}
            className="relative mb-16 flex flex-col lg:flex-row items-center lg:items-stretch justify-between"
          >
            {/* ✅ Alternate sides on large screen; stacked on smaller */}
            {isLeft ? (
              <>
                <div className="hidden lg:flex">{textDiv}</div>
                <div className="absolute left-1/2 transform -translate-x-1/2 bg-blue-500 w-6 h-6 rounded-full border-4 border-blue-900 shadow-md shadow-blue-400/50 z-10"></div>
                {imageDiv}
                {/* Small/medium screen stacked */}
                <div className="block lg:hidden w-full flex justify-end">
                  {textDiv}
                </div>
              </>
            ) : (
              <>
                <div className="hidden lg:flex">{imageDiv}</div>
                <div className="absolute left-1/2 transform -translate-x-1/2 bg-blue-500 w-6 h-6 rounded-full border-4 border-blue-900 shadow-md shadow-blue-400/50 z-10"></div>
                {textDiv}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;

// Sample events
export const sampleEvents: TimelineEvent[] = [
  {
    id: 1,
    date: "2023-01-01",
    title: "Event 1",
    summary: "This is a summary for event 1.",
    imageUrl: "https://via.placeholder.com/450x350?text=Event+1",
    latitude: 37.7749,
    longitude: -122.4194,
    start: "09:00",
    end: "10:00",
    venue: "Venue 1",
  },
  {
    id: 2,
    date: "2023-02-01",
    title: "Event 2",
    summary: "This is a summary for event 2.",
    imageUrl: "https://via.placeholder.com/450x350?text=Event+2",
    latitude: 40.7128,
    longitude: -74.006,
    start: "11:00",
    end: "12:00",
    venue: "Venue 2",
  },
  {
    id: 3,
    date: "2023-03-01",
    title: "Event 3",
    summary: "This is a summary for event 3.",
    imageUrl: "https://via.placeholder.com/450x350?text=Event+3",
    latitude: 34.0522,
    longitude: -118.2437,
    start: "13:00",
    end: "14:00",
    venue: "Venue 3",
  },
];
