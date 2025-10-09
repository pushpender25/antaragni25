import { ContactItem } from "@repo/model";
import { MdEmail } from "react-icons/md";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import Image from "next/image";

export function ContactCard({
	contact,
	className,
}: {
	contact: ContactItem;
	className: string;
}) {
	return (
		<div
			className={`h-[40vh] min-h-[350px] lg:!h-[35vh] w-60 m-4 overflow-hidden text-lg ${className} hover:scale-105 hover:rounded-lg transition-transform-[var(--ease-in-cubic)] border-1 border-[var(--pink)] bg-[var(--red-light)] duration-200 flex flex-col items-center justify-center `}
			data-cursor="pointer"
		>
			<div className="img h-[90%] flex items-center justify-center">
				<div className="rounded-full border-1 border-[var(--red)] bg-[var(--red-transparent)]">
					<Image
						src={contact.image}
						className="h-35 w-35 rounded-full bg-contain"
						alt=""
						width={150}
						height={150}
					/>
				</div>
			</div>
			<div className="info h-full flex flex-col gap-0.5 items-center justify-center text-[var(--white)]">
				<div className="name font-bold text-xl">{contact.name}</div>
				<div className="post">Organizer</div>
				<div className="dept">Hospitality and Transport</div>
				<a
					className="contact"
					href={`tel:${contact.contact}`}
					target="_blank"
					rel="noreferrer"
				>
					Mobile: {contact.contact}
				</a>
				<div className="socials flex gap-5 justify-evenly items-center">
					<a
						href={`mailto: hospitality@antaragni.in`}
						target="_blank"
						rel="noreferrer"
					>
						<MdEmail size={33} />
					</a>
					<a href={contact.insta} target="_blank" rel="noreferrer">
						<BsInstagram size={25} />
					</a>
					<a href={contact.linkedin} target="_blank" rel="noreferrer">
						<BsLinkedin size={25} />
					</a>
				</div>
			</div>
		</div>
	);
}
