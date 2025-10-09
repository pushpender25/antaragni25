"use client";

import { useEffect, useState, useRef } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@repo/store";
import { doc, getSingleDoc } from "@repo/firebase";
import { roadtrips } from "../../../data/roadtrips";
import roadtripDetails from "./roadtripDetails.json";
import { Section } from "@repo/ui/section";
import Image from "next/image";
import { FaPhone, FaEnvelope, FaInstagram } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Comickaun_registration from "../../../components/Comickaun_registration";
import Junoon_registration from "../../../components/Junoon_registration";
import Djwar_registration from "../../../components/Djwar_registration";
import Bugrap_registration from "../../../components/Bug-rap_registration";
import Bugbeatboxing_registration from "../../../components/Bug-beatboxing_registration";
import Synchro_registration from "../../../components/Synchro_registration";
import { About } from "../../../components/About";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PageSection = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => {
	const sectionRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (!sectionRef.current) return;
			gsap.from(sectionRef.current.children, {
				opacity: 0,
				y: 50,
				stagger: 0.1,
				duration: 0.8,
				ease: "power3.out",
				scrollTrigger: {
					trigger: sectionRef.current,
					start: "top 85%",
				},
			});
		},
		{ scope: sectionRef }
	);

	return (
		<section ref={sectionRef} className="py-16">
			<h2 className="font-title text-5xl md:text-6xl text-primary text-center mb-12">
				{title}
			</h2>
			{children}
		</section>
	);
};

export default function RoadtripDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
	const router = useRouter();
    const { slug } = React.use(params);
	const { setLoading } = useStore();

	const [eventData, setEventData] = useState<doc | null>(null);

	const cardInfo = roadtrips.find(
		(r) => r.slug.toLowerCase() === slug.toLowerCase()
	);
	const detailInfo = roadtripDetails.find(
		(r) => r.slug.toLowerCase() === slug.toLowerCase()
	);

	const isSplitPage = slug.toLowerCase() === "battleunderground";

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const data = await getSingleDoc(
					"WebContentsNew",
					`new_${slug.toLowerCase()}`
				);
				setEventData(data);
			} catch (error) {
				console.error("Failed to fetch roadtrip data:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [slug, setLoading]);

	const details = eventData?.data as any[] | undefined;
	const contactInfo = details
		?.filter((d) => d.flag?.content === "contact")
		.map((c) => ({
			name: c.name.content,
			number: c.number.content,
			insta: c.insta?.content,
			email: c.email?.content,
			image: c.image.content.url,
		}));
	const sponsorsInfo = details
		?.filter((d) => d.flag?.content === "sponsor")
		.map((s) => ({ name: s.name.content, img: s.image.content.url }));
	const scheduleInfo = details
		?.filter((d) => d.flag?.content === "schedule")
		.map((s) => ({
			city: s.city.content,
			date: s.date.content,
			img: s.image.content.url,
		}));
	const partnersInfo = details
		?.filter((d) => d.flag?.content === "partners")
		.map((p) => ({ name: p.name.content, role: p.role.content }));

	const renderRegistrationForm = () => {
		switch (slug.toLowerCase()) {
			case "comickaun":
				return <Comickaun_registration />;
			case "junoon":
				return <Junoon_registration />;
			case "djwar":
				return <Djwar_registration />;
			case "bug-rap":
				return <Bugrap_registration />;
			case "bug-beatboxing":
				return <Bugbeatboxing_registration />;
			case "synchro":
				return <Synchro_registration />;
			default:
				return null;
		}
	};

	if (isSplitPage) {
		return (
			<Section className="min-h-screen flex flex-col items-center justify-center gap-12 pt-24 pb-12 text-center">
				<h1 className="font-title text-6xl md:text-8xl text-primary drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]">
					{cardInfo?.title}
				</h1>
				<p className="text-lg text-secondary max-w-2xl">
					Two electrifying battles, one stage. Choose your arena.
				</p>
				<div className="flex flex-col md:!flex-row gap-8 mt-8">
					<div
						onClick={() => router.push("/roadtrips/bug-beatboxing")}
						className="group relative w-72 h-96 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg"
					>
						<Image
							src="/roadtrips/bug-beatboxing.jpg"
							alt="Beatboxing Battle"
							layout="fill"
							objectFit="cover"
							className="transition-transform duration-300 group-hover:scale-110"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-6">
							<h3 className="font-title text-3xl text-foreground">
								Beatboxing
							</h3>
						</div>
					</div>
					<div
						onClick={() => router.push("/roadtrips/bug-rap")}
						className="group relative w-72 h-96 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg"
					>
						<Image
							src="/roadtrips/bug-battle.jpg"
							alt="Rap Battle"
							layout="fill"
							objectFit="cover"
							className="transition-transform duration-300 group-hover:scale-110"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-6">
							<h3 className="font-title text-3xl text-foreground">
								Rap Battle
							</h3>
						</div>
					</div>
				</div>
			</Section>
		);
	}

	return (
		<div className="">
			<section
				className="h-screen lg:h-screen flex items-center justify-center bg-cover bg-center"
				style={{
					backgroundImage: `url(${detailInfo?.backgroundImg ?? "/temp/bg.png"})`,
				}}
			>
				<h1 className="font-title text-6xl lg:text-9xl text-white drop-shadow-[0_0_15px_rgba(255,215,0,0.8)] text-center px-4">
					{detailInfo?.title}
				</h1>
			</section>

			<div className="bg-background text-foreground py-10">
				<div className="container mx-auto px-4 max-w-6xl">
					<PageSection title="About Us">
						<About
							infoText={detailInfo?.aboutUs.title ?? "Details Coming Soon"}
							imageUrl={detailInfo?.aboutUs.img ?? "/temp/placeholder.png"}
						/>
					</PageSection>

					{scheduleInfo && scheduleInfo.length > 0 && (
						<PageSection title="Schedule">
							<div className="flex flex-wrap justify-center gap-8">
								{scheduleInfo.map((item, idx) => (
									<div
										key={idx}
										className="bg-foreground/5 p-6 rounded-lg border border-primary/10 text-center w-64"
									>
										<div className="w-40 h-52 mx-auto rounded-md overflow-hidden mb-4">
											<img
												src={item.img}
												alt={item.city}
												width={170}
												height={213}
												className="w-full h-full object-cover"
											/>
										</div>
										<h3 className="font-bold text-secondary text-2xl">
											{item.city}
										</h3>
										<p className="text-foreground/70">{item.date}</p>
									</div>
								))}
							</div>
						</PageSection>
					)}

                   {(slug.toLowerCase() !== "comickaun" && slug.toLowerCase() !== "djwar") && (
    <PageSection title="Gallery">
        <div className="bg-foreground/5 p-6 rounded-lg border border-primary/10 w-fit">
            <div className="mt-8 px-4 grid grid-cols-2 gap-3 lg:gap-10 mb-8">
                <div className="col-span-2 lg:col-span-1 flex flex-col gap-3 lg:gap-10">
                    <div className="w-full">
                        <img 
                            className="w-full h-[400px] rounded-[16px] border-2 border-primary/30 overflow-hidden object-cover border border-[#313143] bg-white/5 backdrop-blur-sm shadow-xl" 
                            src={`${(detailInfo as any)?.gallary[0]}`} 
                            alt="Gallery Image 1" 
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3 lg:gap-5">
                        <img 
                            className="w-full h-[154px] rounded-[16px] border-2 border-primary/30 overflow-hidden object-cover border border-[#313143] bg-white/5 backdrop-blur-sm shadow-xl" 
                            src={`${(detailInfo as any)?.gallary[1]}`} 
                            alt="Gallery Image 2" 
                        />
                        <img 
                            className="w-full h-[154px] rounded-[16px] border-2 border-primary/30 overflow-hidden object-cover border border-[#313143] bg-white/5 backdrop-blur-sm shadow-xl" 
                            src={`${(detailInfo as any)?.gallary[2]}`} 
                            alt="Gallery Image 3" 
                        />
                    </div>
                </div>
                <div className="col-span-2 lg:col-span-1 flex flex-col gap-3 lg:gap-10">
                    <div className="grid grid-cols-2 gap-3 lg:gap-5">
                        <img 
                            className="w-full h-[154px] rounded-[16px] border-2 border-primary/30 overflow-hidden object-cover border border-[#313143] bg-white/5 backdrop-blur-sm shadow-xl" 
                            src={`${(detailInfo as any)?.gallary[3]}`} 
                            alt="Gallery Image 4" 
                        />
                        <img 
                            className="w-full h-[154px] rounded-[16px] border-2 border-primary/30 overflow-hidden object-cover border border-[#313143] bg-white/5 backdrop-blur-sm shadow-xl" 
                            src={`${(detailInfo as any)?.gallary[4]}`} 
                            alt="Gallery Image 5" 
                        />
                    </div>
                    <div className="w-full">
                        <img 
                            className="w-full h-[400px] rounded-[16px] border-2 border-primary/30 overflow-hidden object-cover border border-[#313143] bg-white/5 backdrop-blur-sm shadow-xl" 
                            src={`${(detailInfo as any)?.gallary[5]}`} 
                            alt="Gallery Image 6" 
                        />
                    </div>
                </div>
            </div>
        </div>
    </PageSection>
)}
					{renderRegistrationForm()}

                    
					{sponsorsInfo && sponsorsInfo.length > 0 && (
						<PageSection title="Sponsors">
							<div className="flex flex-wrap justify-center gap-8">
								{sponsorsInfo.map((sponsor, idx) => (
									<div
										key={idx}
										className="bg-foreground/5 p-6 rounded-lg border border-primary/10 text-center w-64"
									>
										<div className="w-50 flex items-center h-52 mx-auto rounded-md overflow-hidden mb-4">
											<img
												src={sponsor.img}
												alt={sponsor.name}
												width={170}
												height={213}
												className="w-full h-fit object-fit"
											/>
										</div>
										<h3 className="font-bold text-secondary text-2xl">
											{sponsor.name}
										</h3>
									</div>
								))}
							</div>
						</PageSection>
					)}

					{partnersInfo && partnersInfo.length > 0 && (
						<PageSection title="Partners">
							<div className="flex flex-wrap justify-center gap-8">
								{partnersInfo.map((item, idx) => (
									<div
										key={idx}
										className="bg-foreground/5 p-6 rounded-lg border border-primary/10 text-center w-64"
									>
										<h3 className="font-bold text-secondary text-2xl">
											{item.name}
										</h3>
										<p className="text-foreground/70">{item.role}</p>
									</div>
								))}
							</div>
						</PageSection>
					)}

					{contactInfo && contactInfo.length > 0 && (
						<PageSection title="Contact Us">
							<div className="flex flex-wrap justify-center gap-8">
								{contactInfo.map((contact, idx) => (
									<div
										key={idx}
										className="bg-foreground/5 p-6 rounded-lg border border-primary/10 text-center w-72 flex flex-col items-center"
									>
										<div className="w-36 h-36 rounded-full overflow-hidden border-2 border-primary/30 mb-4">
											<img
												src={contact.image}
												alt={contact.name}
												width={150}
												height={150}
												className="w-full h-full object-cover"
											/>
										</div>
										<h3 className="font-title text-2xl text-secondary">
											{contact.name}
										</h3>
										<div className="text-foreground/70 mt-4 space-y-2 text-sm">
											<a
												href={`tel:${contact.number}`}
												className="flex items-center justify-center gap-2 hover:text-primary"
											>
												<FaPhone />
												<span>{contact.number}</span>
											</a>
											{contact.email && (
												<a
													href={`mailto:${contact.email}`}
													className="flex items-center justify-center gap-2 hover:text-primary"
												>
													<FaEnvelope />
													<span>{contact.email}</span>
												</a>
											)}
											{contact.insta && (
												<a
													href={contact.insta}
													target="_blank"
													rel="noopener noreferrer"
													className="flex items-center justify-center gap-2 hover:text-primary"
												>
													<FaInstagram />
													<span>Instagram</span>
												</a>
											)}
										</div>
									</div>
								))}
							</div>
						</PageSection>
					)}
				</div>
			</div>
		</div>
	);
}
