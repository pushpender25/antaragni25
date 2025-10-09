"use client";

import { updateData } from "@repo/firebase";
import { useStore } from "@repo/store";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Input } from "@repo/ui/input";
import { Label, LabelInputContainer } from "@repo/ui/label";

interface RegisteredCompetition {
	competition: string;
	link: string;
}

export const Registrations = () => {
	const { user, setUser } = useStore();
	const registeredCompetitions: RegisteredCompetition[] =
		user?.details.userComps || [];

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentCompetition, setCurrentCompetition] =
		useState<RegisteredCompetition | null>(null);
	const [submissionLink, setSubmissionLink] = useState("");

	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
	const [competitionToRemove, setCompetitionToRemove] =
		useState<RegisteredCompetition | null>(null);

	const handleOpenModal = (competition: RegisteredCompetition) => {
		setCurrentCompetition(competition);
		setSubmissionLink(competition.link || "");
		setIsModalOpen(true);
	};

	const handleSubmitLink = async () => {
		if (!currentCompetition) {
			toast.error("No competition selected.");
			return;
		}
		if (submissionLink === "") {
			toast.error("Please provide a submission link.");
			return;
		}

		try {
			const updatedComps = registeredCompetitions.map((comp) =>
				comp.competition === currentCompetition.competition ?
					{ ...comp, link: submissionLink }
				:	comp
			);

			const result = await updateData("eventsUsers2025", user!.user.uid, {
				userComps: updatedComps,
			});

			if (result) {
				toast.success(
					`Submission for ${currentCompetition.competition} updated!`
				);
				setUser({
					...user!,
					details: {
						...user!.details,
						userComps: updatedComps,
					},
				});
			}
			setIsModalOpen(false);
		} catch (error) {
			toast.error(`Failed to update submission.`);
			console.error(error);
		}
	};

	const handleRemoveRegistration = (competition: RegisteredCompetition) => {
		setCompetitionToRemove(competition);
		setIsConfirmModalOpen(true);
	};

	const confirmRemoveRegistration = async () => {
		if (!competitionToRemove) return;
		try {
			const updatedComps = registeredCompetitions.filter(
				(comp) => comp.competition !== competitionToRemove.competition
			);
			const result = await updateData("eventsUsers2025", user!.user.uid, {
				userComps: updatedComps,
			});
			if (result) {
				toast.success(
					`Successfully unregistered from ${competitionToRemove.competition}`
				);
				setUser({
					...user!,
					details: { ...user!.details, userComps: updatedComps },
				});
			}
		} catch (error) {
			toast.error(`Failed to unregister.`);
			console.error(error);
		} finally {
			setIsConfirmModalOpen(false);
			setCompetitionToRemove(null);
		}
	};

	return (
		<div className="bg-foreground/5 p-6 sm:p-8 rounded-lg border border-primary/10 h-full">
			{isModalOpen && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-10"
					onClick={() => setIsModalOpen(false)}
				>
					<div
						className="relative bg-background border border-primary/20 rounded-lg shadow-lg w-11/12 max-w-lg p-8 flex flex-col items-center gap-6"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={() => setIsModalOpen(false)}
							className="absolute top-4 right-4 text-foreground/50 hover:text-foreground transition-colors"
							aria-label="Close modal"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
						<div className="text-center">
							<h3 className="font-title text-3xl text-primary">
								Add Submission
							</h3>
							<p className="text-secondary text-sm mt-1">
								{currentCompetition?.competition}
							</p>
						</div>
						<LabelInputContainer className="w-full">
							<Label htmlFor="link">Link of Proof*</Label>
							<Input
								id="link"
								required
								value={submissionLink}
								onChange={(e) => setSubmissionLink(e.target.value)}
								placeholder="https://..."
							/>
						</LabelInputContainer>
						<button
							onClick={handleSubmitLink}
							className="w-full bg-accent text-foreground font-bold text-lg px-8 py-3 rounded-full hover:bg-opacity-80 transition-all duration-300"
						>
							Submit Link
						</button>
					</div>
				</div>
			)}

			{isConfirmModalOpen && (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
					onClick={() => setIsConfirmModalOpen(false)}
				>
					<div
						className="relative bg-background border border-primary/20 rounded-lg shadow-lg w-11/12 max-w-md p-8 flex flex-col items-center gap-6 text-center"
						onClick={(e) => e.stopPropagation()}
					>
						<h3 className="font-title text-3xl text-primary">
							Confirm Removal
						</h3>
						<p className="text-foreground/80">
							Are you sure you want to unregister from{" "}
							<strong className="text-secondary">
								{competitionToRemove?.competition}
							</strong>
							? 
						</p>
						<div className="flex gap-4 w-full mt-4">
							<button
								onClick={() => setIsConfirmModalOpen(false)}
								className="w-full bg-foreground/10 text-foreground font-bold px-6 py-2 rounded-full hover:bg-foreground/20 transition-colors"
							>
								Cancel
							</button>
							<button
								onClick={confirmRemoveRegistration}
								className="w-full bg-accent text-foreground font-bold px-6 py-2 rounded-full hover:bg-opacity-80 transition-colors"
							>
								Confirm
							</button>
						</div>
					</div>
				</div>
			)}

			<div className="overflow-auto h-full" >
				<table className="hidden md:!table w-full min-w-[600px] text-left">
					<thead>
						<tr className="border-b-2 border-primary/20 font-title text-primary uppercase tracking-wider text-center">
							<th className="p-4 w-[50%]">Competition</th>
							<th className="p-4 w-[30%] text-center">Submission</th>
							<th className="p-4 w-[20%] text-center">Action</th>
						</tr>
					</thead>
					<tbody>
						{registeredCompetitions.map((competition, index) => (
							<tr
								key={index}
								className="border-b border-primary/10 last:border-b-0 text-center"
							>
								<td className="p-4 font-bold text-secondary align-middle">
									{competition.competition}
								</td>
								<td className="p-4 align-middle text-center">
									{competition.link ?
										<a
											href={competition.link}
											target="_blank"
											rel="noopener noreferrer"
											className="bg-primary/20 text-primary text-xs font-bold px-4 py-2 rounded-full hover:bg-primary/30 transition-colors"
										>
											View Submission
										</a>
									:	<button
											onClick={() => handleOpenModal(competition)}
											className="bg-accent text-foreground text-xs font-bold px-4 py-2 rounded-full hover:bg-opacity-80 transition-colors"
										>
											Add Submission
										</button>
									}
								</td>
								<td className="p-4 align-middle text-center">
									<button
										onClick={() => handleRemoveRegistration(competition)}
										className="bg-accent text-foreground text-xs font-bold px-4 py-2 rounded-full hover:bg-opacity-80 transition-colors"
									>
										Remove
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				<div className="md:!hidden space-y-4">
                    <h3 className="font-title text-primary text-2xl uppercase tracking-wider text-center pb-2 mb-4 border-b-2 border-primary/20">
                        My Registrations
                    </h3>
                    {registeredCompetitions.map((competition, index) => (
                        <div key={index} className="bg-foreground/10 p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-secondary text-base truncate pr-2">{competition.competition}</span>
                                {competition.link ? (
                                    <a 
                                        href={competition.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="bg-primary/20 text-primary text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap"
                                    >
                                        View
                                    </a>
                                ) : (
                                    <button 
                                        onClick={() => handleOpenModal(competition)} 
                                        className="bg-accent text-foreground text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap"
                                    >
                                        Add
                                    </button>
                                )}
                            </div>
                            <div className="text-right mt-3 pt-3 border-t border-primary/10">
                                <button 
                                    onClick={() => handleRemoveRegistration(competition)} 
                                    className="bg-accent/80 text-foreground/90 hover:bg-accent transition-colors text-xs font-bold px-4 py-2 rounded-full shadow"
                                >
                                    Unregister
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
			</div>
		</div>
	);
};
