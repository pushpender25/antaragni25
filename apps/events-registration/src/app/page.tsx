import { Section } from "@repo/ui/section";
import LandingPage from "../components/LandingPage";
import { Events } from "../components/Events";
import { Contact } from "../components/Contact";
import { Carousel } from "@repo/ui/carousel";



export default function Home() {
	return (
		<>
			<Section className="h-screen">
				<LandingPage/>
			</Section>
			<Section className="">
				<Events />
			</Section>
			<Section className="h-fit">
				<Contact />
			</Section>
		</>
	);
}
