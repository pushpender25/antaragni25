"use client";

import { doc, getSortedData } from "@repo/firebase";
import { useEffect, useState } from "react";
import toast from "react-hot-toast"

export function Leaderboard() {
	const [CAs, setCAs] = useState<{ uid: string; data: doc }[]>([]);

	const getAllCAs = async () => {
		try {
			const data = await getSortedData("CAs25", "points", 20);
			if (data != null) {
				setCAs(data);
			}
		} catch (error) {
			{
				toast.error(`${error}`);
			}
		}
	};

	useEffect(() => {
		getAllCAs();
	}, []);

	return (
		<div className="shadow-input h-full w-[80%] backdrop-blur-lg rounded-xl border-1 py-5 px-1 flex flex-wrap gap-5 items-start justify-center overflow-hidden text-[var(--white)]">
			<div className="overflow-auto w-full h-full" data-lenis-prevent>
				<table className="w-full h-full ">
					<thead>
						<tr className="border-b-2 py-2 m-5">
							<th>Rank</th>
							<th className="hidden md:block">CA ID</th>
							<th>Name</th>
							<th>Points</th>
						</tr>
					</thead>
					<tbody>
						{CAs.map((ca, index) => {
							return (
								<tr key={index} className="text-center border-b-1 h-16">
									<td>{index + 1}</td>
									<td className="hidden md:table-cell">{ca.data.id}</td>
									<td>{ca.data.name}</td>
									<td>{ca.data.points}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}
