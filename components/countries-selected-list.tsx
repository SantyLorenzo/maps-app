"use client"

import { AnimatePresence, motion } from "framer-motion"

import { TypographyH1 } from "./ui/typography-h1";
import { useCountriesStore, CountryData } from "@/stores/countries";
import { cn } from "@/lib/utils";

// Renders a list of selected countries. Clicking on a country triggers a fly-to action and shows the popup.
export const CountriesSelectedList = () => {
  const { countriesSelected, focusedIndex, setFocusedIndex, flyTo, setPopupVisible } = useCountriesStore((state) => state);

  if (countriesSelected.length < 1) {
    return null;
  }

  const handleCountryClick = (country: CountryData, index: number) => {
    setFocusedIndex(index);
    flyTo(country);
    setTimeout(() => setPopupVisible(true), 1500);
  };

  return (
    <AnimatePresence>
      <div className="absolute bottom-0 z-10 mb-24 ml-8 sm:m-8 flex flex-col">
        {countriesSelected.map((country, index) => (
          <motion.div
            key={country['ISO Code']}
            initial={{ x: -300, opacity: 0 }}
            exit={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <TypographyH1
              onClick={() => handleCountryClick(country, index)}
              className={cn(
                "hover:text-[#facc16] transition-colors duration-200 cursor-pointer",
                focusedIndex === index && "text-[#facc16]"
              )}
            >
              {country.Country}
            </TypographyH1>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}
