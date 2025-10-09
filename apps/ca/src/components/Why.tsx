import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const perksData = [
	{
		title: "Be a Leader",
		description:
			"Represent your college and help organize one of Asia's largest cultural fests.",
		icon: "/why/leader.png",
	},
	{
		title: "Networking",
		description:
			"Get opportunities to interact with celebrities, artists, and students from various fields.",
		icon: "/why/network.png",
	},
	{
		title: "Enhance Your Skills",
		description:
			"Improve your communication, leadership, and managerial abilities in a real-world environment.",
		icon: "/why/enhance.png",
	},
	{
		title: "Exclusive Rewards",
		description:
			"Top performers get access to free courses, certificates, and unique earning opportunities.",
		icon: "/why/rewards.png",
	},
];

export function Why() {
	const pathname = usePathname();
	const whyContainer = useRef<HTMLDivElement>(null);
	const titleContainer = useRef<HTMLDivElement>(null);
	useGSAP(
		() => {
			gsap.killTweensOf("*");
			const mm = window.matchMedia("(min-width: 768px)");

			if (mm.matches) {
				gsap
					.timeline({
						scrollTrigger: {
							trigger: whyContainer.current,
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
		{ scope: whyContainer, dependencies: [pathname], revertOnUpdate: true }
	);

	return (
		<div
			className="mt-2 flex flex-col items-center justify-start md:!grid md:!grid-cols-2 relative md:!items-start text-[var(--white)] "
			ref={whyContainer}
		>
			<div
				className="flex justify-center w-full items-center h-fit md:!self-start md:!sticky top-1/2 -translate-y-1/2"
				ref={titleContainer}
			>
				<div className="flex flex-wrap justify-center md:!block text-3xl border-b-2 border-b-[var(--pink)] md:!border-b-0 md:!text-5xl lg:!text-6xl space-x-2 xl:text-7xl md:!border-l-[var(--pink)] md:!border-l-2 w-[80%] md:!w-fit px-5">
					<p className="heading">WHY </p>
					<p className="heading">CAMPUS </p>
					<p className="heading">AMBASSADOR </p>
				</div>
			</div>
			<div className="flex flex-col items-center text-center md:!text-start  ">
				{perksData.map((perk, index) => {
					return (
						<div
							key={index}
							className="flex flex-col justify-center items-center text-center h-[40vh] md:!h-[50vh] w-2/3 border-b-2 border-gray-500 md:max-w-md p-2 md:p-4"
						>
							<h1 className="text-[var(--pink)]  text-xl md:!text-3xl lg:!text-4xl font-bold">
								{perk.title}
							</h1>
							<div className="w-full flex justify-center">
								<Image
									src={perk.icon}
									alt="icon"
									height={60}
									width={60}
									className="text-white"
								/>
							</div>
							<p className="text-lg md:!text-2xl font-serif">
								{perk.description}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}
