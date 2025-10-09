// app/media/page.tsx
"use client"
import MediaCard from "../../components/Mediacard";
import { doc, getSingleDoc } from "@repo/firebase";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@repo/store";
import { Freehand } from "next/font/google";

const freehand = Freehand({
  weight: "400",
  subsets: ["latin"],
});

export default function MediaPage() {
    const { setLoading } = useStore();

const [cols, setCols] = useState(4);
    const [mediaData, setmediaData] = useState<doc | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getSingleDoc(
                    "WebContentsNew",
                    "New_Media"
                );
                setmediaData(data);
            } catch (error) {
                console.error("Failed to fetch roadtrip data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [setLoading]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const details = mediaData?.data as any[] | undefined;
    const media = details
        ?.map((c) => ({
            title: c.name.content,
            description: c.desc.content,
            link: c.link.content,
            img: c.img.content.url,
        }));



    useEffect(() => {
        const updateCols = () => {
            if (window.innerWidth < 640) {
                setCols(1); // mobile
            } else if (window.innerWidth < 768) {
                setCols(2); // tablet
            } else {
                setCols(4); // desktop
            }
        };
        updateCols();
        window.addEventListener("resize", updateCols);
        return () => window.removeEventListener("resize", updateCols);
    }, []);
    return (
        <>

        <div className=" min-h-screen bg-[#0c0b26] text-white flex flex-col items-center py-10 pt-25 md:pt-10">
         {/* <Header /> */}
            <h1 className={`${freehand.className} block text-6xl lg:text-9xl text-center m-8 mt-[4%] text-[var(--color1)] font-extrabold mb-[5%]`}  style={{ textShadow: '0px 4px 20px rgba(252, 155, 155, 1), 0px 0px 2px rgba(252,155,155,0.7)' }}>Media Coverage</h1>
           <div
  className="
    grid 
    w-full 
    px-6 sm:px-10 lg:px-16 
    gap-10 sm:gap-12 md:gap-16 
    justify-items-center 
    [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))] 
    mt-[5%] lg:mt-[0%]
  "
>
  {media?.length ? (
    media.map((card, index) => {
      const direction = index % 2 === 0 ? "left" : "right";
      return (
        <MediaCard
          key={index}
          title={card.title}
          description={card.description}
          image={card.img}
          link={card.link}
          direction={direction}
        />
      );
    })
  ) : (
    <p className="col-span-full text-center text-gray-400">
      No media available
    </p>
  )}
</div>

                 
        </div>
      
                    
                      
        </>
    );
}