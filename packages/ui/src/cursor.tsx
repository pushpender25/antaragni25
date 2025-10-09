"use client";

import cn from "clsx";
import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function Cursor({ color }: { color?: string }) {
	const pathname = usePathname();
	const cursor = useRef<HTMLInputElement>(null);
	const [isPointer, setIsPointer] = useState<boolean>(false);
	const [hasMoved, setHasMoved] = useState<boolean>(false);

	const onMouseMove = useCallback(
		({ clientX, clientY }: { clientX: number; clientY: number }) => {
			gsap.to(cursor.current, {
				x: clientX,
				y: clientY,
				duration: hasMoved ? 0.6 : 0,
				ease: "expo.out",
			});
			setHasMoved(true);
		},
		[hasMoved]
	);

	useEffect(() => {
		window.addEventListener("mousemove", onMouseMove, false);

		return () => {
			window.removeEventListener("mousemove", onMouseMove, false);
		};
	}, [hasMoved, onMouseMove]);

	useEffect(() => {
		setIsPointer(false);
		const onMouseEnter = () => {
			setIsPointer(true);
		};
		const onMouseLeave = () => {
			setIsPointer(false);
		};

		const attachListeners = () => {
			const elements = [
				...document.querySelectorAll(
					"button,a,input,label,[data-cursor='pointer']"
				),
			];

			elements.forEach((element) => {
				element.addEventListener("mouseenter", onMouseEnter, false);
				element.addEventListener("mouseleave", onMouseLeave, false);
			});

			return () => {
				elements.forEach((element) => {
					element.removeEventListener("mouseenter", onMouseEnter, false);
					element.removeEventListener("mouseleave", onMouseLeave, false);
				});
			};
		};

		const detach = attachListeners();

		const observer = new MutationObserver(() => {
			detach();
			attachListeners();
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});

		return () => {
			observer.disconnect();
			detach();
		};
	}, [pathname]);

	return (
		<div className="fixed top-0 left-0 h-screen w-[100%] z-[10000] overflow-hidden pointer-events-none [@media(hover:none)]:hidden">
			<div className="" ref={cursor}>
				<div
					className={cn(
						"absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-[2px]  w-10 h-10 opacity-40 transition-transform duration-[600ms] ease-[var(--ease-out-expo)]",
						color ? "border-[var(--color-primary)]" : "border-[var(--pink)]",
						isPointer && (color ?
							"-translate-x-1/2 -translate-y-1/2 scale-50 bg-[var(--color-primary)]"
						:	"-translate-x-1/2 -translate-y-1/2 scale-50 bg-[var(--pink)]")
					)}
				></div>
			</div>
		</div>
	);
}
