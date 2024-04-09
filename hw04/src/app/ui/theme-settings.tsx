"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";

export const ThemeSettings = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedTheme, setSelectedTheme] = useState("Auto");

	useEffect(() => {
		const theme = localStorage.getItem("theme");
		if (theme) {
			handleThemeChange(theme);
		}
	}, []);

	const themes = ["Auto", "Light", "Dark"];

	const handleThemeChange = (theme: string) => {
		setSelectedTheme(theme);
		if (theme === "Dark") {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "Dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "Light");
		}

		if (theme === "Auto") {
			if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
				document.documentElement.classList.add("dark");
				localStorage.setItem("theme", "Dark");
			} else {
				document.documentElement.classList.remove("dark");
				localStorage.setItem("theme", "Light");
			}
		}

		console.log("Theme changed to", theme);
	};

	return (
		<div className="relative flex">
			<button className="" onClick={() => setIsOpen(!isOpen)}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="h-8 w-8 text-page-lt hover:text-yellow-500"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
					/>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
					/>
				</svg>
			</button>
			{isOpen && (
				<div className="absolute right-0 top-14 z-20 flex h-auto w-[calc(100vw-4rem)] flex-col gap-1 overflow-hidden rounded-md border border-header-lt/20 bg-details-bg-lt p-4 px-4 shadow-lg sm:w-64 dark:bg-header-dt">
					<p className="w-full text-left text-lg font-semibold text-text-lt dark:text-page-lt">
						Select Theme
					</p>
					<div className="flex flex-col">
						{themes.map((theme) => (
							<button
								key={theme}
								className="flex w-full items-center gap-2 rounded-md p-1 px-2 text-left text-lg font-semibold text-text-lt hover:bg-black/20 dark:text-page-lt"
								onClick={() => handleThemeChange(theme)}
							>
								<div
									className={clsx(
										"h-2 w-2 rounded-full border border-details-bg-dt dark:border-details-bg-lt",
										theme === selectedTheme &&
											"bg-details-bg-dt dark:bg-details-bg-lt",
									)}
								/>
								<p className="text-base font-normal">{theme}</p>
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
