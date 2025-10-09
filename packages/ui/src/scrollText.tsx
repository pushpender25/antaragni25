import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ScrollText({
	text,
	className,
	bulk,
	fadeOut,
}: {
	text: string;
	className?: string;
	bulk?: boolean;
	fadeOut?: boolean;
}) {
	const wrapper = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const chars = gsap.utils.toArray<HTMLElement>(".char", wrapper.current);
			if (!chars) return;
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: wrapper.current,
					start: "-30% center",
					end: "+=50%",
					pin: true,
                    pinSpacing: false,
					scrub: true,
					markers: true,
				},
			});

			tl.fromTo(
				chars,
				{
					opacity: 0,
				},
				{
					opacity: 1,
					stagger: {
						each: 0.05,
						amount: 0.6,
					},
					ease: "power3.out",
				}
			);

			if (fadeOut)
				tl.to(
					chars.reverse(),
					{
						opacity: 0,
						stagger: {
							each: 0.5,
							amount: 0.6,
						},
						ease: "power3.in",
					},
					"+=0.5"
				);
		},
		{ scope: wrapper }
	);

	return (
		<div className="h-screen w-screen p-3 absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2" ref={wrapper}>
			<div className="text-center ">
				{text.split("").map((char, index) => (
					<span className={`${className} char`} key={index}>
						{char}
					</span>
				))}
			</div>
		</div>
	);
}
