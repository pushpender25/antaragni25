"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import ShortUniqueId from "short-unique-id";
import { useState, useEffect } from "react";
import { useStore } from "@repo/store";
import {
	doc,
	firebaseGetUser,
	getAllDocs,
	queryData,
	setData,
	updateData,
} from "@repo/firebase";
import { Section } from "@repo/ui/section";
import { Label, LabelInputContainer } from "@repo/ui/label";
import { Input } from "@repo/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { colleges } from "../../data/colleges";
import { Select } from "../../components/select";

export default function Login() {
	const { user, setUser, setLoading } = useStore();
	const uid = new ShortUniqueId({
		length: 10,
		dictionary: "alphanum_upper",
	});

	const router = useRouter();

	const [name, setName] = useState<string>(
		user?.user.displayName?.toUpperCase() || ""
	);
	const [email, setEmail] = useState<string>(user?.user.email || "");
	const [address, setAddress] = useState<string>("");
	const [teamId, setTeamId] = useState<string>("");
	const [teamName, setTeamName] = useState<string>("");
	const [college, setCollege] = useState<string>("");
	const [collegeOptions, setCollegeOptions] =
		useState<{ label: string; value: string }[]>(colleges);
	const [collegeCity, setCollegeCity] = useState<string>("");
	const [yearOfStudy, setYearOfStudy] = useState<string>("");
	const [gender, setGender] = useState<string>("");
	const [whatsapp, setWhatsapp] = useState<string>("");
	const [mobile, setMobile] = useState<string>(user?.user.phoneNumber || "");
	const [facebook, setFacebook] = useState<string>("");
	const [insta, setInsta] = useState<string>("");
	const [otherTeam, setOtherTeam] = useState<boolean>(false);
	const [otherCollege, setOtherCollege] = useState<boolean>(false);
	const [otherCollegeName, setOtherCollegeName] = useState<string>("");
	const [teams, setTeams] = useState<{ label: string; value: string }[]>([]);
	const [isTeamLeader, setIsTeamLeader] = useState<string>("NO");
	const [clubName, setClubName] = useState<string>("");
	const [clubEmail, setClubEmail] = useState<string>("");
	const [allTeams, setAllTeams] = useState<{ uid: string; data: doc }[]>([]);

	const register = async () => {
		try {
			if (mobile.length !== 10 || whatsapp.length !== 10) {
				toast.error("Please enter 10 digit Mobile/Whatsapp Number");
				return;
			}

			if (
				name != "" &&
				email != "" &&
				mobile != null &&
				mobile != "" &&
				address != "" &&
				college != null &&
				(college != "" || otherCollegeName != "") &&
				collegeCity != "" &&
				yearOfStudy != "" &&
				gender != "" &&
				whatsapp != "" &&
				teamName != null &&
				teamName != null &&
				teamName != "" &&
				isTeamLeader != ""
			) {
				const UserData = {
					id: `ANT.${uid.rnd()}`,
					name: name,
					email: email,
					phone: mobile,
					whatsapp: whatsapp,
					gender: gender,
					address: address,
					teamId: teamId !== "" ? teamId : `TM.ANT.${uid.rnd()}`,
					teamName: teamName,
					college:
						otherCollege ?
							otherCollegeName.toUpperCase()
						:	college.toUpperCase(),
					collegeCity: collegeCity,
					year: yearOfStudy,
					fb: facebook,
					insta: insta,
					isTeamLeader: isTeamLeader,
					dateTime: Date.now().toString(),
				};

				let success = false;

				if (otherTeam) {
					let teamData = {};
					if (isTeamLeader === "YES" && clubName != "" && clubEmail != "") {
						teamData = {
							teamName: teamName,
							teamId: UserData.teamId,
							college:
								otherCollege ?
									otherCollegeName.toUpperCase()
								:	college.toUpperCase(),
							collegeCity: collegeCity,
							clubName: clubName,
							clubEmail: clubEmail,
						};
						const teamResult = await setData(
							"eventsTeams2025",
							UserData.teamId,
							teamData
						);
						const userResult = await setData(
							"eventsUsers2025",
							user!.user.uid,
							UserData
						);
						success = teamResult && userResult;
					} else if (isTeamLeader === "NO") {
						teamData = {
							teamName: teamName,
							teamId: UserData.teamId,
							college:
								otherCollege ?
									otherCollegeName.toUpperCase()
								:	college.toUpperCase(),
							collegeCity: collegeCity,
						};
						const teamResult = await setData(
							"eventsTeams2025",
							UserData.teamId,
							teamData
						);
						const userResult = await setData(
							"eventsUsers2025",
							user!.user.uid,
							UserData
						);
						success = teamResult && userResult;
					} else {
						toast.error("Please Fill the Club Details !");
					}
				} else if (
					isTeamLeader === "YES" &&
					clubName != "" &&
					clubEmail != ""
				) {
					const teamData = {
						clubName: clubName,
						clubEmail: clubEmail,
					};
					const updateResult = await updateData(
						"eventsTeams2025",
						UserData.teamId,
						teamData
					);
					const registrationResult = await setData(
						"eventsUsers2025",
						user!.user.uid,
						UserData
					);
					success = updateResult && registrationResult;
				} else if (isTeamLeader === "NO") {
					success = await setData("eventsUsers2025", user!.user.uid, UserData);
				} else if (isTeamLeader === "YES") {
					toast.error("Please Fill the Club Details !");
				}

				if (success) {
					toast.success("Registration Successful!");
					setLoading(true);
					await firebaseGetUser("eventsUsers2025", setUser, setLoading);
					router.push("/dashboard");
				}
			} else {
				toast.error("Please Fill all the Required Fields !");
			}
		} catch (error) {
			toast.error(`${error}`);
		}
	};

	const teamDropdown = (college: string) => {
		const teamOptions = [
			{
				label: "Other",
				value: "-1",
			},
			{
				label: "SOLO",
				value: `TM.ANT.${uid.rnd()}`,
			},
		];
		for (let i = 0; i < allTeams.length; i++) {
			const currTeam = allTeams[i]?.data;
			if (currTeam?.college === college && currTeam?.name !== "SOLO") {
				const teamOption = {
					label: currTeam?.teamName.toUpperCase(),
					value: currTeam?.teamId,
				};
				teamOptions.push(teamOption);
			}
		}

		setTeams(teamOptions);
	};

	const getTeams = async () => {
		try {
			const teams = await getAllDocs("eventsTeams2025");
			setAllTeams(teams);
			const prevCollegeOptions = [...colleges];
			for (let i = 0; i < teams.length; i++) {
				const currTeam = teams[i]?.data;
				if (
					prevCollegeOptions.find((el) => {
						return el.label.toUpperCase() === currTeam?.college.toUpperCase();
					}) === undefined
				) {
					const collegeOption = {
						label: currTeam?.college.toUpperCase(),
						value: currTeam?.college.toUpperCase(),
					};
					if (collegeOption.label !== "" && collegeOption.value !== "") {
						prevCollegeOptions.push(collegeOption);
					}
				}
			}
			setCollegeOptions(prevCollegeOptions);
		} catch (error) {
			console.error(`${error}`);
		}
	};

	useEffect(() => {
		getTeams();
	}, []);

	return (
		<ProtectedRoute>
			<Section className="min-h-screen flex flex-col items-center justify-center gap-8 pt-24 pb-12">
				<div className="text-center">
					<h1 className="font-title text-5xl md:!text-7xl text-primary">
						Complete Your Profile
					</h1>
					<p className="text-lg text-secondary mt-2">
						Just a few more details to get you started.
					</p>
				</div>

				<div className="w-full max-w-6xl bg-foreground/5 backdrop-blur-lg rounded-xl border border-primary/20 p-6 md:!p-8">
					<form
						className="w-full my-8 flex flex-wrap gap-5 items-center justify-center overflow-auto p-2"
						data-lenis-prevent
					>
						<LabelInputContainer className="w-full md:!w-[calc(50%-1rem)]">
							<Label htmlFor="name">Name*</Label>
							<Input
								id="name"
								placeholder="Enter your name"
								value={name}
								required
								type="text"
								onChange={(e) => {
									setName(e.target.value.toUpperCase());
								}}
							/>
						</LabelInputContainer>
						<LabelInputContainer className="w-full md:!w-[calc(50%-1rem)]">
							<Label htmlFor="email">Email Id*</Label>
							<Input
								id="email"
								placeholder="Enter your email-id"
								value={email}
								required
								type="email"
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
						</LabelInputContainer>
						<LabelInputContainer className="w-full md:w-[calc(50%-1rem)]">
							<Label htmlFor="mobile">Mobile*</Label>
							<Input
								id="mobile"
								placeholder="Enter your 10 digit mobile number"
								value={mobile}
								required
								type="text"
								onChange={(e) => {
									setMobile(e.target.value);
								}}
							/>
						</LabelInputContainer>
						<LabelInputContainer className="w-full md:w-[calc(50%-1rem)]">
							<Label htmlFor="whatsapp">WhatsApp Number*</Label>
							<Input
								id="whatsapp"
								placeholder="Enter your 10 digit WhatsApp number"
								value={whatsapp}
								required
								type="text"
								onChange={(e) => {
									setWhatsapp(e.target.value);
								}}
							/>
						</LabelInputContainer>
						<LabelInputContainer className="w-full">
							<Label htmlFor="address">Postal Address*</Label>
							<Input
								id="address"
								placeholder="Enter your postal address"
								value={address}
								required
								type="text"
								onChange={(e) => {
									setAddress(e.target.value);
								}}
							/>
						</LabelInputContainer>
						<LabelInputContainer className="w-full md:w-[calc(50%-1rem)]">
							<Label htmlFor="gender">Gender*</Label>
							<Select
								value={gender}
								onValueChange={setGender}
								placeholder="Select Gender"
								options={[
									{ label: "MALE", value: "MALE" },
									{ label: "FEMALE", value: "FEMALE" },
									{ label: "OTHER", value: "OTHER" },
								]}
							/>
						</LabelInputContainer>
						<LabelInputContainer className="w-full md:!w-[calc(50%-1rem)]">
							<Label htmlFor="college">College Name*</Label>
							<Select
								value={college}
								onValueChange={(option: string) => {
									if (option === "-1") {
										setOtherCollege(true);
										setCollege("");
										teamDropdown("");
									} else {
										setOtherCollege(false);
										setCollege(option.toUpperCase());
										teamDropdown(option.toUpperCase());
									}
								}}
								placeholder="Select College"
								options={collegeOptions}
							/>
						</LabelInputContainer>
						{otherCollege && (
							<LabelInputContainer className="w-full md:!w-[calc(50%-1rem)]">
								<Label htmlFor="collegeName">College Name*</Label>
								<Input
									id="collegeName"
									placeholder="Enter your college name"
									value={otherCollegeName}
									required
									type="text"
									onChange={(e) => {
										setOtherCollegeName(e.target.value);
									}}
								/>
							</LabelInputContainer>
						)}
						<LabelInputContainer className="w-full md:!w-[calc(50%-1rem)]">
							<Label htmlFor="collegeCity">College City*</Label>
							<Input
								id="collegeCity"
								placeholder="Enter your college city"
								value={collegeCity}
								required
								type="text"
								onChange={(e) => {
									setCollegeCity(e.target.value);
								}}
							/>
						</LabelInputContainer>
						<LabelInputContainer className="w-full md:!w-[calc(50%-1rem)]">
							<Label htmlFor="yearOfStudy">Year of Study*</Label>
							<Select
								value={yearOfStudy}
								onValueChange={setYearOfStudy}
								placeholder="Select Year of Study"
								options={[
									{ label: "FIRST YEAR", value: "FIRST YEAR" },
									{ label: "SECOND YEAR", value: "SECOND YEAR" },
									{ label: "THIRD YEAR", value: "THIRD YEAR" },
									{ label: "FOURTH YEAR", value: "FOURTH YEAR" },
									{ label: "5+ YEARS", value: "5+ YEARS" },
									{ label: "CLASS 8 ", value: "CLASS 8 " },
									{ label: "CLASS 9 ", value: "CLASS 9 " },
									{ label: "CLASS 10 ", value: "CLASS 10 " },
									{ label: "CLASS 11 ", value: "CLASS 11 " },
									{ label: "CLASS 12 ", value: "CLASS 12 " },
								]}
							/>
						</LabelInputContainer>
						<LabelInputContainer className="w-full md:!w-[calc(50%-1rem)]">
							<Label htmlFor="facebook">Facebook Profile</Label>
							<Input
								id="facebook"
								placeholder="e.g. facebook.com/antaragni"
								value={facebook}
								type="text"
								onChange={(e) => {
									setFacebook(e.target.value);
								}}
							/>
						</LabelInputContainer>
						<LabelInputContainer className="w-full md:!w-[calc(50%-1rem)]">
							<Label htmlFor="insta">Instagram Profile</Label>
							<Input
								id="insta"
								placeholder="e.g. instagram.com/antaragni"
								value={insta}
								type="text"
								onChange={(e) => {
									setInsta(e.target.value);
								}}
							/>
						</LabelInputContainer>
						<LabelInputContainer className="w-full md:!w-[calc(50%-1rem)]">
							<Label htmlFor="team">Team*</Label>
							<Select
								value={teamId}
								onValueChange={(option: string) => {
									if (option === "-1") {
										setOtherTeam(true);
										setTeamName("");
										setTeamId("");
									} else {
										setOtherTeam(false);
										setTeamName(
											allTeams.find((team) => team.data.teamId === option)?.data
												.teamName || "SOLO"
										);
										setTeamId(option.toUpperCase());
									}
								}}
								placeholder="Select Team"
								options={teams}
							/>
						</LabelInputContainer>
						{otherTeam && (
							<LabelInputContainer className="w-full md:!w-[calc(50%-1rem)]">
								<Label htmlFor="teamName">Team Name*</Label>
								<Input
									id="teamName"
									placeholder="Enter your team name"
									value={teamName}
									required
									type="text"
									onChange={(e) => {
										setTeamName(e.target.value);
									}}
								/>
							</LabelInputContainer>
						)}
						<LabelInputContainer className="w-full md:!w-[calc(50%-1rem)]">
							<Label htmlFor="teamLeader">Are you a team leader*</Label>
							<Select
								value={isTeamLeader}
								onValueChange={setIsTeamLeader}
								placeholder="Select Team Leader Status"
								options={[
									{ label: "YES", value: "YES" },
									{ label: "NO", value: "NO" },
								]}
							/>
						</LabelInputContainer>
						{isTeamLeader === "YES" && (
							<>
								<LabelInputContainer className="w-full md:!w-[calc(50%-1rem)]">
									<Label htmlFor="clubName">Club Name</Label>
									<Input
										id="clubName"
										placeholder="e.g. Antaragni"
										value={clubName}
										type="text"
										onChange={(e) => {
											setClubName(e.target.value);
										}}
									/>
								</LabelInputContainer>
								<LabelInputContainer className="w-full md:!w-[calc(50%-1rem)]">
									<Label htmlFor="clubEmail">Club Email</Label>
									<Input
										id="clubEmail"
										placeholder="e.g. club@antaragni.com"
										value={clubEmail}
										type="text"
										onChange={(e) => {
											setClubEmail(e.target.value);
										}}
									/>
								</LabelInputContainer>
							</>
						)}
					</form>
					<div className="w-full flex justify-center mt-8">
						<button
							className="bg-accent text-foreground font-bold text-lg px-12 py-3 rounded-full hover:bg-opacity-80 transition-all duration-300 shadow-lg shadow-accent/20"
							onClick={register}
						>
							Register
						</button>
					</div>
				</div>
			</Section>
		</ProtectedRoute>
	);
}
