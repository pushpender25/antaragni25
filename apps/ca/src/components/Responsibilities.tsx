import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Card } from "@repo/ui/card";
import { usePathname } from "next/navigation";
import { useWindowSize } from "react-use";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const responsibilitiesData = [
	{
		title: "Advertise",
		content:
			"Publicize Antaragni and its sponsors in your college by sharing posts and becoming a focal point for your campus.",
		icon: "/responsibilities/advertise.png"
	},
	{
		title: "Organize",
		content:
			"Organize events, workshops, and info sessions about Antaragni with assistance from our dedicated mentors.",
		icon: "/responsibilities/organize.png"
	},
	{
		title: "Conduct",
		content:
			"Help manage elimination rounds in your college and city to select participants for the main event.",
		icon: "/responsibilities/conduct.png"
	},
	{
		title: "Coordinate",
		content:
			"Collaborate with the Antaragni team in organizing on-ground promotional events in your city.",
		icon: "/responsibilities/coordinate.png"
	},
];

export function Responsibilities() {
	const container = useRef<HTMLDivElement>(null);
	const pathname = usePathname();
	const { width } = useWindowSize();
	const isMobile = width < 768;

	useGSAP(
		() => {
			gsap.killTweensOf("*");
			const content = gsap.utils.toArray(".card", container.current);
			if (!isMobile) {
				gsap.to(content, {
					xPercent: -100 * (content.length -1),
					ease: "power1.inOut",
					scrollTrigger: {
						trigger: container.current,
						pin: true,
						start: "top 2%",
						end: "+=200%",
						scrub: true,
					},
				});
			}
		},
		{ scope: container, dependencies: [pathname, isMobile], revertOnUpdate: true }
	);

	useGSAP(
		() => {
			gsap.from(".heading", {
				opacity: 0,
				ease: "power3.out",
				duration: 1,
				scrollTrigger: {
					trigger: container.current,
					start: "top center",
				},
			});
		},
		{ scope: container, dependencies: [pathname], revertOnUpdate: true }
	);

	return (
		<div className="flex flex-col py-5 md:overflow-hidden" ref={container}>
			<div className="heading uppercase text-4xl md:!text-6xl text-center border-b-2 border-[var(--pink)] w-fit mx-auto mt-15 lg:!mt-5">
				What We Expect
			</div>
			<div className="md:pl-[20vw] flex flex-col md:!flex-row items-center content-center shrink-0 md:h-screen gap-[10vw] md:overflow-hidden py-5">
				{responsibilitiesData.map((responsibility, index) => (
					<Card
						key={index}
						title={responsibility.title}
						content={responsibility.content}
						icon={responsibility.icon}
					/>
				))}
			</div>
		</div>
	);
}
