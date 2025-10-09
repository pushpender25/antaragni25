import type { Metadata } from "next";
import { Inter, Rakkas } from "next/font/google";
import "./globals.css";
import { Cursor } from "@repo/ui/cursor";
import { LenisProvider } from "@repo/ui/lenisProvider";
import { ClientComponent } from "../components/clientComponent";
import { Toaster } from "react-hot-toast";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const rakkas = Rakkas({
	subsets: ["latin"],
	weight: '400',
	variable: "--font-rakkas",
});

export const metadata: Metadata = {
	title: "Events Registration Antaragni",
	description:
		"The 60th edition of the annual cultural festival of IIT Kanpur. A rebirth of culture.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.variable} ${rakkas.variable} antialiased`}
			>
				<Cursor color="gold" />
				<Toaster />
				<LenisProvider>
					<ClientComponent>{children}</ClientComponent>
				</LenisProvider>
			</body>
		</html>
	);
}