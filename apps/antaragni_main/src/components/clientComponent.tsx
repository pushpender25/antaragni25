"use client";
import { ReactNode } from "react";
import Header from "./header";
import Popup from "./PopUp";

export function ClientComponent({ children }: { children: ReactNode }) {

	return (
		<>
			<div className="relative z-10">
				<Header />
                <Popup />
				<main>{children}</main>
			</div>
		</>
	);
}
