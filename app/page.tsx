import { CountriesSelectedList } from "@/components/countries-selected-list";
import { CountryDetails } from "@/components/country-details";
import { CountriesMap } from "@/components/map";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="min-h-screen max-h-screen flex flex-col justify-between">
      <CountriesSelectedList />
      <CountriesMap />
      <CountryDetails />
      <ThemeToggle />
    </main>

  );
}
