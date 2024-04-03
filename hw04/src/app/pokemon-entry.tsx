export function PokemonEntry() {
	return (
		<div className="w-full flex flex-col sm:flex-row">
			<div className="w-full h-72 bg-transparent flex flex-row items-center justify-end p-8"></div>
			<div className="w-full h-72 gap-2 bg-details-bg-lt dark:bg-details-bg-dt flex justify-start items-center p-8">
				<div className="w-full h-full rounded-xl flex justify-center items-start flex-col">
					<h2 className="font-semibold text-lg mb-2">
						#0001 Bulbasaur
					</h2>
					<span className="flex gap-1 mb-1 text-[0.65rem]">
						<p className="font-bold">Health Points:</p>
						<p className="">45 HP</p>
					</span>
					<span className="flex gap-1 mb-1 text-[0.65rem]">
						<p className="font-bold">Height:</p>
						<p className="">70 cm</p>
					</span>
					<span className="flex gap-1 mb-1 text-[0.65rem]">
						<p className="font-bold">Weight:</p>
						<p className="">69 kg</p>
					</span>
					<span className="flex gap-1 mb-1 items-center text-[0.64rem]">
						<p className="font-bold mr-1">Type:</p>
						<p className="text-[0.5rem] bg-type-grass dark:text-text-lt text-text-dt px-2 rounded-full">
							grass
						</p>
						<p className="text-[0.5rem] bg-type-poison dark:text-text-lt text-text-dt px-2 rounded-full">
							poison
						</p>
					</span>
					<span className="flex flex-col gap-0 sm:flex-row sm:gap-2 mb-1 text-[0.65rem]">
						<p className="font-bold">Details:</p>
						<p className="">
							A strange seed was planted on its back at birth. The
							plant sprouts and grows with this POKéMON.
						</p>
					</span>
				</div>
				<div className="bg-blue-500/10 w-full h-full rounded-xl hidden lg:flex"></div>
			</div>
		</div>
	);
}
