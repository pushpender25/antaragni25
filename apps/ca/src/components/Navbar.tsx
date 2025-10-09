"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@repo/store";
import {
	firebaseGetUser,
	firebaseGoogleSignIn,
	firebaseLogout,
} from "@repo/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useWindowSize } from "react-use";

gsap.registerPlugin(ScrollToPlugin);

const desktopNavItems = [
	"About",
	"Why CA",
	"Incentives",
	"Responsibilities",
	"FAQ",
	"Contacts",
	"Sponsors",
];

const dashboardNavItems = ["Home", "Logout"];

export function Navbar() {
	const { user, setUser, setLoading, lenis } = useStore();
	const [navItems, setNavItems] = useState<string[]>(desktopNavItems);
	const router = useRouter();
	const pathname = usePathname();
	const { width } = useWindowSize();
	const isMobile = width < 1030;

	useEffect(() => {
		if (pathname === "/register"){
			setNavItems(["Logout"])
		}else {
			if (pathname === "/dashboard") {
				setNavItems(dashboardNavItems);
			} else if (isMobile) {
				if (user) {
					if(user.details){
						setNavItems(["Dashboard", "Logout"]);
					} else {
						setNavItems(["Logout"])
					}
				} else {
					setNavItems([]);
				}
			} else {
				if (user) {
					if(user.details){
						setNavItems([...desktopNavItems, "Dashboard", "Logout"]);
					} else {
						setNavItems([...desktopNavItems, "Logout"])
					}
				} else {
					setNavItems(desktopNavItems);
				}
			}
		}
	}, [pathname, user, isMobile]);

	const navContainer = useRef<HTMLDivElement>(null);

	const handleLogin = async () => {
		if (!user) {
			const result = await firebaseGoogleSignIn();
			if (result) {
				await firebaseGetUser("CAs25", setUser, setLoading);
			}
		} else {
			await firebaseLogout(setUser);
		}
	};

	const handleScroll = (
		e: React.MouseEvent<HTMLAnchorElement>,
		targetID: string
	) => {
		e.preventDefault();

		if (targetID === "#logout") {
			handleLogin();
			return;
		}

		if (targetID === "#home") {
			router.push("/");
			return;
		}

		if (targetID === "#dashboard") {
			router.push("/dashboard");
			return;
		}
		if (lenis) {
			lenis.scrollTo(targetID, {
				duration: 1.5,
				offset: -80,
				easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			});
		}
	};

	useEffect(() => {
		if (user && !user.details) {
			router.push("/register")
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return (
		<div
			className="fixed bg-black inset-x-0 top-0 z-50 h-16 w-screen border-none transition-all duration-700"
			ref={navContainer}
		>
			<header className="absolute top-1/2 w-full -translate-y-1/2">
				<nav className="flex size-full items-center justify-between p-5">
					<div className="flex items-center gap-7">
						<Link href={"/"}>
							<Image
								src="/logo.png"
								alt="logo"
								className="w-7"
								width={20}
								height={20}
							/>
						</Link>
					</div>
					<div className="flex h-full items-center">
						<div className="block">
							{navItems.map((item, index) => (
								<a
									key={index}
									href={`#${item}`}
									onClick={(e) => {
										handleScroll(e, `#${item.split(" ")[0]?.toLowerCase()}`);
									}}
									className="relative ms-10 font-general text-base uppercase text-gray-300 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100 dark:after:bg-[var(--pink)] cursor-none"
								>
									{item}
								</a>
							))}
						</div>
					</div>
				</nav>
			</header>
		</div>
	);
}
