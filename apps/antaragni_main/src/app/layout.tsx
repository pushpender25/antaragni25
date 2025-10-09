import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Cursor } from "@repo/ui/cursor";
import { Toaster } from "react-hot-toast";
import { ClientComponent } from "../components/clientComponent";
import { Cinzel } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Antaragni 25",
  description: "Kanreki's Oraculum",
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
      <Cursor />
      <Toaster />
        <ClientComponent>
          {children}
        </ClientComponent>
      </body>
    </html>
  );
}
