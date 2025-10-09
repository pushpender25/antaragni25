import Image from "next/image";

export function Card({
	title,
	content,
	icon,
}: {
	title: string;
	content: string;
	icon?: string;
}) {
	return (
		<div className="card border-2 h-[60vh] max-h-[300px] md:!max-h-[350px] lg:!max-h-[450px] w-[80vw] md:!w-[50vw] lg:!w-[40vw] xl:!w-[30vw] flex flex-col justify-between items-start text-center m-[1vw] bg-[var(--white-transparent)] backdrop-blur-lg shrink-0 text-[var(--white)]">
			<div className="text-4xl md:!text-5xl lg:!text-6xl xl:!text-6xl text-[var(--pink)] p-5 w-full">
				{title}
			</div>
			<div className="w-full flex items-center justify-center">
				{icon && <Image src={icon} alt="icon" height={60} width={60} />}
			</div>
			<div className="text-xl text-gray-300 lg:!text-3xl p-5 font-serif">
				{content}
			</div>
		</div>
	);
}
