"use client";
import { ReactNode } from "react";
import { useStore } from "@repo/store";
import  Loader  from "./Loader";
import Header from "./header";
import { Background } from "./Background";
import Popup from "./PopUp";

export function ClientComponent({ children }: { children: ReactNode }) {

	return (
		<>
            <Loader />
			<div className="relative z-10">
				<Header />
                <Popup />
				<main>{children}</main>
			</div>
		</>
	);
}
