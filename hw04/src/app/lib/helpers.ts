export const formatPokemonName = (props: { name: string; id?: number }) => {
	let pokemonFormatName: string, pokemonFormatId: string;
	if (props.name === undefined) {
		return undefined;
	}

	pokemonFormatName = props.name
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");

	if (props.id === undefined) {
		return pokemonFormatName;
	}

	pokemonFormatId = `#${props.id.toString().padStart(4, "0")} `;
	return pokemonFormatId + pokemonFormatName;
};
