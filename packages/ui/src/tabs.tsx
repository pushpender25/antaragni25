"use client";

import { useRef, useState } from "react";
import gsap from "gsap";

interface Tab {
	id: string;
	title: string;
	content: React.ReactNode;
}

interface TabsProps {
	tabs: Tab[];
	className?: string;
}

export function Tabs({ tabs, className = "" }: TabsProps) {
	const [activeTab, setActiveTab] = useState(tabs[0]?.id);
	const panelsRef = useRef<Record<string, HTMLDivElement | null>>({});

	const handleTabChange = (newTab: string) => {
		if (newTab === activeTab) return;

		const currentPanel = panelsRef.current[activeTab!];
		const nextPanel = panelsRef.current[newTab];

		if (currentPanel && nextPanel) {
			gsap.to(currentPanel, {
				opacity: 0,
				y: 20,
				duration: 0.3,
				onComplete: () => {
					setActiveTab(newTab);
					gsap.fromTo(
						nextPanel,
						{ opacity: 0, y: -20 },
						{ opacity: 1, y: 0, duration: 0.4, ease: "sling" }
					);
				},
			});
		} else {
			setActiveTab(newTab);
		}
	};

	return (
		<div className={`w-full mx-auto p-6 h-full flex flex-col justify-center items-center ${className}`}>
			<div className="flex justify-center mb-4 overflow-x-auto">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => handleTabChange(tab.id)}
						className={`px-4 py-2 mx-2 whitespace-nowrap text-md transition ${
							activeTab === tab.id
								? "border-b-2 border-[var(--pink)] text-[var(--pink)]"
								: "text-white"
						}`}
					>
						{tab.title}
					</button>
				))}
			</div>

			<div className="relative h-full w-full flex justify-center">
				{tabs.map((tab) => (
					<div
						key={tab.id}
						ref={(el) => { panelsRef.current[tab.id] = el; }}
						style={{ display: activeTab === tab.id ? "block" : "none" }}
						className="absolute inset-0 w-full h-full z-1"
					>
						<div className="p-4 h-full w-full flex justify-center">{tab.content}</div>
					</div>
				))}
                <div className="absolute inset-0 w-full h-full flex justify-center p-4 z-0">
                    <div className="w-[80%] h-full backdrop-blur-lg"></div>
                </div>
			</div>
		</div>
	);
}
