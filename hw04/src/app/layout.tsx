import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Pokédex by Franko Zarkovic",
	description: "Project for Sofascore Academy 2024.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<body
				className={
					poppins.className +
					" " +
					"bg-page-lt text-text-lt transition-colors dark:bg-page-dt dark:text-text-dt"
				}
			>
				{children}
			</body>
		</html>
	);
}
