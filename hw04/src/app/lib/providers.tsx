"use client";
import { createContext, useState } from "react";

interface RefreshContextType {
	key: number;
	refreshFavorites: () => void;
}

export const RefreshContext = createContext<RefreshContextType>({
	key: 0,
	refreshFavorites: () => {},
});

export const RefreshProvider = (props: { children: React.ReactNode }) => {
	const [key, setKey] = useState<number>(0);

	const refreshFavorites = () => {
		setKey((prevKey) => prevKey + 1);
	};

	return (
		<RefreshContext.Provider value={{ key, refreshFavorites }}>
			{props.children}
		</RefreshContext.Provider>
	);
};
export default RefreshProvider;
