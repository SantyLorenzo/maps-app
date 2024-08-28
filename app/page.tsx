import { ThemeToggle } from "@/components/theme-toggle";
import { CountriesMap } from "@/components/countries-map";
import { CountriesSelectedList } from "@/components/countries-selected-list";

export default function Home() {
  return (
    <main className="min-h-screen max-h-screen flex flex-col justify-between">
      <CountriesSelectedList />
      <CountriesMap />
      <ThemeToggle />
    </main>

  );
}
