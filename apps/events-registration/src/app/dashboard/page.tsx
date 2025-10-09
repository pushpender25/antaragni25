"use client";

import { useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { StaggeredFadeIn } from "../../components/FadeIn";
import { Profile } from "../../components/Profile";
import { Team } from "../../components/Team";
import { Competitions } from "../../components/AvailableCompetitions";
import { Registrations } from "../../components/Registrations";
import { useStore } from "@repo/store";

const TABS = ["Profile", "Team", "Registrations", "Competitions"];

export default function EventDetails() {
	const [activeTab, setActiveTab] = useState(TABS[3]);
	const { loading } = useStore();

	if (loading) return;

	return (
		<ProtectedRoute>
			<section className="min-h-screen pt-16 pb-10">
				<div className="container mx-auto px-6">
					<div className="text-center mb-12">
						<p className="text-lg font-semibold uppercase tracking-widest text-secondary"></p>
						<h1 className="font-title text-6xl md:!text-8xl text-primary mt-2"></h1>
					</div>
				</div>
				<div className="max-w-7xl mx-auto">
					<div className="border-b border-primary/20 flex justify-center space-x-4 sm:space-x-8 mb-8">
						{TABS.map((tab) => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={`font-title text-lg sm:text-xl pb-3 transition-colors duration-300 ${
									activeTab === tab ?
										"text-primary border-b-2 border-primary"
									:	"text-foreground/60 hover:text-secondary"
								}`}
							>
								{tab}
							</button>
						))}
					</div>

					{activeTab === "Profile" && (
						<StaggeredFadeIn>
							<Profile />
						</StaggeredFadeIn>
					)}

					{activeTab === "Team" && (
						<StaggeredFadeIn>
							<Team />
						</StaggeredFadeIn>
					)}

					{activeTab === "Competitions" && (
						<StaggeredFadeIn>
							<Competitions />
						</StaggeredFadeIn>
					)}

					{activeTab === "Registrations" && (
						<StaggeredFadeIn>
							<Registrations />
						</StaggeredFadeIn>
					)}
				</div>
			</section>
		</ProtectedRoute>
	);
}
