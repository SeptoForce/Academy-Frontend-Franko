"use client";

import clsx from "clsx";
import {
	MAX_POKEMON_ID,
	type Pokemon,
	type PokemonTypes,
} from "./lib/definitions";
import { fetchPokemonById } from "./lib/pokeapi";
import { useEffect, useState } from "react";
import Image from "next/image";

export const PokemonEntry = (props: {
	flipped: boolean;
	pokemonId: number;
}) => {
	const [pokemon, setPokemon] = useState<Pokemon | null>(null);

	useEffect(() => {
		if (props.pokemonId > MAX_POKEMON_ID) {
			return;
		}
		fetchPokemonById(props.pokemonId).then((pokemon) => {
			setPokemon(pokemon);
		});
	}, [props.pokemonId]);

	if (props.pokemonId > MAX_POKEMON_ID) {
		return <></>;
	}

	// iron-vailent should be "Iron Valiant"
	const capitalizedPokemonName =
		pokemon !== null
			? pokemon.name
					.split("-")
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(" ")
			: null;

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
					"flex h-auto w-full flex-row items-center justify-center bg-transparent p-8 sm:h-72 sm:justify-end",
					{ "flex-row-reverse": props.flipped },
				)}
			>
				{pokemon !== null && (
					<Image
						src={pokemon?.sprites?.default}
						alt={pokemon?.name}
						width={240}
						height={240}
						className="[image-rendering:pixelated]"
					/>
				)}
			</div>
			<div
				className={clsx(
					"flex h-72 w-full flex-row items-center justify-center gap-8 bg-details-bg-lt p-8 shadow-inner shadow-black/30 sm:justify-start dark:bg-details-bg-dt",
					{ "sm:justify-end": props.flipped },
				)}
			>
				<div className="flex h-full w-full max-w-xs flex-col items-start justify-center rounded-xl">
					<p className="mb-2 text-lg font-semibold">
						{`#${pokemon?.id.toString().padStart(4, "0")} ` +
							capitalizedPokemonName ?? (
							<div className="h-4 w-16 rounded-full bg-black/10" />
						)}
					</p>
					<div className="mb-1 flex gap-1 text-[0.65rem]">
						<p className="font-bold">Health Points:</p>
						<p className="">{pokemonHp}</p>
					</div>
					<div className="mb-1 flex gap-1 text-[0.65rem]">
						<p className="font-bold">Height:</p>
						<p className="">{pokemonHeight}</p>
					</div>
					<div className="mb-1 flex gap-1 text-[0.65rem]">
						<p className="font-bold">Weight:</p>
						<p className="">{pokemonWeight}</p>
					</div>
					<div className="mb-1 flex items-center gap-1 text-[0.64rem]">
						<p className="mr-1 font-bold">Type:</p>
						{pokemon?.types !== undefined ? (
							pokemon.types.map((type, index) => (
								<TypeBadge key={index} type={type} />
							))
						) : (
							<></>
						)}
					</div>
					{pokemonDetails !== undefined && (
						<div className="mb-1 text-[0.65rem]">
							<span className="font-bold">Details: </span>
							<span className="">{pokemonDetails}</span>
						</div>
					)}
				</div>
				<div className="hidden h-full w-full max-w-xs flex-col justify-center gap-2 rounded-xl lg:flex">
					<p className="text-[0.65rem] ">Full view:</p>
					<div className="flex h-16 w-full items-center justify-center">
						{pokemon !== null && (
							<>
								<Image
									src={pokemon?.sprites?.front_pixel}
									alt={pokemon?.name}
									width={96}
									height={96}
									className="[image-rendering:pixelated]"
								/>
								{pokemon?.sprites?.back_pixel && (
									<Image
										src={pokemon?.sprites?.back_pixel}
										alt={pokemon?.name}
										width={96}
										height={96}
										className="[image-rendering:pixelated]"
									/>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

const TypeBadge = (props: { type: PokemonTypes }) => {
	return (
		<p
			className={clsx(
				"rounded-full px-2 text-[0.5rem] text-text-dt dark:text-text-lt",
				"bg-type-" + props.type,
			)}
		>
			{props.type}
		</p>
	);
};
