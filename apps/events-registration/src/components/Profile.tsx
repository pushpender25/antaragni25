"use client";

import { useStore } from "@repo/store";
import { Input } from "@repo/ui/input";
import { Label, LabelInputContainer } from "@repo/ui/label";

export const Profile = () => {
    const {user} = useStore();
	return (
		<div className="bg-foreground/5 p-6 sm:p-8 rounded-lg border border-primary/10">
            <div className="overflow-auto flex flex-wrap gap-5 items-center justify-center flex-1 touch-auto" data-lenis-prevent>
            <LabelInputContainer >
                <Label htmlFor="name">Name</Label>
                <Input id="name" disabled value={user?.details.name}/>
            </LabelInputContainer>
            <LabelInputContainer >
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input id="mobile" disabled value={user?.details.phone}/>
            </LabelInputContainer>
            <LabelInputContainer >
                <Label htmlFor="email">Email ID</Label>
                <Input id="email" disabled value={user?.details.email}/>
            </LabelInputContainer>
            <LabelInputContainer >
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input id="whatsapp" disabled value={user?.details.whatsapp}/>
            </LabelInputContainer>
            <LabelInputContainer >
                <Label htmlFor="address">Postal Address</Label>
                <Input id="address" disabled value={user?.details.address}/>
            </LabelInputContainer>
            <LabelInputContainer >
                <Label htmlFor="college">College</Label>
                <Input id="college" disabled value={user?.details.college}/>
            </LabelInputContainer>
            <LabelInputContainer >
                <Label htmlFor="collegeCity">College City</Label>
                <Input id="collegeCity" disabled value={user?.details.collegeCity}/>
            </LabelInputContainer>
            <LabelInputContainer >
                <Label htmlFor="yearofStudy">Year of Study</Label>
                <Input id="yearofStudy" disabled value={user?.details.year}/>
            </LabelInputContainer>
            <LabelInputContainer >
                <Label htmlFor="teamName">Team Name</Label>
                <Input id="teamName" disabled value={user?.details.teamName}/>
            </LabelInputContainer>
            <LabelInputContainer >
                <Label htmlFor="teamId">Antaragni Team ID</Label>
                <Input id="teamId" disabled value={user?.details.teamId}/>
            </LabelInputContainer>
            <LabelInputContainer >
                <Label htmlFor="id">Antaragni ID</Label>
                <Input id="id" disabled value={user?.details.id}/>
            </LabelInputContainer>
            </div>
        </div>
	);
};
