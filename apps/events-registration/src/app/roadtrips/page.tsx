import { StaggeredFadeIn } from "../../components/FadeIn";
import { Card } from "@repo/ui/event-card";
import { roadtrips } from "../../data/roadtrips";

const RoadTripsPage = () => {
	return (
		<section className="min-h-screen pt-32 pb-20">
			<div className="container mx-auto px-6 text-center">
				<h1 className="font-title text-5xl md:text-7xl text-primary">
					Roadtrips
				</h1>
				<p className="text-lg text-secondary mt-2 max-w-2xl mx-auto">
					The fire spreads across the nation. Witness the preliminary battles
					that forge the legends of Antaragni.
				</p>

				<StaggeredFadeIn>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
						{roadtrips.map((roadtrip) => (
							<Card
								key={roadtrip.slug}
								href={`/roadtrips/${roadtrip.slug}`}
								title={roadtrip.title}
								subtitle={roadtrip.category}
								imageUrl={roadtrip.imageUrl}
							/>
						))}
					</div>
				</StaggeredFadeIn>
			</div>
		</section>
	);
};

export default RoadTripsPage;
