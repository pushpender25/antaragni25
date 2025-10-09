import { outreachPartners, goodiesPartners, travellingPartner } from "../app/data";
import  SponsorCard  from "@repo/ui/sponsorCard"

export default function Sponsors() {
	return (
		<div className="mx-auto max-w-7xl px-6 lg:px-8 mt-5 py-4">
			<div className="mx-auto max-w-3xl text-center">
				<h2 className="heading uppercase text-3xl md:!text-5xl lg:!text-6xl text-center tracking-tight border-b-2 border-[var(--pink)] w-fit mx-auto mt-15">
					Our Valued Supporters
				</h2>
				<p className="mt-4 text-lg leading-8 text-gray-300">
					We are incredibly grateful to our sponsors and partners who make our
					work possible.
				</p>
			</div>

			<div className="mt-16">
				<h3 className="mb-10 text-center text-2xl font-semibold leading-8 text-gray-300">
					Outreach Partners
				</h3>
				<div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 lg:mx-0 lg:max-w-none">
					{outreachPartners.map((sponsor, index) => (
						<SponsorCard
							key={`outreach-${sponsor.name}`}
							sponsor={sponsor}
							index={index}
						/>
					))}
				</div>
			</div>

			<div className="mt-20">
				<h3 className="mb-10 text-center text-2xl font-semibold leading-8 text-gray-300">
					Goodies Partners
				</h3>
				<div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 lg:mx-0 lg:max-w-none">
					{goodiesPartners.map((sponsor, index) => (
						<SponsorCard
							key={`goodie-${sponsor.name}`}
							sponsor={sponsor}
							index={index}
						/>
					))}
				</div>
			</div>
			<div className="mt-20">
				<h3 className="mb-10 text-center text-2xl font-semibold leading-8 text-gray-300">
					Travelling Partner
				</h3>
				<div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 lg:mx-0 lg:max-w-none">
					<div className="hidden sm:flex"></div>
					{travellingPartner.map((sponsor, index) => (
						<SponsorCard
							key={`goodie-${sponsor.name}`}
							sponsor={sponsor}
							index={index}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
