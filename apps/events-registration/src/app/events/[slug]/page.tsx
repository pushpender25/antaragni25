"use client";

import { doc, getSingleDoc } from "@repo/firebase";
import { EventDetails } from "./EventDetails";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useStore } from "@repo/store";

const IndividualEventPage = () => {
	const params = useParams<{ slug: string }>();
	const [eventData, setEventData] = useState<doc | null>(null);
	const { setLoading } = useStore();

	const fetchData = async () => {
		setLoading(true);
		let data;
		if (params.slug === "ritambhara") {
			data = await getSingleDoc("WebContentsNew", `events_ritambhara_New`);
		} else {
			data = await getSingleDoc("WebContentsNew", `events_${params.slug}`);
		}
		if (data) {
			setLoading(false);
		}
		setEventData(data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		eventData && (
			<section className="min-h-screen pt-16 pb-10">
				<div className="container mx-auto px-6">
					<div className="text-center mb-12">
						<p className="text-lg font-semibold uppercase tracking-widest text-secondary">
							{eventData.category}
						</p>
						<h1 className="font-title text-6xl md:!text-8xl text-primary mt-2">
							{eventData.title}
						</h1>
					</div>

					<EventDetails eventData={eventData} slug={params.slug} />
				</div>
			</section>
		)
	);
};

export default IndividualEventPage;
