import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { PokemonFavoriteCard } from "./pokemon-favorite-card";
import { MAX_POKEMON_ID } from "../lib/definitions";
import { RefreshContext } from "../context/providers";
import { motion } from "framer-motion";

export const FavoritesModal = (props: {
	isOpen: boolean;
	onClose: () => void;
}) => {
	const [favoritePokemon, setFavoritePokemon] = useState<number[]>([]);
	const { refreshFavorites } = useContext(RefreshContext);

	useEffect(() => {
		if (props.isOpen) {
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [props.isOpen]);

	useEffect(() => {
		let favoritePokemonTemp: number[] = [];
		for (let i = 1; i < MAX_POKEMON_ID; i++) {
			let favorite = localStorage.getItem(`favorite-${i}`);
			if (favorite) {
				favoritePokemonTemp.push(i);
			}
		}

		if (
			JSON.stringify(favoritePokemonTemp) !==
			JSON.stringify(favoritePokemon)
		) {
			setFavoritePokemon(favoritePokemonTemp);
		}
	}, [favoritePokemon]);

	const click = () => {
		refreshFavorites();
		props.onClose();
	};

	return props.isOpen ? (
		<div
			className={clsx(
				"fixed left-0 top-12 z-30 flex h-screen w-screen bg-black/50 transition-opacity duration-300 ease-in-out",
			)}
			onClick={click}
		>
			<div
				className={clsx(
					"fixed left-1/2 top-14 z-40 inline-grid h-[calc(100dvh-4rem)] w-[calc(100vw-1rem)] max-w-7xl -translate-x-1/2 grid-flow-row grid-cols-1 justify-items-center gap-6 overflow-x-hidden overflow-y-scroll rounded-xl bg-white p-4",
					"sm:top-1/2 sm:h-auto sm:max-h-[calc(100vh-8rem)] sm:min-h-64 sm:w-[calc(100vw-16rem)] sm:-translate-y-1/2",
					"lg:grid-cols-2",
					"xl:grid-cols-3",
					"dark:bg-header-dt",
				)}
				onClick={(e) => e.stopPropagation()}
			>
				{favoritePokemon.map((pokemonId) => (
					<PokemonFavoriteCard
						key={pokemonId}
						pokemonId={pokemonId}
					/>
				))}
			</div>
		</div>
	) : (
		<></>
	);
};
