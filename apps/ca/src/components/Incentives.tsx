import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const incentiveData = [
	{
		title: "Certification",
		description:
			"Certificate of appreciation from Antaragni'25, IIT Kanpur recognizing your hardwork",
		icon: "/incentives/certificate.png"
	},
	{
		title: "Pronites",
		description:
			"Free entry for the top performing campus ambassadors in exclusive Pronites @Antaragni'25",
		icon: "/incentives/festival.png"
	},
	{
		title: "Opportunities",
		description:
			"Top performing campus ambassadors will get a chance to gain professional experience through insternship provided by top companies",
		icon: "/incentives/opportunity.png"
	},
	{
		title: "Goodies and Merchandise",
		description:
			"Win Antaragni merchandise, promising rewards, gift vouchers from top brands and much more!",
		icon: "/incentives/merchandise.png"
	},
];

export function Incentives() {
	const pathname = usePathname();
	const container = useRef<HTMLDivElement>(null);
	const titleContainer = useRef<HTMLDivElement>(null);
	useGSAP(
		() => {
			gsap.killTweensOf("*");
			const mm = window.matchMedia("(min-width: 768px)");

			if (mm.matches) {
				gsap
					.timeline({
						scrollTrigger: {
							trigger: container.current,
							start: "top center",
							end: "bottom bottom",
							scrub: false,
						},
					})
					.from(".title", {
						y: 10,
						opacity: 0,
						stagger: 0.1,
						duration: 0.5,
					});
			}
		},
		{ scope: container, dependencies: [pathname], revertOnUpdate: true }
	);

	return (
		<div
			className="mt-5 flex flex-col items-center justify-start md:!grid md:!grid-cols-2 relative md:!items-start text-[var(--white)]"
			ref={container}
		>
			<div
				className="flex justify-center items-center h-fit md:!self-start md:!sticky top-1/2 -translate-y-1/2"
				ref={titleContainer}
			>
				<div className="flex flex-wrap justify-center md:!block text-3xl border-b-2 border-b-[var(--pink)] md:!border-b-0 md:!text-5xl lg:!text-6xl space-x-2 xl:text-7xl md:!border-l-[var(--pink)] md:!border-l-2 w-[80%] md:!w-fit px-5">
					<p className="heading">INCENTIVES</p>
				</div>
			</div>
			<div className="flex flex-col items-center text-center md:!text-start ">
				{incentiveData.map((incentive, index) => (
					<div
												key={index}
												className="flex flex-col justify-center items-center text-center h-[45vh] md:!h-[50vh] w-2/3 border-b-2 border-gray-500 md:max-w-md p-2 md:p-4"
											>
												<h1 className="text-[var(--pink)]  text-xl md:!text-3xl lg:!text-4xl font-bold">
													{incentive.title}
												</h1>
												<div className="w-full flex justify-center">
													<Image	
														src={incentive.icon}
														alt="icon"
														height={60}
														width={60}
														className="text-white"
													/>
												</div>
												<p className="text-lg md:!text-2xl font-serif">
													{incentive.description}
												</p>
											</div>
				))}
			</div>
		</div>
	);
}
