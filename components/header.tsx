"use client"

import { motion } from 'framer-motion';

import countries from '@/data/countries.json'
import { Combobox } from './ui/combobox';
import { useCountriesStore } from "@/stores/countries";

export function Header() {
  const { addCountry, flyTo } = useCountriesStore((state) => state)
  const countriesParsed = countries.map((country) => ({ value: country.Country, label: country.Country }))

  const handleCountrySelect = async (isoCode: string) => {
    const country = countries.find(country => country['Country'] === isoCode);

    if (country) {
      flyTo(country);
      addCountry(country);
    }
  };

  return (
    <header className="absolute z-10 top-8 left-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Combobox
          options={countriesParsed}
          onSelect={handleCountrySelect}
        />
      </motion.div>
    </header>
  );
}