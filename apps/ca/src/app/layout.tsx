import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Cursor } from "@repo/ui/cursor";
import { Loader } from "@repo/ui/loader";
import { RealViewport } from "@repo/ui/realViewport";
import { Navbar } from "../components/Navbar";
import { Background } from "../components/Background";
import { LenisProvider } from "@repo/ui/lenisProvider";
import { InitialState } from "../components/InitialState";
import { Toaster } from "react-hot-toast";
import Modal from "../components/Modal";
import Footer from "../components/Footer";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "CA Antaragni",
	description: "Antaragni Campus Ambassador Program",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Navbar />
				<div className="background bg-black fixed top-0 left-0 h-screen right-0 pointer-events-none after:content-[''] after:absolute after:top-0 after:left-1/2 after:h-screen after:w-[200vw] after:bg-[radial-gradient(var(--pink),var(--black)_70%)] after:-translate-x-1/2 after:translate-y-[50vh] after:opacity-30 -z-10">
					<Background />
				</div>
				<Toaster />
				<Cursor />
				<Loader type={1}/>
				<Modal />
				<RealViewport />
				<InitialState document="CAs25" />
				<LenisProvider>{children}</LenisProvider>
				<Footer />
			</body>
		</html>
	);
}
