"use client";

import { useRef, ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export function StaggeredFadeIn({ children }: { children: ReactNode }) {
	const container = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			if (container.current) {
				gsap.from(container.current.children, {
					y: 50,
					opacity: 0,
					stagger: 0.1,
					duration: 0.8,
					ease: "power3.out",
				});
			}
		},
		{ scope: container }
	);

	return <div ref={container}>{children}</div>;
}
