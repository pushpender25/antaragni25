"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useStore } from "@repo/store";
import {
	firebaseGetUser,
	firebaseGoogleSignIn,
	firebaseLogout,
} from "@repo/firebase";

gsap.registerPlugin(useGSAP);

export function Hero() {
	const containerRef = useRef<HTMLDivElement>(null);
	const pathname = usePathname();
	const { user, setUser, setLoading } = useStore();

	useGSAP(
		() => {
			const tl = gsap.timeline({
				defaults: { duration: 1, ease: "power4.out" },
			});

			tl.from(".line-1", { y: 100, opacity: 0, delay: 0.2 })
				.from(".line-2", { y: 100, opacity: 0 }, "-=0.8")
				.from(".sub-heading", { y: 50, opacity: 0 }, "-=0.7")
				.from(".cta-button", { scale: 0.5, opacity: 0 }, "-=0.8");
		},
		{ scope: containerRef, dependencies: [pathname], revertOnUpdate: true }
	);

	const handleLogin = async () => {
		if (!user) {
			const result = await firebaseGoogleSignIn();
			if (result) {
				await firebaseGetUser("CAs25", setUser, setLoading);
			}
		} else {
			await firebaseLogout(setUser);
			
		}
	};

	return (
		<div
			ref={containerRef}
			className="w-full min-h-screen flex flex-col items-center justify-center text-center text-white p-4 overflow-hidden"
		>
			<div className="h-fit">
				<h1 className="uppercase font-extrabold tracking-tight">
					<div className="overflow-hidden">
						<div className="line-1 text-2xl sm:!text-3xl md:!text-4xl lg:!text-5xl xl:!text-6xl heading">Antaragni</div>
					</div>
					<div className="">
						<div className="line-2 text-2xl sm:!text-4xl md:!text-5xl lg:!text-6xl xl:!text-7xl heading">Campus Ambassador Program</div>
					</div>
				</h1>
			</div>

			<p className="sub-heading text-lg md:!text-2xl mt-8 md:!mt-12 max-w-2xl text-gray-300">
				Join our exclusive program and become the face of North India&apos;s
				largest cultural festival at your college.
			</p>

			<div className="cta-button mt-8">
				{!user && (
					<button
						className="bg-[var(--pink)] text-white font-bold py-3 px-8 rounded-full text-lg transition-transform duration-300 ease-in-out hover:scale-105"
						data-cursor="pointer"
						onClick={handleLogin}
					>
						Join Us Now
					</button>
				)}
			</div>
		</div>
	);
}
