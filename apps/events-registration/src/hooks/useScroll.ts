import { useStore } from "@repo/store";
import { useEffect } from "react";

export type ScrollCallback = (args: any) => void;

export function useScroll(
	callback: ScrollCallback,
	deps: unknown[] = []
): void {
	const lenis = useStore(({ lenis }) => lenis);

	useEffect(() => {
		if (!lenis) return;
		lenis.on("scroll", callback);

		return () => {
			lenis.off("scroll", callback);
		};
	}, [lenis, callback, ...deps]);
}
