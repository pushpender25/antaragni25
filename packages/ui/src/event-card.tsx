import Link from "next/link";
import Image from "next/image";

interface CardProps {
	href: string;
	title: string;
	subtitle: string;
	imageUrl: string;
	newTab?: boolean;
}

export function Card({
	href,
	title,
	subtitle,
	imageUrl,
	newTab = false,
}: CardProps) {
	return (
		<Link
			href={href}
			className="group relative block w-full h-96 overflow-hidden rounded-lg shadow-lg"
			target={newTab ? "_blank" : "_self"}
		>
			<img
				src={imageUrl}
				alt={title}
				width={600}
				height={800}
				className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
			<div className="absolute bottom-0 left-0 p-6 transition-transform duration-500 ease-in-out group-hover:-translate-y-2">
				{/* <p className="text-sm font-semibold uppercase tracking-widest text-secondary">
					{subtitle}
				</p> */}
				<h3 className="mt-2 text-3xl font-title font-bold text-foreground">
					{title}
				</h3>
			</div>
		</Link>
	);
}
