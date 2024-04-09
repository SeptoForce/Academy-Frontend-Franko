"use client";

import clsx from "clsx";
import {
	MAX_POKEMON_ID,
	type Pokemon,
	type PokemonTypes,
} from "./lib/definitions";
import { fetchPokemonById } from "./lib/pokeapi";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { RefreshContext } from "./lib/providers";
import { motion } from "framer-motion";

export const PokemonEntry = (props: {
	flipped: boolean;
	pokemonId: number;
	favorited?: boolean;
}) => {
	const [pokemon, setPokemon] = useState<Pokemon | null>(null);
	const [favorited, setFavorited] = useState<boolean>(false);
	const { key } = useContext(RefreshContext);

	useEffect(() => {
		if (props.pokemonId > MAX_POKEMON_ID) {
			return;
		}
		fetchPokemonById(props.pokemonId).then((pokemon) => {
			setPokemon(pokemon);
		});

		const favorite = localStorage.getItem(`favorite-${props.pokemonId}`);
		if (favorite) {
			setFavorited(JSON.parse(favorite));
		}
	}, [props.pokemonId]);

	useEffect(() => {
		const favorite = localStorage.getItem(`favorite-${props.pokemonId}`);
		setFavorited(JSON.parse(favorite !== null ? "true" : "false"));
	}, [key, props.pokemonId]);

	if (props.pokemonId > MAX_POKEMON_ID) {
		return <></>;
	}

	const toggleFavorite = () => {
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

	// iron-vailent should be "Iron Valiant"
	const pokemonNameCapitalized: string =
		pokemon !== null
			? pokemon.name
					.split("-")
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(" ")
			: "";
	const pokemonIdFormated: string =
		pokemon !== null ? `#${pokemon?.id.toString().padStart(4, "0")} ` : "";

	const pokemonHp = pokemon?.hp !== undefined ? `${pokemon?.hp} HP` : null;

	const pokemonHeight =
		pokemon?.height !== undefined ? `${pokemon?.height * 10} cm` : null;
	const pokemonWeight =
		pokemon?.weight !== undefined ? `${pokemon?.weight} kg` : null;

	const pokemonDetails =
		pokemon?.details !== undefined ? pokemon.details : undefined;

	return (
		<div
			className={clsx("flex w-full flex-col sm:flex-row", {
				"flex-col-reversed sm:flex-row-reverse": props.flipped,
			})}
		>
			<div
				className={clsx(
					"relative flex aspect-square h-auto w-full flex-row items-center justify-center bg-transparent p-8 shadow-inner shadow-black/30 sm:aspect-auto sm:h-96 sm:w-1/2 sm:justify-end sm:px-16 md:px-20",
					{ "flex-row-reverse": props.flipped },
				)}
			>
				{pokemon !== null ? (
					!favorited ? (
						<motion.div
							initial={props.flipped ? { x: -300 } : { x: 300 }}
							animate={{ x: 0 }}
							transition={{ duration: 0.5 }}
						>
							<Image
								src={pokemon?.sprites?.default}
								alt={pokemon?.name}
								width={240}
								height={240}
								className="[image-rendering:pixelated]"
							/>
						</motion.div>
					) : (
						<motion.div
							initial={props.flipped ? { x: -300 } : { x: 300 }}
							animate={{ x: 0 }}
							transition={{ duration: 0.5 }}
						>
							<Image
								src={pokemon?.sprites?.default_shiny}
								alt={pokemon?.name}
								width={240}
								height={240}
								className="[image-rendering:pixelated]"
							/>
						</motion.div>
					)
				) : (
					<></>
				)}

				<button
					className={clsx(
						"absolute bottom-4 right-4 sm:bottom-auto sm:top-4",
						props.flipped ? "sm:left-4" : "sm:right-4",
					)}
					onClick={() => {
						toggleFavorite();
					}}
					key={key}
				>
					{favorited ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="h-8 w-8 text-red-500"
						>
							<path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="h-8 w-8"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
							/>
						</svg>
					)}
				</button>
			</div>
			<div
				className={clsx(
					"z-10 flex aspect-square h-auto w-full flex-row items-center justify-center gap-8 bg-details-bg-lt p-8  sm:aspect-auto sm:w-1/2 sm:justify-start dark:bg-details-bg-dt",
					{ "sm:justify-end": props.flipped },
				)}
			>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 1 }}
				>
					<div className="flex h-full w-full max-w-xs flex-col items-start justify-center rounded-xl">
						<p className="mb-4 text-lg font-semibold">
							{pokemon !== null
								? pokemonIdFormated + pokemonNameCapitalized
								: "Loading..."}
						</p>
						<div className="mb-2 flex gap-2 text-[0.65rem]">
							<p className="font-bold">Health Points:</p>
							<p className="">{pokemonHp}</p>
						</div>
						<div className="mb-2 flex gap-2 text-[0.65rem]">
							<p className="font-bold">Height:</p>
							<p className="">{pokemonHeight}</p>
						</div>
						<div className="mb-2 flex gap-2 text-[0.65rem]">
							<p className="font-bold">Weight:</p>
							<p className="">{pokemonWeight}</p>
						</div>
						<div className="mb-2 flex items-center gap-2 text-[0.64rem]">
							<p className="font-bold">Types:</p>
							{pokemon?.types.map((type, index) => (
								<TypeBadge key={index} type={type} />
							))}
						</div>
						{pokemonDetails !== undefined && (
							<div className="mb-1 text-[0.65rem]">
								<span className="font-bold">Details: </span>
								<span className="">{pokemonDetails}</span>
							</div>
						)}
					</div>
				</motion.div>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 1 }}
				>
					<div className="hidden h-full w-full max-w-xs flex-col justify-center gap-2 rounded-xl lg:flex">
						{pokemon !== null ? (
							<>
								<p className="text-[0.65rem] ">Full view:</p>
								<div className="flex h-16 w-full items-center justify-center">
									{!favorited ? (
										<Image
											src={pokemon?.sprites?.front_pixel}
											alt={pokemon?.name}
											width={96}
											height={96}
											className="[image-rendering:pixelated]"
										/>
									) : (
										<Image
											src={pokemon?.sprites?.front_shiny}
											alt={pokemon?.name}
											width={96}
											height={96}
											className="[image-rendering:pixelated]"
										/>
									)}

									{pokemon?.sprites?.back_pixel &&
										pokemon?.sprites?.back_shiny &&
										(!favorited ? (
											<Image
												src={
													pokemon?.sprites?.back_pixel
												}
												alt={pokemon?.name}
												width={96}
												height={96}
												className="[image-rendering:pixelated]"
											/>
										) : (
											<Image
												src={
													pokemon?.sprites?.back_shiny
												}
												alt={pokemon?.name}
												width={96}
												height={96}
												className="[image-rendering:pixelated]"
											/>
										))}
								</div>
							</>
						) : (
							<></>
						)}
					</div>
				</motion.div>
			</div>
		</div>
	);
};

const TypeBadge = (props: { type: PokemonTypes }) => {
	return (
		<p
			className={clsx(
				"flex  w-14 items-center justify-center rounded-full p-0.5 text-[0.5rem] text-details-bg-lt dark:text-text-lt",
				"bg-type-" + props.type,
			)}
		>
			{props.type}
		</p>
	);
};
