import { gsap } from "gsap";
import { mapRange } from "@repo/math";
import { useRef } from "react";
import { useWindowSize } from "react-use";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Parallax({
	className = "",
	children,
	speed = 1,
	id = "parallax",
	position = "",
}: {
	className: string;
	children: React.ReactNode;
	speed: number;
	id: string;
	position: string;
}) {
	const trigger = useRef<HTMLDivElement>(null);
	const target = useRef<HTMLDivElement>(null);

	const { width: windowWidth } = useWindowSize();

	useGSAP(() => {
		const y = windowWidth * speed * 0.1;

		const setY = gsap.quickSetter(target.current, "y", "px");
		const set3d = gsap.quickSetter(target.current, "force3d");
		gsap.timeline({
			scrollTrigger: {
				id: id,
				trigger: trigger.current,
				scrub: true,
				start: "top bottom",
				end: "bottom top",
				onUpdate: (e) => {
					if (position === "top") {
						setY(e.progress * y);
					} else {
						setY(-mapRange(0, 1, e.progress, -y, y));
					}
					set3d(e.progress > 0 && e.progress < 1);
				},
			},
		});
	}, [id, speed, position, windowWidth]);
	return (
		<div ref={trigger}>
			<div ref={target} className={className}>
				{children}
			</div>
		</div>
	);
}
