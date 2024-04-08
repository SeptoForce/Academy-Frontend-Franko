import { PokemonEntry } from "./pokemon-entry";

export default function PokemonList() {
	return (
		<div className="h-auto w-full ">
			{Array.from({ length: 15 }).map((_, index) => (
				<PokemonEntry
					key={index}
					flipped={index % 2 === 1}
					pokemonId={index + 1}
				/>
			))}
		</div>
	);
}
