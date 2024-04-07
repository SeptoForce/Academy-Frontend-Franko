import { PokemonEntry } from "./pokemon-entry";

export default function PokemonList() {
	return (
		<div className="h-auto w-full ">
			{Array.from({ length: 200 }).map((_, index) => (
				<PokemonEntry
					key={index}
					flipped={index % 2 === 0}
					pokemonId={index + 1}
				/>
			))}
		</div>
	);
}
