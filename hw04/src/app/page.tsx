import { Header } from "./header";
import { PokemonEntry } from "./pokemon-entry";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <Header />
      <PokemonEntry alternate={false} />
      <PokemonEntry alternate={true} />
    </main>
  );
}
