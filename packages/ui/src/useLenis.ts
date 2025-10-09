"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStore } from "@repo/store";

gsap.registerPlugin(ScrollTrigger);

export function useLenisScroll() {
	const lenis = useStore((state) => state.lenis);

	useEffect(() => {
		if (!lenis) return;

		ScrollTrigger.scrollerProxy(document.body, {
			scrollTop(value) {
				if (value !== undefined) {
					lenis.scrollTo(value, { duration: 0, immediate: true });
				}
				return lenis.scroll ?? 0;
			},
			getBoundingClientRect() {
				return {
					top: 0,
					left: 0,
					width: window.innerWidth,
					height: window.innerHeight,
				};
			},
			pinType: "transform",
		});

		const onScroll = () => ScrollTrigger.update();
		lenis.on("scroll", onScroll);

		let rafId: number;
		const raf = (time: number) => {
			lenis.raf(time);
			ScrollTrigger.update();
			rafId = requestAnimationFrame(raf);
		};
		rafId = requestAnimationFrame(raf);

		requestAnimationFrame(() => {
			ScrollTrigger.refresh();
		});

		return () => {
			cancelAnimationFrame(rafId);
			lenis.off("scroll", onScroll);
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
			ScrollTrigger.scrollerProxy(document.body, undefined);
		};
	}, [lenis]);
}
