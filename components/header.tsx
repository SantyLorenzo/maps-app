"use client"

import countries from '@/data/Countries.json'
import { Combobox } from './ui/combobox';
import { CountryData, useCountriesStore } from "@/stores/countries";

interface HeaderProps {
  onOptionChange: (country: CountryData) => void
}

export function Header({ onOptionChange }: HeaderProps) {
  const { updateCountriesSelected, countriesSelected, flyTo } = useCountriesStore((state) => state)
  const countriesParsed = countries.map((country) => ({ value: country.Country, label: country.Country }))

  const handleCountrySelect = (isoCode: string) => {
    // Find the complete country information
    const country = countries.find(country => country['Country'] === isoCode);

    if (country) {
      // Check if the country is already in the selected list
      const isAlreadySelected = countriesSelected.some(
        selected => selected['ISO Code'] === country['ISO Code']
      );

      if (isAlreadySelected) {
        // If already selected, fly to it
        flyTo(country);
      } else {
        // If not selected, add it to the list and fly to it
        onOptionChange(country);
        updateCountriesSelected([country]);
      }
    }
  };

  return (
    <header className="absolute z-10 top-8 left-8">
      <Combobox
        options={countriesParsed}
        onSelect={handleCountrySelect}
      />
    </header>
  );
}