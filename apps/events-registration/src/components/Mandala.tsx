"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { useStore } from "@repo/store"; // Using the store from your hook
import { useScroll } from "../hooks/useScroll"; // Assuming this is the path to your hook

// Configuration object for easy tweaking of the animation
const config = {
	opacity: 0.5,
	fadeOutSpeed: "rgba(26, 32, 44, 0.1)",
	layers: 7, // Number of layers in the Mandala
};

const MandalaCanvas = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const dimensionsRef = useRef({ width: 0, height: 0 });
	const animationFrameIdRef = useRef<number | null>(null); // Correct initialization
	const scrollProgressRef = useRef(0);
	const initialGrowthRef = useRef(0); // Ref to manage the initial auto-animation

	const { initialAnimation, loading } = useStore();
	const isAppReady = !initialAnimation && !loading;
	const [hasStarted, setHasStarted] = useState(false);

	const handleScroll = useCallback((e: { scroll: number }) => {
		const scrollableHeight =
			document.documentElement.scrollHeight - window.innerHeight;
		const progress =
			scrollableHeight > 0 ? Math.min(e.scroll / scrollableHeight, 1) : 0;
		scrollProgressRef.current = progress;
	}, []);

	useScroll(handleScroll, []);

	const initCanvas = useCallback(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const dpr = window.devicePixelRatio || 1;
		const rect = canvas.getBoundingClientRect();
		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;

		const context = canvas.getContext("2d");
		if (!context) return;
		context.scale(dpr, dpr);

		dimensionsRef.current = { width: rect.width, height: rect.height };
		initialGrowthRef.current = 0; // Reset growth on resize
	}, []);

	// --- REFINED GEOMETRIC DRAWING LOGIC ---
	const drawMandala = useCallback(
		(ctx: CanvasRenderingContext2D, time: number, growth: number) => {
			const { width, height } = dimensionsRef.current;
			const centerX = width / 2;
			const centerY = height / 2;
			const baseRadius = Math.min(width, height) * 0.05; // Smaller base for more dramatic growth

			const overallRadius = baseRadius + Math.min(width, height) * 0.4 * growth;

			ctx.clearRect(0, 0, width, height);
			ctx.fillStyle = config.fadeOutSpeed;
			ctx.fillRect(0, 0, width, height);

			ctx.shadowColor = "hsla(45, 100%, 50%, 0.3)";
			ctx.shadowBlur = 15;

			// Layer 5: Ethereal Outer Glow (Drawn First)
			if (growth > 0) {
				const glowGradient = ctx.createRadialGradient(
					centerX,
					centerY,
					overallRadius * 0.8,
					centerX,
					centerY,
					overallRadius * 1.2
				); // Expanded glow
				glowGradient.addColorStop(0, "hsla(45, 100%, 50%, 0.15)");
				glowGradient.addColorStop(1, "hsla(45, 100%, 50%, 0)");
				ctx.fillStyle = glowGradient;
				ctx.beginPath();
				ctx.arc(centerX, centerY, overallRadius * 1.2, 0, Math.PI * 2);
				ctx.fill();
			}

			// Layer 4: Main Outer Lotus Petals
			if (growth > 0.4) {
				const petalCount = 14;
				const petalBaseRadius = overallRadius * 0.1; // Starts where vortex ends
				const petalTipRadius = overallRadius * 0.7; // Extends to the edge
				ctx.globalAlpha = Math.min(1, (growth - 0.4) * 3);
				for (let i = 0; i < petalCount; i++) {
					const angle = (i / petalCount) * (Math.PI * 2) + time * 0.03;
					const startX = centerX + Math.cos(angle) * petalBaseRadius;
					const startY = centerY + Math.sin(angle) * petalBaseRadius;
					const endX = centerX + Math.cos(angle) * petalTipRadius;
					const endY = centerY + Math.sin(angle) * petalTipRadius;

					const controlAngle1 = angle - (Math.PI / petalCount) * 1.7;
					const controlAngle2 = angle + (Math.PI / petalCount) * 1.7;
					const controlRadius = (petalBaseRadius + petalTipRadius) / 2;
					const c1x = centerX + Math.cos(controlAngle1) * controlRadius;
					const c1y = centerY + Math.sin(controlAngle1) * controlRadius;
					const c2x = centerX + Math.cos(controlAngle2) * controlRadius;
					const c2y = centerY + Math.sin(controlAngle2) * controlRadius;

					const petalGradient = ctx.createLinearGradient(
						startX,
						startY,
						endX,
						endY
					);
					petalGradient.addColorStop(0, "hsla(45, 100%, 50%, 0.2)");
					petalGradient.addColorStop(0.7, "hsla(35, 100%, 50%, 0.8)");
					petalGradient.addColorStop(1, "hsla(348, 80%, 50%, 0.6)");
					ctx.fillStyle = petalGradient;

					ctx.beginPath();
					ctx.moveTo(startX, startY);
					ctx.quadraticCurveTo(c1x, c1y, endX, endY);
					ctx.quadraticCurveTo(c2x, c2y, startX, startY);
					ctx.fill();
				}
			}

			// Layer 3: Swirling Vortex Petals
			if (growth > 0.25) {
				const swirlCount = 12;
				const startRadius = overallRadius * 0.18; // Overlaps with inner petals
				const endRadius = overallRadius * 0.5;
				ctx.globalAlpha = Math.min(1, (growth - 0.25) * 4);

				for (let i = 0; i < swirlCount; i++) {
					const angle = (i / swirlCount) * (Math.PI * 2) - time * 0.08;
					const startX = centerX + Math.cos(angle) * startRadius;
					const startY = centerY + Math.sin(angle) * startRadius;
					const endX = centerX + Math.cos(angle) * endRadius;
					const endY = centerY + Math.sin(angle) * endRadius;

					const controlAngle1 = angle + Math.PI / 8;
					const controlAngle2 = angle - Math.PI / 8;
					const controlRadius = (startRadius + endRadius) / 2;
					const c1x = centerX + Math.cos(controlAngle1) * controlRadius;
					const c1y = centerY + Math.sin(controlAngle1) * controlRadius;
					const c2x = centerX + Math.cos(controlAngle2) * controlRadius;
					const c2y = centerY + Math.sin(controlAngle2) * controlRadius;

					const petalGradient = ctx.createLinearGradient(
						startX,
						startY,
						endX,
						endY
					);
					petalGradient.addColorStop(0, "hsla(45, 100%, 50%, 0.2)");
					petalGradient.addColorStop(1, "hsla(45, 100%, 50%, 0.7)");
					ctx.fillStyle = petalGradient;

					ctx.beginPath();
					ctx.moveTo(startX, startY);
					ctx.quadraticCurveTo(c1x, c1y, endX, endY);
					ctx.quadraticCurveTo(c2x, c2y, startX, startY);
					ctx.fill();
				}
			}

			// Layer 2: Inner Lotus Petals
			if (growth > 0.1) {
				const petalCount = 10;
				const petalLength = overallRadius * 0.3;
				ctx.save();
				ctx.translate(centerX, centerY);
				ctx.rotate(time * 0.05);
				ctx.globalAlpha = Math.min(1, (growth - 0.1) * 5);
				for (let i = 0; i < petalCount; i++) {
					const petalGradient = ctx.createRadialGradient(
						0,
						0,
						0,
						0,
						0,
						petalLength
					);
					petalGradient.addColorStop(0, "hsla(348, 80%, 50%, 0.9)");
					petalGradient.addColorStop(1, "hsla(30, 100%, 50%, 0.6)");
					ctx.fillStyle = petalGradient;

					ctx.beginPath();
					ctx.moveTo(0, 0);
					ctx.quadraticCurveTo(
						petalLength * 0.5,
						-petalLength * 0.5,
						petalLength,
						0
					);
					ctx.quadraticCurveTo(petalLength * 0.5, petalLength * 0.5, 0, 0);
					ctx.fill();
					ctx.rotate((Math.PI * 2) / petalCount);
				}
				ctx.restore();
			}

			// Layer 1: Central Fiery Core (Drawn Last)
			const coreGradient = ctx.createRadialGradient(
				centerX,
				centerY,
				1,
				centerX,
				centerY,
				12
			);
			coreGradient.addColorStop(0, "hsla(0, 100%, 90%, 1)"); // White hot center
			coreGradient.addColorStop(0.3, "hsla(348, 100%, 70%, 1)"); // Crimson
			coreGradient.addColorStop(1, "hsla(348, 100%, 50%, 0)");
			ctx.fillStyle = coreGradient;
			ctx.beginPath();
			ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
			ctx.fill();

			// --- Reset glow for next frame ---
			ctx.shadowBlur = 0;
			ctx.globalAlpha = 1;
		},
		[]
	);

	const animate = useCallback(
		(time: number) => {
			const canvas = canvasRef.current;
			const context = canvas?.getContext("2d");
			if (!context || !canvas) return;

			if (initialGrowthRef.current < 0.25) {
				initialGrowthRef.current += 0.005;
			}

			const scrollGrowth = scrollProgressRef.current * 0.75;
			const totalGrowth = Math.min(initialGrowthRef.current + scrollGrowth, 1);

			drawMandala(context, time * 0.001, totalGrowth);

			animationFrameIdRef.current = requestAnimationFrame(animate);
		},
		[drawMandala]
	);

	// --- FIX: Decoupled useEffect hooks to prevent race conditions ---

	// Effect 1: Sets the `hasStarted` flag once the app is ready.
	useEffect(() => {
		if (isAppReady) {
			setHasStarted(true);
		}
	}, [isAppReady]);

	// Effect 2: Manages the animation lifecycle based on the `hasStarted` flag.
	useEffect(() => {
		// This block runs only when `hasStarted` becomes true.
		if (hasStarted) {
			initCanvas();
			animationFrameIdRef.current = requestAnimationFrame(animate);

			const handleResize = () => initCanvas();
			window.addEventListener("resize", handleResize);

			// This cleanup function will now only run when the component unmounts.
			return () => {
				if (animationFrameIdRef.current) {
					cancelAnimationFrame(animationFrameIdRef.current);
				}
				window.removeEventListener("resize", handleResize);
			};
		}
	}, [hasStarted, initCanvas, animate]);

	return (
		<canvas
			ref={canvasRef}
			id="mandala-canvas"
			className={`fixed top-0 left-0 w-full h-full -z-10 pointer-events-none transition-opacity duration-1000 ${hasStarted ? `opacity-${Math.floor(config.opacity * 100)}` : "opacity-0"}`}
		/>
	);
};

export default MandalaCanvas;
