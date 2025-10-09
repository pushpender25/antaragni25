/* eslint-disable @next/next/no-img-element */
"use client";

import { JSX, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Gallery from "./galleryHome";
import Aftermovies from "./aboutHome";
import AftermoviesMob from "./aboutHomeMob";
import Contact from "./ContactUsHome";
import { Cinzel } from "next/font/google";
import { Henny_Penny } from "next/font/google";
import { FaWhatsapp } from "react-icons/fa";
import ThemeReveal from "./ThemeReveal";
import Footer from "./footer";
import { useStore } from "@repo/store";
import { useWindowSize } from 'react-use'

const henny = Henny_Penny({
	subsets: ["latin"],
	weight: ["400"],
	style: ["normal"],
});

const cinzel = Cinzel({
	subsets: ["latin"],
});

gsap.registerPlugin(ScrollTrigger);

const sceneConfigs = {
	dayToCave: {
		frameCount: 96,
		path: (frame: number) =>
			`/frames/1st/frame${((frame-1)*2 + 1).toString().padStart(4, "0")}.jpg`,
	},
	caveToLight: {
		frameCount: 96,
		path: (frame: number) =>
			`/frames/2nd/frame${((frame-1)*2 + 1).toString().padStart(4, "0")}.jpg`,
	},
	lightToDark: {
		frameCount: 96,
		path: (frame: number) =>
			`/frames/3rd/frame${((frame-1)*2 + 1).toString().padStart(4, "0")}.jpg`,
	},
	darkToNight: {
		frameCount: 96,
		path: (frame: number) =>
			`/frames/4th/frame${((frame-1)*2 + 1).toString().padStart(4, "0")}.jpg`,
	},
};

const Logo = (): JSX.Element => (
	<div
		className="scene-content w-full max-w-xl mx-auto"
		style={{ willChange: "transform, opacity" }}
	>
		<img
			src="/title.png"
			alt="Antaragni 2025 Logo"
			className="w-full h-auto drop-shadow-[0_0_20px_rgba(255,215,0,0.7)]"
		/>
	</div>
);
const ThemeInfo = (): JSX.Element => (
	<div className="scene-content mx-5 my-4 p-8 max-w-3xl bg-black/50 backdrop-blur-lg border border-yellow-400/30 rounded-xl shadow-2xl ">
		<h2 className="text-2xl md:text-6xl text-center font-bold text-yellow-300 mb-4">
			Kanreki&apos;s Oraculum
		</h2>

		<p className=" text-center text-gray-200">
			Beneath October’s restless skies, Antaragni rises once more—its flame
			unbroken through sixty radiant years.
			<br />
			<br />
			From the mists of time, two eternal figures emerge: the wizard of light,
			weaving brilliance and creation, and the master of shadow, conjuring chaos
			and doubt. Their duel is timeless, and Antaragni becomes their
			battlefield.
			<br />
			<br />
			Here, art is magic. Every beat, every step, every verse is a spell cast in
			this eternal war. Performers do not just take the stage—they step into
			legend, channeling the fire within.
			<br />
			<br />
			High above watches Kanreki, the silent scribe of sixty cycles. Keeper of
			the tale, it whispers not in words but in omens—sparks passed from one era
			to the next.
			<br />
			<br />
			This year, the fire does not return. It renews. And the battle of light
			and shadow begins again.
		</p>
	</div>
);

const ThemeInfoMob = (): JSX.Element => <ThemeReveal />;
const WizardInfo = ({
	name,
	description,
	type,
}: {
	name: string;
	description: string;
	type: "light" | "dark";
}): JSX.Element => (
	<div
		className={`scene-content mx-2 mt-16 p-4 max-w-3xl bg-black/50 backdrop-blur-[2px] border shadow-2xl ${
			type === "light" ?
				`border-yellow-400/30 ${cinzel.className}`
			:	`border-purple-400/30 ${henny.className}`
		} rounded-xl`}
	>
		<h2
			className={`text-2xl md:text-6xl text-center font-bold  ${
				type === "light" ? "text-yellow-300" : "text-purple-400"
			} mb-4`}
		>
			{name}
		</h2>
		<p className=" text-center text-gray-200">{description}</p>
	</div>
);

const AntLogo = (): JSX.Element => (
	<img
		src="/antaragni.jpeg"
		alt="Antaragni Logo"
		className="fixed bottom-4 right-4 w-15 md:w-25 lg:w-28 z-[30000] opacity-100 drop-shadow-lg rounded-lg"
	/>
);

const ContactSection = (): JSX.Element => (
	<div className="scene-content w-full overflow-hidden flex flex-col items-center justify-start py-12 md:py-20">
		<div className="absolute mt-[5%] w-full" />

		<div className="w-11/12 max-w-5xl mx-auto backdrop-blur-md bg-black/30 p-6 md:p-10 rounded-2xl shadow-deep border border-white/5  transition-all duration-300 hover:shadow-deep-lg mt-[4%]">
			<h2 className="text-2xl md:text-6xl font-bold text-white text-center drop-shadow-lg mb-2">
				Join the Community
			</h2>
			<div className="flex flex-col md:flex-row gap-4 md:gap-12 items-center">
				<div className="flex-1 text-white">
					<h2 className="text-l text-center md:text-2xl font-bold mb-2 ">
						Welcome to Antaragni - IIT Kanpur&apos;s Cultural Fest!
					</h2>
					<p className="text-md md:text-xl text-center leading-relaxed text-gray-200">
						Stay tuned for all the latest updates, event announcements, and
						exclusive content related to Antaragni, our annual cultural
						extravaganza. Join us in celebrating creativity, talent, and the
						vibrant spirit of campus life. Don&apos;t miss out on any of the action.
						<strong className=" block mt-2">
							This is where the magic happens!
						</strong>
					</p>
					<div className="mt-[10%] flex justify-center md:justify-center">
						<a href="https://whatsapp.com/channel/0029Vak8LmD9mrGWHTsPIR3r">
							<button className="flex items-center gap-2 border border-pink-400 text-pink-400 font-bold px-6 py-2 rounded-2xl hover:bg-pink-400 hover:text-black transition-all duration-300 cursor-pointer">
								<FaWhatsapp className="text-lg" />
								Join WhatsApp Channel
							</button>
						</a>
					</div>
				</div>
				<div className="flex-1 w-full md:w-full relative p-6 bg-black/20 backdrop-blur-xl rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8),_0_0_15px_rgba(56,161,105,0.4)]">
					<div className="aspect-video w-full rounded-xl overflow-hidden ">
						<img
							src="/contact.jpg"
							alt="A singer performing live on stage with dramatic lighting"
							className="w-full h-full object-cover transition-[transform,filter] duration-500 hover:scale-[1.03] hover:brightness-110 hover:contrast-110"
							onError={(e) => {
								e.currentTarget.onerror = null;
								e.currentTarget.src = "/contact.jpg";
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
);

const GrainOverlay = () => (
    <div 
        className="fixed top-0 left-0 h-screen w-screen pointer-events-none z-10"
        style={{
            backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOCIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiLz48L3N2Zz4=)',
            opacity: 0.07,
            animation: 'grain 8s steps(10) infinite',
        }}
    />
  );


export function Hero() {
	const mainRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const canvasRefs = {
		dayToCave: useRef<HTMLCanvasElement>(null),
		caveToLight: useRef<HTMLCanvasElement>(null),
		lightToDark: useRef<HTMLCanvasElement>(null),
		darkToNight: useRef<HTMLCanvasElement>(null),
	};

    const {width} = useWindowSize()

    const {imagesLoaded, setImagesLoaded} = useStore();
	const [isMobile, setIsMobile] = useState(width < 768);
	const imageSequences = useRef<{ [key: string]: HTMLImageElement[] }>({
		dayToCave: [],
		caveToLight: [],
		lightToDark: [],
		darkToNight: [],
	});

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 768);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	useEffect(() => {
		if (isMobile) {
			setImagesLoaded(true);
			return;
		}

		const loadImages = async () => {
			const promises = Object.keys(sceneConfigs).flatMap((key) => {
				const config = sceneConfigs[key as keyof typeof sceneConfigs];
				const sequencePromises: Promise<HTMLImageElement>[] = [];
				for (let i = 1; i <= config.frameCount; i++) {
					sequencePromises.push(
						new Promise<HTMLImageElement>((resolve) => {
							const img = new window.Image();
							img.src = config.path(i);
							img.onload = () => resolve(img);
							img.onerror = () => resolve(img);
						})
					);
				}
				return sequencePromises;
			});
			const loadedImages = await Promise.all(promises);
			let offset = 0;
			Object.keys(sceneConfigs).forEach((key) => {
				const config = sceneConfigs[key as keyof typeof sceneConfigs];
				imageSequences.current[key] = loadedImages.slice(
					offset,
					offset + config.frameCount
				);
				offset += config.frameCount;
			});
			setImagesLoaded(true);
		};
		loadImages();
	}, [isMobile]);

	useEffect(() => {
		if ((isMobile && mainRef.current) || (!isMobile && imagesLoaded)) {
			const lenis = new Lenis({lerp: 0.1});
			lenis.on("scroll", ScrollTrigger.update);
			const update = (time: number) => {
				lenis.raf(time * 1000);
			};
			gsap.ticker.add(update);
			gsap.ticker.lagSmoothing(0);

			const ctx = gsap.context(() => {
				if (isMobile) {
					const scenes = gsap.utils.toArray<HTMLElement>(".scene");
					scenes.forEach((scene) => {
						gsap.from(scene.querySelector(".scene-content"), {
							autoAlpha: 0,
							y: 50,
							scrollTrigger: {
								trigger: scene,
								start: "top 85%",
								end: "top 60%",
								scrub: 1,
							},
						});
					});
				} else {
					const setupCanvas = (canvas: HTMLCanvasElement | null) => {
						if (!canvas) return null;
						const context = canvas.getContext("2d");
						const dpr = window.devicePixelRatio || 1;
						canvas.width = window.innerWidth * dpr;
						canvas.height = window.innerHeight * dpr;
						canvas.style.width = `${window.innerWidth}px`;
						canvas.style.height = `${window.innerHeight}px`;
						context?.scale(dpr, dpr);
						return context;
					};
					const contexts = {
						dayToCave: setupCanvas(canvasRefs.dayToCave.current),
						caveToLight: setupCanvas(canvasRefs.caveToLight.current),
						lightToDark: setupCanvas(canvasRefs.lightToDark.current),
						darkToNight: setupCanvas(canvasRefs.darkToNight.current),
					};
					const renderFrame = (
						context: CanvasRenderingContext2D | null | undefined,
						image: HTMLImageElement | undefined
					) => {
						if (!image || !context) return;
						const dpr = window.devicePixelRatio || 1;
						context.clearRect(
							0,
							0,
							context.canvas.width,
							context.canvas.height
						);
						const canvasAspect = context.canvas.width / context.canvas.height;
						const imageAspect = image.width / image.height;
						let drawWidth, drawHeight, offsetX, offsetY;
						if (canvasAspect > imageAspect) {
							drawWidth = context.canvas.width / dpr;
							drawHeight = drawWidth / imageAspect;
							offsetX = 0;
							offsetY = (context.canvas.height / dpr - drawHeight) / 2;
						} else {
							drawHeight = context.canvas.height / dpr;
							drawWidth = drawHeight * imageAspect;
							offsetY = 0;
							offsetX = (context.canvas.width / dpr - drawWidth) / 2;
						}
						context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
					};
					Object.keys(canvasRefs).forEach((key) => {
						const typedKey = key as keyof typeof sceneConfigs;
						renderFrame(
							contexts[typedKey],
							imageSequences.current[typedKey]![0]
						);
					});
					const scenes = gsap.utils.toArray<HTMLElement>(".scene");
					gsap.set(wrapperRef.current, { height: `${scenes.length * 100}vh` });
					const ease = gsap.parseEase("power1.inOut");

					const handleResize = () => {
                        console.log("HI")
						Object.values(contexts).forEach((context) => {
							if (context && context.canvas) {
								const dpr = window.devicePixelRatio || 1;
								context.canvas.width = window.innerWidth * dpr;
								context.canvas.height = window.innerHeight * dpr;
								context.canvas.style.width = `${window.innerWidth}px`;
								context.canvas.style.height = `${window.innerHeight}px`;
								context.scale(dpr, dpr);
							}
						});
						ScrollTrigger.refresh(true); 
					};
					window.addEventListener("resize", handleResize);

					ScrollTrigger.create({
						trigger: wrapperRef.current,
						start: "top top",
						end: "bottom bottom",
						scrub: 1,
						pin: mainRef.current,
						onUpdate: (self) => {
							const progress = self.progress;
							const sceneLength = 1 / scenes.length;
							const activeSceneIndex = Math.min(
								scenes.length - 1,
								Math.floor(progress / sceneLength)
							);

							scenes.forEach((scene, index) => {
								const sceneStartProgress = index * sceneLength;
								const localProgress =
									(progress - sceneStartProgress) / sceneLength;
								const isActive = index === activeSceneIndex;

								gsap.set(scene, { autoAlpha: isActive ? 1 : 0 });

								const content = scene.querySelector(".scene-content");
								if (content) {
									let from = { autoAlpha: 0, y: 50, x: 0 };
									if (scene.classList.contains("scene-3"))
										from = { autoAlpha: 0, x: -100, y: 50 };
									if (scene.classList.contains("scene-5"))
										from = { autoAlpha: 0, x: 100, y: 50 };

									const fadeInEnd = 0.5;
									const fadeOutStart = 0.5;

									if (isActive) {
										if (index === scenes.length - 1) {
											const p = localProgress / fadeInEnd;
											gsap.set(content, {
												autoAlpha: p,
												y: from.y ? from.y * (1 - p) : 0,
												x: from.x ? from.x * (1 - p) : 0,
											});
										} else if (localProgress < fadeInEnd) {
											const p = localProgress / fadeInEnd;
											gsap.set(content, {
												autoAlpha: p,
												y: from.y ? from.y * (1 - p) : 0,
												x: from.x ? from.x * (1 - p) : 0,
											});
										} else if (localProgress > fadeOutStart) {
											const p =
												(localProgress - fadeOutStart) / (1 - fadeOutStart);
											gsap.set(content, { autoAlpha: 1 - p, y: -50 * p, x: 0 });
										} else {
											gsap.set(content, { autoAlpha: 1, y: 0, x: 0 });
										}
									}
								}
							});

							if (activeSceneIndex === 0) {
								const logoContent = scenes[0]!.querySelector(".scene-content");
								const localProgress = progress / sceneLength;
								gsap.set(logoContent, {
									autoAlpha: 1 - localProgress,
									z: -1000 * localProgress,
								});
							}

							const updateSequence = (
								sceneIndex: number,
								configKey: keyof typeof sceneConfigs
							) => {
								const startProgress = sceneLength * (sceneIndex - 1);
								if (
									progress >= startProgress &&
									progress < startProgress + sceneLength
								) {
									const localProgress =
										(progress - startProgress) / sceneLength;
									const easedProgress = ease(localProgress);
									const frameIndex = Math.floor(
										easedProgress * (sceneConfigs[configKey].frameCount - 1)
									);
									requestAnimationFrame(() => {
										if (imageSequences.current[configKey]?.[frameIndex])
											renderFrame(
												contexts[configKey],
												imageSequences.current[configKey][frameIndex]
											);
									});
								}
							};

							updateSequence(2, "dayToCave");
							updateSequence(3, "caveToLight");
							updateSequence(5, "lightToDark");
							updateSequence(7, "darkToNight");
						},
					});

					setTimeout(() => ScrollTrigger.refresh(), 100);
					return () => window.removeEventListener("resize", handleResize);
				}
			}, mainRef);
			return () => {
				gsap.ticker.remove(update);
				lenis.destroy();
				ctx.revert();
			};
		}
	}, [canvasRefs, imagesLoaded, isMobile]);

	if (isMobile) {
		return (
			<div className="bg-black text-white antialiased">
				<div ref={mainRef}>					
					<section className="scene scene-1 min-h-screen flex items-center justify-center relative">
						<img
							src="/first.png"
							alt="Daytime"
							className="absolute inset-0 w-full h-full object-cover"
						/>
						<div className="z-10">
							<Logo />
						</div>
					</section>

					<section className="scene scene-2 min-h-screen flex items-center justify-center relative">
						<img
							src="/second.png"
							alt="Cave"
							className="absolute inset-0 w-full h-full object-cover"
						/>
						<div className="z-10">
							<ThemeInfoMob />
						</div>
					</section>

					<section className="gradient-section  flex items-center justify-center relative">
						<div className="absolute inset-0 bg-[#030919]"></div>
					</section>

					<section className="scene scene-4 min-h-screen flex items-center justify-center bg-[#030919] relative">
						<div className="z-10">
							<AftermoviesMob />
						</div>
					</section>

					<section className="scene scene-6 min-h-screen flex items-center justify-center bg-[#030919] relative">
						<div className="z-10">
							<h1 className="text-5xl md:text-6xl font-karantina text-white tracking-[3px] pt-8 text-center drop-shadow-[0_4px_20px_rgba(252,155,155,1)]">
								GALLERY
							</h1>
							<Gallery />
						</div>
					</section>

					<section className="scene scene-8 min-h-screen flex items-center justify-center bg-[#030919] relative">
						<div className="z-10">
							<Contact />
						</div>
					</section>
					<section className="w-[100vw] flex items-center justify-center bg-black relative">
						<div className="z-10">
							<Footer />
						</div>
					</section>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-black text-white antialiased text-center">
			<div ref={wrapperRef} className="relative">
				<AntLogo />
				<div
					ref={mainRef}
					className={`h-screen w-screen fixed top-0 left-0 ${
						imagesLoaded ? "visible" : "invisible"
					}`}
					style={{ perspective: "1000px" }}
				>
                    {/* <GrainOverlay /> */}
					<section className="scene scene-1 absolute inset-0">
						<img
							src="/DIN.png"
							alt="Daytime"
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 flex items-center justify-center">
							<Logo />
						</div>
					</section>
					<section className="scene scene-2 absolute inset-0 opacity-0">
						<canvas ref={canvasRefs.dayToCave} />
						<div className="absolute inset-0 flex items-center justify-center">
							<ThemeInfo />
						</div>
					</section>
					<section className="scene scene-3 absolute inset-0 opacity-0">
						<canvas ref={canvasRefs.caveToLight} />
						<div className="absolute inset-0 flex items-center justify-start px-8 md:px-16 lg:px-32">
							<WizardInfo
								name="The Wizard of Light"
								description="The Wizard of Light embodies brilliance, creation, and renewal. Draped in radiant robes and wielding a staff of dawn, he channels Antaragni’s eternal flame into symphonies of dance, music, and verse. Each gesture weaves golden runes into living art, igniting the stage with hope and inspiration. Wherever he stands, shadows retreat, and imagination finds its purest form. He is the spark that transforms performance into legend."
								type="light"
							/>
						</div>
					</section>
					<section className="scene scene-4 absolute inset-0 opacity-0">
						<img
							src="/FIRST_LOCATION.png"
							alt="Light Wizard"
							className="w-full h-full object-cover"
						/>
						<div className="scene-content absolute inset-0 flex items-center justify-center">
							<Aftermovies />
						</div>
					</section>
					<section className="scene scene-5 absolute inset-0 opacity-0">
						<canvas ref={canvasRefs.lightToDark} />
						<div className="absolute inset-0 flex items-center justify-end px-8 md:px-16 lg:px-32">
							<WizardInfo
								name="Wizard of Darkness"
								description="The Wizard of Darkness is the embodiment of chaos and doubt. Cloaked in violet shadows, he conjures illusions, twisting harmony into discord and testing every spark of creation. His power is not mere destruction but challenge—the storm that forces light to burn brighter. In his presence, performers confront their fears and rise above them, turning every act into a triumph of fire against the void."
								type="dark"
							/>
						</div>
					</section>
					<section className="scene scene-6 absolute inset-0 opacity-0">
						<img
							src="/Second location.png"
							alt="Dark Wizard"
							className="w-full h-full object-cover"
						/>
						<div className="absolute scene-content inset-0 flex items-center justify-center">
							<Gallery />
						</div>
					</section>
					<section className="scene scene-7 absolute inset-0 opacity-0">
						<canvas ref={canvasRefs.darkToNight} />
					</section>
					<section className="scene scene-8 absolute inset-0 opacity-0">
						<img
							src="/RAAT.png"
							alt="Nighttime"
							className="w-full h-full object-cover brightness-50"
						/>
						<div className="absolute inset-0 flex items-center justify-center">
							<ContactSection />
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
