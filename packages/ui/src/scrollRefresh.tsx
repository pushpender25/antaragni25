"use client";

import { usePathname } from "next/navigation"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect } from "react"
import gsap from "gsap"

gsap.registerPlugin(ScrollTrigger)

export function ScrollRefresh() {
	const pathname = usePathname()

	useEffect(() => {
		const timeout = setTimeout(() => {
			ScrollTrigger.refresh()
            ScrollTrigger.update()
		}, 200);

		return () => clearTimeout(timeout);
	}, [pathname]);

	return null;
}
