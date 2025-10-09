"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@repo/store";
import { firebaseGoogleSignIn, firebaseLogout } from "@repo/firebase";
const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/events", label: "Events" },
	{ href: "/roadtrips", label: "Roadtrips" },
	// { href: "/rulebook", label: "Rulebook" },
];

const Header = () => {
	const pathname = usePathname();
	const { user, setUser, setLoading } = useStore();
	const [scrolled, setScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const router = useRouter();
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
	const profileMenuRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		setIsMobileMenuOpen(false);
		setIsProfileMenuOpen(false);

		const handleClickOutside = (event: MouseEvent) => {
			if (
				profileMenuRef.current &&
				!profileMenuRef.current.contains(event.target as Node)
			) {
				setIsProfileMenuOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [pathname]);

	const handleSignIn = async () => {
		setLoading(true);
		const result = await firebaseGoogleSignIn();
		if (!result) {
			setLoading(false);
		} else {
			router.push("/register");
		}
	};

	const handleSignOut = async () => {
		await firebaseLogout(setUser);
	};

	return (
		<>
			<header
				className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
					scrolled || isMobileMenuOpen ?
						"bg-backgroun/60 backdrop-blur-sm shadow-lg"
					:	"bg-transparent"
				}`}
			>
				<nav className="container mx-auto px-6 py-4 flex justify-between items-center">
					<div className="flex-1 flex justify-start">
						<Link
							href="/"
							className="font-title text-2xl text-foreground hover:text-primary transition-colors"
						>
							Antaragni 25
						</Link>
					</div>

					<div className="hidden md:!flex items-center space-x-8">
						{navLinks.map((link) => {
							const isActive = pathname === link.href;
							return (
								<Link
									key={link.href}
									href={link.href}
									className={`relative text-foreground hover:text-primary transition-colors ${
										isActive ? "text-primary" : ""
									}`}
								>
									{link.label}
									{isActive && (
										<span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-primary"></span>
									)}
								</Link>
							);
						})}
					</div>
					<div className="flex-1 flex justify-end">
						<div className="hidden md:!flex items-center">
							{user ?
								<div className="relative group">
									<button className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-full text-sm" onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}>
										<span>{user.user.displayName || "Profile"}</span>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
											className="transition-transform duration-300 group-hover:rotate-180"
										>
											<path d="m6 9 6 6 6-6" />
										</svg>
									</button>
									<div className="absolute top-full right-0 pt-2 w-56 origin-top-right bg-transparent opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-out pointer-events-none group-hover:pointer-events-auto">
										<div className="bg-background border border-primary/20 rounded-lg shadow-xl overflow-hidden">
											<div className="px-4 py-3 border-b border-primary/10">
												<p className="text-sm text-foreground truncate">
													{user.user.displayName || "Welcome"}
												</p>
												<p className="text-xs text-foreground/60 truncate">
													{user.user.email}
												</p>
											</div>
											<div className="py-1">
												{user.details ?
													<Link
														href="/dashboard"
														className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-foreground hover:bg-primary/10 transition-colors"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="16"
															height="16"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															strokeWidth="2"
															strokeLinecap="round"
															strokeLinejoin="round"
														>
															<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
															<circle cx="9" cy="7" r="4" />
															<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
															<path d="M16 3.13a4 4 0 0 1 0 7.75" />
														</svg>
														<span>Dashboard</span>
													</Link>
												:	<Link
														href="/register"
														className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-foreground hover:bg-primary/10 transition-colors"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="16"
															height="16"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															strokeWidth="2"
															strokeLinecap="round"
															strokeLinejoin="round"
														>
															<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
															<circle cx="9" cy="7" r="4" />
															<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
															<path d="M16 3.13a4 4 0 0 1 0 7.75" />
														</svg>
														<span>Register</span>
													</Link>
												}
												<button
													onClick={handleSignOut}
													className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-accent hover:bg-accent/10 transition-colors"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														strokeWidth="2"
														strokeLinecap="round"
														strokeLinejoin="round"
													>
														<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
														<polyline points="16 17 21 12 16 7" />
														<line x1="21" x2="9" y1="12" y2="12" />
													</svg>
													<span>Sign Out</span>
												</button>
											</div>
										</div>
									</div>
								</div>
							:	<button
									onClick={handleSignIn}
									className="px-6 py-2 border border-primary/50 text-primary rounded-full hover:bg-primary hover:text-background transition-colors"
								>
									Sign In
								</button>
							}
						</div>
					</div>

					<div className="md:!hidden z-40">
						<button
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="text-foreground"
						>
							{isMobileMenuOpen ?
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
							:	<svg
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
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							}
						</button>
					</div>
				</nav>
			</header>
			<div
				className={`md:!hidden fixed top-0 left-0 w-full h-full bg-background/80 backdrop-blur-lg z-20 transition-opacity duration-300 ease-in-out ${
					isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
			>
				<div className="container mx-auto h-full flex flex-col items-center justify-center space-y-8">
					{navLinks.map((link) => (
						<Link
							key={`mobile-${link.href}`}
							href={link.href}
							onClick={() => setIsMobileMenuOpen(false)}
							className="text-3xl font-[var(--font-title)] text-foreground hover:text-primary transition-colors"
						>
							{link.label}
						</Link>
					))}
					<div className="pt-8">
						{user ?
							<div className="flex flex-col items-center space-y-4">
								<p className="text-primary">
									{user.user.displayName || "Profile"}
								</p>
								{user.details ?
									<Link
										href="/dashboard"
										className="text-foreground hover:text-primary"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										Dashboard
									</Link>
								:	<Link
										href="/register"
										className="text-foreground hover:text-primary"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										Register
									</Link>
								}
								<button
									onClick={() => {
										handleSignOut();
										setIsMobileMenuOpen(false);
									}}
									className="text-accent hover:opacity-80"
								>
									Sign Out
								</button>
							</div>
						:	<button
								onClick={() => {
									handleSignIn();
									setIsMobileMenuOpen(false);
								}}
								className="px-8 py-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-background transition-colors text-lg"
							>
								Sign In
							</button>
						}
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
