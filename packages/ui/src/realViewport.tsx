"use client"

import { useEffect } from "react";
import {ScrollTrigger} from "gsap/ScrollTrigger"

export const RealViewport = () => {
	useEffect(() => {
		function onWindowResize() {
			document.documentElement.style.setProperty(
				"--vh",
				window.innerHeight * 0.01 + "px"
			);

			document.documentElement.style.setProperty(
				"--dvh",
				window.innerHeight * 0.01 + "px"
			);

			document.documentElement.style.setProperty(
				"--svh",
				document.documentElement.clientHeight * 0.01 + "px"
			);

			document.documentElement.style.setProperty("--lvh", "1vh");

			ScrollTrigger.refresh()
		}

		window.addEventListener("resize", onWindowResize, false);
		onWindowResize();

		return () => {
			window.removeEventListener("resize", onWindowResize, false);
		};
	}, []);

	return null;
};
