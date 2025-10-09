"use client";

import { addData } from "@repo/firebase";
import { useStore } from "@repo/store";
import { LabelInputContainer } from "@repo/ui/label";
import { useState } from "react";
import Button from "./Button";
import toast from "react-hot-toast";

export function Idea() {
	const { user } = useStore();
	const [idea, setIdea] = useState<string>("");

	const submit = async () => {
		try {
			if (idea != "") {
				const data = {
					id: user?.details.id,
					name: user?.details.name,
					email: user?.details.email,
					phone: user?.details.phone,
					idea: idea,
					college: user?.details.college,
					collegeCity: user?.details.collegeCity,
				};
				addData("CAsIdeas25", data);
				toast.success("Idea Submitted!")
				setIdea("");
			} else {
				toast.error("Write your idea");
			}
		} catch (error) {
			toast.error(`${error}`);
		}
	};

	return (
		<div className="shadow-input h-full w-[80%] backdrop-blur-lg rounded-xl border-1 py-5 px-1 flex flex-wrap gap-5 items-start justify-center overflow-hidden text-[var(--white)]">
			<div className="w-full h-full overflow-auto p-2 flex flex-col justify-center items-center gap-5">
				<LabelInputContainer className="h-[80%]">
					<textarea
                        className="border-b-1 shadow-xl h-full p-2 focus:outline-0"
						name=""
						id=""
                        placeholder="Write your ideas here..."
						value={idea}
						onChange={(e) => {
							setIdea(e.target.value);
						}}
					/>
				</LabelInputContainer>
				<button
					onClick={() => {
						submit();
					}}
				>
					<Button text={"Submit"} />
				</button>
			</div>
		</div>
	);
}
