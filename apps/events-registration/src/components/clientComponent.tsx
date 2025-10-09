"use client";
import { ReactNode } from "react";
import { useStore } from "@repo/store";
import { InitialState } from "@repo/firebase";
import { Loader } from "@repo/ui/loader";
import SessionLoader from "./SessionLoader";
import MandalaCanvas from "./Mandala";
import Header from "./Header";
import { Background } from "./Background";
import Footer from "./Footer";

export function ClientComponent({ children }: { children: ReactNode }) {
	const { initialAnimation, loading } = useStore();
	const showSessionLoader = loading && !initialAnimation;

	return (
		<>
			<InitialState document="eventsUsers2025" />
			{initialAnimation && <Loader type={2} />}
			{showSessionLoader && <SessionLoader />}
			<div className="fixed top-0 left-0 h-screen right-0 pointer-events-none">
				<Background />
			</div>
			{/* <MandalaCanvas /> */}
			<div className="relative z-10">
				<Header />
				<main>{children}</main>
				<Footer />
			</div>
		</>
	);
}
