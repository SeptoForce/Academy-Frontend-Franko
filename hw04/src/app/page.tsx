import { Header } from "./header";
import { PokemonEntry } from "./pokemon-entry";
import PokemonList from "./pokemon-list";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-start">
			<Header />
			<PokemonList />
		</main>
	);
}
