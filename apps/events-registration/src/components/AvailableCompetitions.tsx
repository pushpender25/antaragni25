"use client";

import { updateData } from "@repo/firebase";
import { useStore } from "@repo/store";
import { useState, useEffect } from "react";
import { competitions as allCompetitionsData } from "../data/events"; 
import Link from "next/link";
import { toast } from "react-hot-toast";

interface Competition {
    event: string;
    comp: string;
    desc: string;
    type: string;
    link: string;
}

export const Competitions = () => {
    const { user, setUser } = useStore();
    
    const [unregisteredCompetitions, setUnregisteredCompetitions] = useState<Competition[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user?.details) {
            const registeredCompNames = user.details.userComps?.map((c: { competition: any; }) => c.competition) || [];
            const filteredComps = allCompetitionsData.filter(
                (competition) => !registeredCompNames.includes(competition.comp)
            );
            setUnregisteredCompetitions(filteredComps);
        }
        setIsLoading(false);
    }, [user]);

    const handleRegister = async (competitionToRegister: Competition) => {
        try {
            const currentRegistrations = user?.details.userComps || [];
            const newComps = [
                ...currentRegistrations,
                { competition: competitionToRegister.comp, link: "" },
            ];

            const result = await updateData("eventsUsers2025", user!.user.uid, {
                userComps: newComps,
            });

            if (result) {
                toast.success(`Successfully registered for ${competitionToRegister.comp}. Kindly navigate to the registrations tab to add your submission.`);
                setUser({
                    ...user!,
                    details: { ...user!.details, userComps: newComps },
                });
            }
        } catch (error) {
            toast.error(`Failed to register for ${competitionToRegister.comp}`);
            console.error(error);
        }
    };

    if (isLoading) {
        return (
            <div className="bg-foreground/5 p-6 sm:p-8 rounded-lg border border-primary/10 h-full flex items-center justify-center">
                <p className="text-foreground/60">Loading competitions...</p>
            </div>
        );
    }

    return (
        <div className="bg-foreground/5 p-4 sm:p-6 rounded-lg border border-primary/10 h-full flex flex-col">
            <div className="text-center mb-6">
                <h3 className="font-title text-3xl text-primary">Register for Competitions</h3>
            </div>
            <div className="overflow-auto">
                <table className="hidden md:!table w-full table-fixed text-center">
                    <thead>
                        <tr className="border-b-2 border-primary/20 font-title text-primary uppercase tracking-wider text-sm">
                            <th className="p-4 w-[15%]">Event</th>
                            <th className="p-4 w-[15%]">Competition</th>
                            <th className="p-4 w-[30%]">Description</th>
                            <th className="p-4 w-[10%]">Type</th>
                            <th className="p-4 w-[15%]">Rulebook</th>
                            <th className="p-4 w-[15%] text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {unregisteredCompetitions.map((competition) => (
                            <tr key={competition.comp} className="border-b border-primary/10 last:border-b-0">
                                <td className="p-4 font-bold text-secondary align-top break-words">{competition.event}</td>
                                <td className="p-4 align-top break-words">{competition.comp}</td>
                                <td className="p-4 align-top text-xs text-foreground/70 break-words">{competition.desc}</td>
                                <td className="p-4 align-top break-words">{competition.type}</td>
                                <td className="p-4 align-top break-words">
                                    <Link href={`/events/${competition.link}`} className="text-primary hover:underline text-xs">
                                        View Rules
                                    </Link>
                                </td>
                                <td className="p-4 align-top text-center">
                                    <button
                                        onClick={() => handleRegister(competition)}
                                        className="bg-accent text-foreground text-xs font-bold px-4 py-2 rounded-full hover:bg-opacity-80 transition-colors"
                                    >
                                        Register
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="md:!hidden space-y-4">
                    {unregisteredCompetitions.map((competition) => (
                        <div key={competition.comp} className="bg-foreground/10 p-4 rounded-lg">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs text-primary">{competition.event}</p>
                                    <p className="font-bold text-secondary text-lg">{competition.comp}</p>
                                </div>
                                <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">{competition.type}</span>
                            </div>
                            <p className="text-xs text-foreground/70 my-2">{competition.desc}</p>
                            <div className="flex justify-between items-center mt-4">
                                <Link href={`/events/${competition.link}`} className="text-primary hover:underline text-xs">
                                    View Rulebook
                                </Link>
                                <button
                                    onClick={() => handleRegister(competition)}
                                    className="bg-accent text-foreground text-xs font-bold px-4 py-2 rounded-full hover:bg-opacity-80 transition-colors"
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
