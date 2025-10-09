import { SponsorItem } from "@repo/model";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "./util";

export default function SponsorCard({
	sponsor,
	index,
}: {
	sponsor: SponsorItem;
	index: number;
}) {
	const cardRef = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry && entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(entry.target);
				}
			},
			{
				threshold: 0.1,
			}
		);

		const currentRef = cardRef.current;
		if (currentRef) {
			observer.observe(currentRef);
		}
		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, []);

	return (
		<div
			ref={cardRef}
			className={cn(
				`transform transition-all duration-700 ease-out border-t-2 border-[var(--pink)] rounded-xl hover:-translate-y-2 $`,
				isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
			)}
			style={{ transitionDelay: `${index * 100}ms` }}
		>
			<a
				href={sponsor.url}
				target="_blank"
				rel="noopener noreferrer"
				className="group flex h-full items-center justify-center rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
			>
				<Image
					src={sponsor.image}
					alt={`${sponsor.name} Logo`}
					width={150}
					height={75}
					className="h-full w-full max-w-[150px] object-contain opacity-70 grayscale-[50%] transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
				/>
			</a>
		</div>
	);
}
