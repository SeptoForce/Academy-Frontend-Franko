import { Pokemon } from "./definitions";

export const fetchPokemonById = async (id: number) => {
	const details = await fetchPokemonDetailsById(id);

	const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
		.then((response) => response.json())
		.then((data) => {
			return {
				id: data.id,
				name: data.name,
				hp: data.stats[0].base_stat,
				height: data.height,
				weight: data.weight,
				types: data.types.map((type: any) => type.type.name),
				sprites: {
					default:
						data.sprites.other["official-artwork"].front_default,
					front_pixel: data.sprites.front_default,
					back_pixel: data.sprites.back_default,
				},
				details: details,
			} as Pokemon;
		});

	return data;
};

export const fetchPokemonDetailsById = async (id: number) => {
	const resoult = (await fetch(
		`https://pokeapi.co/api/v2/pokemon-species/${id}`,
	)
		.then((response) => response.json())
		.then((data) => {
			return data.flavor_text_entries.find(
				(entry: any) => entry.language.name === "en",
			).flavor_text;
		})) as string;

	const modifiedResoult = resoult.replace(/[^a-zA-Z0-9 .,!?é]/g, " ");

	return modifiedResoult;
};
