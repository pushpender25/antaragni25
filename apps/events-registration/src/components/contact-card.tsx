"use client";

import { ContactItem } from "@repo/model";
import { MdEmail } from "react-icons/md";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import Image from "next/image";
import { cn } from "@repo/ui/util";

export interface ContactCardProps {
	contact: ContactItem;
	className?: string;
}

export function ContactCard({ contact, className }: ContactCardProps) {
	return (
		<div
			className={cn(
				"relative group h-[40vh] min-h-[350px] lg:!h-[35vh] w-60 m-4 overflow-hidden text-lg hover:scale-105 hover:rounded-lg transition-transform duration-300 flex flex-col items-center justify-center border border-primary/20 bg-foreground/5",
				className
			)}
			data-cursor="pointer"
		>
			<div className=" img h-[55%] flex items-center justify-center">
				<div className="rounded-full p-1 bg-gradient-to-br from-primary to-accent">
					<Image
						src={contact.image}
						className="h-36 w-36 rounded-full bg-contain "
						alt={contact.name}
						width={150}
						height={150}
					/>
				</div>
			</div>
			<div className="info h-[45%] flex flex-col gap-0.5 items-center justify-center text-center px-2 text-foreground">
				<div className="name font-bold text-xl text-secondary">
					{contact.name}
				</div>
				<div className="post text-sm">{"Organizer"}</div>
				<div className="dept text-xs opacity-70">
					{"Hospitality and Transport"}
				</div>
				<a
					className="contact text-sm mt-1 hover:text-primary"
					href={`tel:${contact.contact}`}
				>
					{contact.contact}
				</a>
				<div className="socials flex gap-5 justify-evenly items-center mt-2">
					<a
						href={`mailto:${"hospitality@antaragni.in"}`}
						target="_blank"
						rel="noreferrer"
						className="hover:text-primary transition-colors"
					>
						<MdEmail size={28} />
					</a>
					<a
						href={contact.insta}
						target="_blank"
						rel="noreferrer"
						className="hover:text-primary transition-colors"
					>
						<BsInstagram size={22} />
					</a>
					<a
						href={contact.linkedin}
						target="_blank"
						rel="noreferrer"
						className="hover:text-primary transition-colors"
					>
						<BsLinkedin size={22} />
					</a>
				</div>
			</div>
		</div>
	);
}
