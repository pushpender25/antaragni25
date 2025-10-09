import { Section } from "@repo/ui/section";
import ProtectedRoute from "../../components/ProtectedRoute";
import { Profile } from "../../components/Profile";
import { Tabs } from "@repo/ui/tabs";
import { Leaderboard } from "../../components/Leaderboard";
import { Tasks } from "../../components/Tasks";
import { Idea } from "../../components/Ideas";

export default function Dashboard() {
	return (
		<ProtectedRoute>
			<Section className="h-screen flex flex-col items-center justify-center gap-5 py-16">
                <div className="heading text-3xl md:!text-5xl lg:!text-7xl">
					ANTARAGNI 25
				</div>
                <Tabs tabs={[
                    {id: "profile", title: "Profile", content: <Profile/>},
                    {id: "leaderboard", title: "Leaderboard", content: <Leaderboard/>},
                    {id: "tasks", title: "Tasks", content: <Tasks />},
                    {id: "ideas", title: "Ideas", content: <Idea />},
                ]}/>
            </Section>
		</ProtectedRoute>
	);
}
