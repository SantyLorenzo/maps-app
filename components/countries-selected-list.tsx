"use client"

import { TypographyH1 } from "./ui/typography-h1"
import { useCountriesStore, CountryData } from "@/stores/countries"
import { TypographyP } from "./ui/typography-p"
import { cn } from "@/lib/utils"

export const CountriesSelectedList = () => {
  const { countriesSelected, focusedCountry, updateFocusedCountry, flyTo } = useCountriesStore((state) => state)

  if (countriesSelected.length < 1) {
    return null
  }

  const handleCountryClick = (country: CountryData) => {
    updateFocusedCountry(country)
    flyTo(country)
  }

  return (
    <div className="absolute bottom-0 z-10 mb-24 ml-8 sm:m-8 flex flex-col">
      {countriesSelected.map((country) => (
        <TypographyH1
          key={country['ISO Code']}
          className={cn(
            "hover:text-[#facc16] transition-colors duration-200 cursor-pointer",
            focusedCountry && country['ISO Code'] === focusedCountry['ISO Code'] && "text-[#facc16]"
          )}
          onClick={() => handleCountryClick(country)}
        >
          {country.Country}
        </TypographyH1>
      ))
      }
    </div >
  )
}