// @repo/ui/LenisProvider.tsx
"use client";

import Lenis from "lenis";
import { useEffect, useState } from "react";
import { useStore } from "@repo/store";
import { useLenisScroll } from "./useLenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
	const setLenis = useStore((state) => state.setLenis);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
		setLenis(lenis);
		setReady(true); 
		return () => lenis.destroy();
	}, []);

	useLenisScroll(); 

	if (!ready) return null; 
	return <>{children}</>;
}
