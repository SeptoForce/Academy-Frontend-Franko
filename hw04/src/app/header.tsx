import Image from "next/image";

export function Header() {
	return (
		<div className="w-full h-12 flex flex-row justify-between items-center bg-header-lt dark:bg-header-dt px-6">
			<div className="flex justify-center items-center gap-2">
				<Image
					src="/pokeball.svg"
					alt="Pokédex"
					width={30}
					height={30}
				/>
				<h1 className="text-page-lt uppercase relative -bottom-0.5">
					Pokédex
				</h1>
			</div>
			<div className="flex gap-2">
				<Image src="/heart.svg" alt="Search" width={30} height={30} />
				<Image
					src="/settings.svg"
					alt="Search"
					width={30}
					height={30}
				/>
			</div>
		</div>
	);
}
