import { ContactCard } from "@repo/ui/contact-card";
import { contacts } from "../app/data";

export function Contact() {
	return (
		<div className="flex flex-col items-center justify-start flex-wrap gap-4 p-4 w-full backdrop-blur-lg">
			<div className="heading uppercase text-4xl md:!text-6xl lg:!text-7xl text-center border-b-2 border-[var(--pink)] w-fit mx-auto mt-15">
				Contact Us
			</div>
			<div className="flex items-center justify-center flex-wrap gap-4 p-4">
				{contacts.map((contact, index) => {
					return (
						<ContactCard key={index} contact={contact} className="" />
					);
				})}
			</div>
		</div>
	);
}
