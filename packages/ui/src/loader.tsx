"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useStore } from "@repo/store";

gsap.registerPlugin(useGSAP);

export function Loader({ type }: { type?: number }) {
	const ref = useRef<HTMLDivElement>(null);
	const [status, setStatus] = useState<"loading" | "animating" | "finished">(
		"loading"
	);
	const { setInitialAnimation } = useStore();

	useEffect(() => {
		const pageLoadPromise = new Promise<void>((resolve) => {
			if (document.readyState === "complete") {
				resolve();
			} else {
				window.addEventListener("load", () => resolve(), { once: true });
			}
		});

		const minTimePromise = new Promise<void>((resolve) => {
			setTimeout(() => resolve(), 1500);
		});

		Promise.all([pageLoadPromise, minTimePromise]).then(() => {
			setStatus("animating");
		});
	}, []);

	useEffect(() => {
		if (status === "animating") {
			if (type === 1) {
				gsap.to(".blinder", {
					scaleY: 0,
					stagger: 0.2,
					ease: "power3.inOut",
					duration: 1,
					delay: 0.2,
				});
				const timer = setTimeout(() => {
					setStatus("finished");
				}, 1500);
				return () => clearTimeout(timer);
			} else {
				const timer = setTimeout(() => {
					setStatus("finished");
				}, 1000);
				return () => clearTimeout(timer);
			}
		}
	}, [status, type, setInitialAnimation]);

	useEffect(() => {
		if(status === "finished")
			setInitialAnimation(false);
	}, [status, setInitialAnimation])

	if (status === "finished") {
		setTimeout(() => {}, 5)
		return null;
	}
	const binduLoaderClasses = `
    fixed top-0 left-0 w-full h-full bg-[var(--color-background)] 
    flex items-center justify-center 
    z-50 transition-opacity duration-1000 ease-out
    ${status === "animating" ? "opacity-0" : "opacity-100"}
  `;

	return (
		<div ref={ref}>
			{type === 1 ?
				<div className="fixed top-0 left-0 w-screen h-screen flex flex-row z-[10000]">
					<div className="blinder w-[20%] h-screen bg-[var(--pink)] origin-top"></div>
					<div className="blinder w-[20%] h-screen bg-[var(--pink)] origin-top"></div>
					<div className="blinder w-[20%] h-screen bg-[var(--pink)] origin-top"></div>
					<div className="blinder w-[20%] h-screen bg-[var(--pink)] origin-top"></div>
					<div className="blinder w-[20%] h-screen bg-[var(--pink)] origin-top"></div>
				</div>
			:	<div className={binduLoaderClasses}>
					<div className="w-4 h-4 bg-[var(--color-accent)] rounded-full animate-pulse"></div>
				</div>
			}
		</div>
	);
}

export default Loader;
