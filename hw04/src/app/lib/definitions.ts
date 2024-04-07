export const MAX_POKEMON_ID = 1025;

export type Pokemon = {
	id: number;
	name: string;
	hp: number;
	height: number;
	weight: number;
	types: PokemonTypes[];
	sprites: {
		default: string;
		front_pixel: string;
		back_pixel: string;
	};
	details: string;
};

export type PokemonTypes =
	| "normal"
	| "fire"
	| "water"
	| "electric"
	| "grass"
	| "ice"
	| "fighting"
	| "poison"
	| "ground"
	| "flying"
	| "psychic"
	| "bug"
	| "rock"
	| "ghost"
	| "dragon"
	| "dark"
	| "steel"
	| "fairy";
