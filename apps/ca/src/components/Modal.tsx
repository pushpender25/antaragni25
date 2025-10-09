"use client"

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Modal() {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
        const hasVisited = sessionStorage.getItem("visited")
        if (!hasVisited){
            setIsOpen(true);
            sessionStorage.setItem("visited", "true")
        }
	}, []);

	const handleClose = () => {
		setIsOpen(false);
	};

	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-opacity duration-300">
			<div className="bg-white rounded-2xl shadow-2xl w-11/12 max-w-md m-4 transform transition-all duration-300 scale-100">
				<div className="p-8 text-center">
					<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                        <Image src={"/logo.png"} height={60} width={60} alt="logo"/>
					</div>
					<h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h2>
					<p className="text-gray-600 mb-6">
						Stay up to date with our latest news and announcements. Join our
						official WhatsApp channel!
					</p>
					<div className="flex flex-col space-y-3">
						<a
							href="https://chat.whatsapp.com/JAPxq7ulA7Z6ZpvqwWF1f8"
							target="_blank"
							rel="noopener noreferrer"
							className="w-full inline-block px-6 py-3 bg-[var(--pink)] text-white font-semibold rounded-lg shadow-md hover:bg-[var(--pink-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all"
							onClick={handleClose}
						>
							Join Channel
						</a>
						<button
							onClick={handleClose}
							className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all"
						>
							Maybe Later
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
