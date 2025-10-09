/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/schedule.tsx or app/schedule/page.tsx (assuming app router, but adjust as needed)
"use client"
import Timeline from '../../components/Timeline'; // Removed sampleEvents, as we're fetching real data
import React, { useState, useEffect } from "react";
import { getSingleDoc } from "@repo/firebase";
import { Freehand } from "next/font/google";

 
// ✅ create the font instance
const freehand = Freehand({
  subsets: ["latin"],
  weight: "400",
});

type ScheduleEvent = {
  id: number;
  date: string;
  title: string;
  summary: string;
  imageUrl: string;
  details: string;
  start: string;
  end: string;
  timestamp: Date;
  day: string;
  venue: string;
  latitude?: number;
  longitude?: number;
};

export default function Schedule() {
  const [currentDaySchedule, setCurrentDaySchedule] = useState<ScheduleEvent[]>([]);
  const [day1, setDay1] = useState<ScheduleEvent[]>([]);
  const [day2, setDay2] = useState<ScheduleEvent[]>([]);
  const [day3, setDay3] = useState<ScheduleEvent[]>([]);
  const [day4, setDay4] = useState<ScheduleEvent[]>([]);
  const [activeDay, setActiveDay] = useState(1);
  const [loading, setLoading] = useState(true);

  const dates = [
    { day: 1, date: "2025-10-11" },
    { day: 2, date: "2025-10-12" },
    { day: 3, date: "2025-10-13" },
    { day: 4, date: "2025-10-14" },
  ];

  const getCurrentISTDate = () => {
    const now = new Date();
    const offsetIST = now.getTime() + (now.getTimezoneOffset() * 60000) + (5.5 * 60 * 60 * 1000);
    const istDate = new Date(offsetIST);
    return istDate.toISOString().split('T')[0];
  };

  const getActiveDayByDate = () => {
    const today = getCurrentISTDate();
    const activeDate = dates.find(dateObj => dateObj.date === today);
    return activeDate ? activeDate.day : 1;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
       const data = await getSingleDoc("WebContentsNew", "schedule");
        if (data && data.data) {
          const fetchedSchedule = data.data;
          const day1array: ScheduleEvent[] = [];
          const day2array: ScheduleEvent[] = [];
          const day3array: ScheduleEvent[] = [];
          const day4array: ScheduleEvent[] = [];
          fetchedSchedule.forEach((event : any, index: any) => {
            const scheduleEvent: ScheduleEvent = {
              id: index + 1, // Add id for TimelineEvent
              date: event.startTime.content.toDate().toLocaleDateString(), // Full date for event
              title: event.eventName.content,
              summary: event.desc.content.substring(0, 100) + '...', // Truncated summary
              imageUrl: event.image.content.url,
              details: `${event.desc.content}\nVenue: ${event.venue.content}`,
              start: event.startTime.content.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              end: event.endTime.content.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              timestamp: event.startTime.content.toDate(),
              day: event.day.content,
              venue: event.venue.content,
              latitude: event.latitude.content,
              longitude: event.longitude.content,
            };

            if (scheduleEvent.day === "1") day1array.push(scheduleEvent);
            else if (scheduleEvent.day === "2") day2array.push(scheduleEvent);
            else if (scheduleEvent.day === "3") day3array.push(scheduleEvent);
            else if (scheduleEvent.day === "4") day4array.push(scheduleEvent);
          });

          day1array.sort((x, y) => x.timestamp.getTime() - y.timestamp.getTime());
          day2array.sort((x, y) => x.timestamp.getTime() - y.timestamp.getTime());
          day3array.sort((x, y) => x.timestamp.getTime() - y.timestamp.getTime());
          day4array.sort((x, y) => x.timestamp.getTime() - y.timestamp.getTime());

          console.log("DEBUG day1array:", day1array); // <-- Debug log

          setDay1(day1array);
          setDay2(day2array);
          setDay3(day3array);
          setDay4(day4array);
          setCurrentDaySchedule(day1array);
        } else {
          console.error("No data available.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
    setActiveDay(getActiveDayByDate());
  }, []);

  useEffect(() => {
    if (activeDay === 1) setCurrentDaySchedule(day1);
    else if (activeDay === 2) setCurrentDaySchedule(day2);
    else if (activeDay === 3) setCurrentDaySchedule(day3);
    else if (activeDay === 4) setCurrentDaySchedule(day4);
  }, [activeDay, day1, day2, day3, day4]);

  const changeDay = (day: number) => setActiveDay(day);


  return (
   <div className="flex flex-col min-h-screen">
  {/* Top Image with overlay content */}
  <div className="relative h-120 bg-cover bg-center" style={{ backgroundImage: `url('/top2.jpg')` }}>
    {/* Fade at bottom of image */}
    <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-[#0c0b26]"></div>

    {/* Overlay content */}
    <div className="absolute inset-0 flex flex-col items-center justify-start pt-32">
      <h1
        className={`${freehand.className} text-center text-5xl sm:text-6xl
                    text-white    mb-7
                    [text-shadow:0_0_15px_rgba(255,192,203,0.8),0_0_30px_rgba(255,192,203,0.4)]`}>
        SCHEDULE
      </h1>

      
    </div>
  </div>

  {/* Gradient Section */}
  <div className="flex-1 bg-gradient-to-b from-[#0c0b26] to-[#1E213D]  relative">
    <div className="container mx-auto py-16">

      {/* Day Selector */}
      <div className="flex justify-center flex-wrap gap-6">
        {dates.map((d) => (
          <button
            key={d.day}
            onClick={() => changeDay(d.day)}
            className={`px-6 py-2 rounded-[5px] shadow-md transition-all duration-300
              ${
                activeDay === d.day
                  ? "bg-blue-500/90 text-white hover:bg-blue-600 hover:shadow-blue-500/40"
                  : "bg-white/20 text-white border border-white/20 hover:bg-white/30"
              }`}
          >
            Day {d.day} 
          </button>
        ))}
      </div>
      {/* Timeline */}
      <Timeline events={currentDaySchedule} />
    </div>
  </div>

  {/* Bottom Image with fade
  <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url('/bottom.jpg')` }}>
    <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-t from-transparent to-blue-200"></div>
  </div> */}
</div>


  );
}

