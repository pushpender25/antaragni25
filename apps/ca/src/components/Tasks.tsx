"use client";

import { addData, getAllDocs, getDate, queryData, time } from "@repo/firebase";
import { useStore } from "@repo/store";
import { useEffect, useState } from "react";
import Button from "./Button";
import { Label, LabelInputContainer } from "@repo/ui/label";
import { Input } from "@repo/ui/input";
import toast from "react-hot-toast";

interface Task {
	uid: string;
	desc: string;
	points: string;
	deadline: time;
	award: string | undefined;
	link: string | undefined;
}

export function Tasks() {
	const { user } = useStore();
	const [tasks, setTasks] = useState<Task[]>([]);
	const [link, setLink] = useState<string>("");
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [currentTask, setCurrentTask] = useState<Task>({
		uid: "",
		desc: "",
		points: "",
		deadline: {
			seconds: 0,
			nanoseconds: 0,
		},
		award: "",
		link: "",
	});

	const getAllTasks = async () => {
		try {
			const allTasks = await getAllDocs("tasksCA25");
			const submissions = await queryData(
				"CAsSubmissions25",
				"id",
				user?.details.id
			);
			if (submissions != null && allTasks != null) {
				const tasks: Task[] = [];
				allTasks.map((task) => {
					let newTask: Task = {
						uid: "",
						desc: "",
						points: "",
						deadline: {
							seconds: 0,
							nanoseconds: 0,
						},
						award: "",
						link: "",
					};
					const submission = submissions.find((sub) => {
						return sub.data.taskId === task.uid;
					});

					if (submission !== undefined) {
						newTask = {
							uid: task.uid,
							desc: task.data.desc,
							points: task.data.points,
							deadline: task.data.deadline,
							award: submission.data.award,
							link: submission.data.link,
						};
					} else {
						newTask = {
							uid: task.uid,
							desc: task.data.desc,
							points: task.data.points,
							deadline: task.data.deadline,
							award: undefined,
							link: undefined,
						};
					}
					tasks.push(newTask);
				});
				setTasks(tasks);
			}
		} catch (error) {
			toast.error(`${error}`);
		}
	};

	const submit = async (task: Task) => {
		try {
			if (link !== "") {
				const data = {
					taskId: task.uid,
					taskDesc: task.desc,
					taskPoints: task.points,
					uid: user?.user.uid,
					id: user?.details.id,
					name: user?.details.name,
					email: user?.details.email,
					phone: user?.details.phone,
					link: link,
					college: user?.details.college,
					collegeCity: user?.details.collegeCity,
				};
				await addData("CAsSubmissions25", data);
				toast.success("Submission Accepted!");
				setLink("");
				getAllTasks();
				setIsOpen(false);
			} else {
				toast.error("Provide Link");
			}
		} catch (error) {
			toast.error(`${error}`);
			setIsOpen(false);
		}
	};

	useEffect(() => {
		getAllTasks();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="shadow-input h-full w-[80%] backdrop-blur-lg rounded-xl border-1 py-5 px-1 flex flex-wrap gap-5 items-start justify-center overflow-hidden text-[var(--white)]">
			<div
				className="relative h-full w-full backdrop-blur-3xs"
				style={{ display: isOpen ? "block" : "none" }}
			>
				<div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2  w-[80%] h-[50%] lg:!w-[50%] flex items-center justify-center bg-white border-[var(--pink)] border-1">
					<button
						className="absolute top-5 right-5 w-5 h-5 text-black"
						onClick={() => {
							setIsOpen(!isOpen);
						}}
					>
						X
					</button>
					<div className="content flex flex-col justify-center items-center gap-5 p-2">
						<LabelInputContainer>
							<Label htmlFor="link" className="!text-black">
								Link Of Proof*
							</Label>
							<Input
								id="link"
								required
								value={link}
								onChange={(e) => setLink(e.target.value)}
								className="!text-black"
							/>
						</LabelInputContainer>
						<button
							onClick={() => {
								submit(currentTask);
							}}
						>
							<Button text="SUBMIT" />
						</button>
					</div>
				</div>
			</div>
			<div className="w-full h-full overflow-auto p-2" data-lenis-prevent>
				{tasks.length != 0 && (
					<table>
						<thead>
							<tr className="border-b-2 py-2 m-5">
								<th>Description</th>
								<th>Deadline</th>
								<th>Points</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{tasks.map((task, index) => {
								return (
									<tr
										key={index}
										className="p-2 text-center border-b-1 h-16 overflow-auto w-full"
									>
										<td className="w-[70%] p-2">{task.desc}</td>
										<td className="w-[10%] p-2">
											{getDate(task.deadline).toString()}
										</td>
										<td className="w-[10%] p-2">{task.points}</td>
										<td className="w-[10%] p-2">
											{task.link !== undefined ?
												task.award !== undefined ?
													`Points Awarded: ${task.award}`
												:	"In Review"
											:	<button
													className="p-2"
													onClick={() => {
														setIsOpen(!isOpen);
														setCurrentTask(task);
													}}
												>
													<Button text="Submit" />
												</button>
											}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}
