import Image from "next/image";
import { ThemeSettings } from "./components/menu-theme";
import { FavoritesMenu } from "./components/menu-favorites";

export function Header() {
	return (
		<div className="sticky top-0 z-50 flex h-12 w-full flex-row items-center justify-between bg-header-lt px-6 dark:bg-header-dt">
			<div className="flex items-center justify-center gap-2">
				<Image
					src="/Pokeball.svg"
					alt="Pokeball"
					width={30}
					height={30}
				/>
				<h1 className="relative -bottom-0.5 uppercase text-page-lt">
					Pokédex
				</h1>
			</div>
			<div className="flex gap-2">
				<FavoritesMenu />
				<ThemeSettings />
			</div>
		</div>
	);
}
