import { useEffect, useState } from "react";
import { fetchPokemonById } from "../lib/pokeapi";
import Image from "next/image";
import { Pokemon } from "../lib/definitions";
import { formatPokemonName } from "../lib/helpers";
import { motion } from "framer-motion";

export const PokemonFavoriteCard = (props: { pokemonId: number }) => {
	const [pokemon, setPokemon] = useState<Pokemon | null>(null);
	const [favorited, setFavorited] = useState<boolean>(false);

	useEffect(() => {
		fetchPokemonById(props.pokemonId).then((pokemon) => {
			setPokemon(pokemon);
		});

		const favorite = localStorage.getItem(`favorite-${props.pokemonId}`);
		if (favorite) {
			setFavorited(JSON.parse(favorite));
		}
	}, [props.pokemonId]);

	const toggleFavorited = () => {
		if (!favorited) {
			localStorage.setItem(
				`favorite-${props.pokemonId}`,
				JSON.stringify(!favorited),
			);
		} else {
			localStorage.removeItem(`favorite-${props.pokemonId}`);
		}
		setFavorited(!favorited);
	};

	return (
		<div className="flex aspect-square w-full flex-col justify-between rounded-lg bg-page-lt p-4 shadow-inner shadow-black/50 dark:bg-page-dt">
			<button
				className="flex w-full justify-end"
				onClick={toggleFavorited}
			>
				{favorited ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						className="h-10 w-10 text-red-500"
					>
						<path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={2}
						stroke="currentColor"
						className="h-10 w-10"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
						/>
					</svg>
				)}
			</button>
			<div className="flex w-full items-center justify-center">
				{pokemon !== null &&
					(!favorited ? (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5 }}
						>
							<Image
								src={pokemon.sprites.default}
								alt={pokemon.name}
								width={240}
								height={240}
							/>
						</motion.div>
					) : (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5 }}
						>
							<Image
								src={pokemon.sprites.default_shiny}
								alt={pokemon.name}
								width={240}
								height={240}
							/>
						</motion.div>
					))}
			</div>
			<span className="text-2xl font-bold text-black dark:text-details-bg-lt">
				{pokemon !== null &&
					formatPokemonName({ name: pokemon.name, id: pokemon.id })}
			</span>
		</div>
	);
};
