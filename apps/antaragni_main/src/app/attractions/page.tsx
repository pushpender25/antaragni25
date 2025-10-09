"use client"
import StarCard from "../../components/starAttraction";
import { doc, getSingleDoc } from "@repo/firebase";
import { useEffect, useState } from "react";

import { useStore } from "@repo/store";
import { Freehand } from "next/font/google";


const freehand = Freehand({
    weight: "400",
    subsets: ["latin"],
});


export default function AttractionPage() {
    const { setLoading } = useStore();



    const [mediaData, setmediaData] = useState<doc | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getSingleDoc(
                    "WebContentsNew",
                    "New_StarAttractions"
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
    const attraction = details
        ?.map((c) => ({
            link: c.link.content,
            img: c.pic.content.url,
            title: c.Heading.content,
            text: c.Text?.content
        }));



    return (
        <>
            {/* <Header />  */}


            {/* Main content wrapper */}
            <div className="min-h-screen bg-[#0c0b26] text-white flex flex-col pt-20 items-center py-10">


                <h1 
                    className={`${freehand.className} block text-8xl lg:text-9xl text-center m-8 mt-[4%] text-[var(--color1)] font-extrabold mb-[5%]`} 
                    style={{ textShadow: '0px 4px 20px rgba(252, 155, 155, 1), 0px 0px 2px rgba(252,155,155,0.7)' }}
                >
                    Star Attraction
                </h1>


                {/* THE KEY IMPROVEMENT:
                    Changed 'flex' container to a simple 'div' with 'max-w' and removed horizontal padding (px-6 lg:px-20) 
                    to ensure the cards are responsible for their own width and centering.
                    Using 'space-y' provides the vertical gap.
                */}
                <div className="w-full space-y-16 max-w-7xl">
                    {attraction?.length ? (
                        attraction.map((card, index) => {
                            return (
                                <div key={index} className="px-6 lg:px-20"> {/* Add padding around the card only */}
                                    <StarCard
                                        imageUrl={card.img}
                                        instaLink={card.link}
                                        description={card.text}
                                        title={card.title}
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-center text-gray-400">
                            No attractions found.
                        </p>
                    )}
                </div>
            </div>






        </>
    );
}