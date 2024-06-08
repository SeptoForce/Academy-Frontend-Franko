import { Header } from "./header";
import RefreshProvider from "./context/providers";
import PokemonList from "./components/pokemon-list";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-start">
			<RefreshProvider>
				<Header />
				<PokemonList />
			</RefreshProvider>
		</main>
	);
}
