"use client";

import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Why } from "../components/Why";
import { Incentives } from "../components/Incentives";
import { Section } from "@repo/ui/section";
import { Responsibilities } from "../components/Responsibilities";
import { Contact } from "../components/Contact";
import { ScrollRefresh } from "@repo/ui/scrollRefresh";
import FAQ from "../components/FAQ";
import Sponsors from "../components/Sponsors";

export default function Home() {
	return (
		<div className="w-screen">
			<Section className="flex flex-col items-center justify-center h-screen">
				<Hero />
			</Section>
			<Section spacer={30} id="about">
				<About />
			</Section>
			<Section spacer={30} id="why">
				<Why />
			</Section>
			<Section spacer={30} id="incentives">
				<Incentives />
			</Section>
			<Section id="responsibilities">
				<Responsibilities />
			</Section>
			<Section id="faq">
				<FAQ />
			</Section>
			<Section id="contacts">
				<Contact />
			</Section>
			<Section id="sponsors">
				<Sponsors />
			</Section>
			<ScrollRefresh />
		</div>
	);
}
