"use client"

import { Popup } from 'react-map-gl';
import { motion } from "framer-motion"
import { useSuspenseQuery } from '@apollo/client';

import { Button } from "./ui/button";
import { TypographyP } from './ui/typography-p';
import { TypographyH1 } from './ui/typography-h1';
import { useCountriesStore } from "@/stores/countries";
import { CountryDetailsResponse, GET_COUNTRY_DETAILS } from "@/api/countries";

interface CountryDetailsProps {
  latitude: number;
  longitude: number;
}

export const CountryDetails = ({ latitude, longitude }: CountryDetailsProps) => {
  const {
    focusedIndex,
    popupVisible,
    setPopupVisible,
    countriesSelected,
  } = useCountriesStore((state) => state);
  const focusedCountry = focusedIndex !== null ? countriesSelected[focusedIndex] : null;

  const { data, error } = useSuspenseQuery<CountryDetailsResponse>(GET_COUNTRY_DETAILS, {
    skip: !focusedCountry,
    variables: { code: focusedCountry?.['ISO Code'] },
  });

  if (
    !data ||
    !popupVisible ||
    !focusedCountry
  ) {
    return null
  }

  if (error) {
    return (
      <Popup
        offset={20}
        anchor='bottom'
        maxWidth='320px'
        latitude={latitude}
        longitude={longitude}
        style={{ padding: 0 }}
        onClose={() => setPopupVisible(false)}
      >
        <div className='flex flex-col px-2 mr-2'>
          <TypographyP>
            Error loading country details. Please try refreshing the page.
          </TypographyP>
          <Button onClick={() => window.location.reload()}>Reload</Button>
        </div>
      </Popup>
    )
  }

  const languageText = data.country.languages.length === 1
    ? `The primary language spoken is ${data.country.languages[0].name}.`
    : `The primary languages spoken are ${data.country.languages.map(lang => lang.name).join(", ")}.`;


  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Popup
        latitude={latitude}
        longitude={longitude}
        style={{ padding: 0 }}
        offset={20}
        maxWidth='320px'
        onClose={() => setPopupVisible(false)}
      >
        <div className='flex flex-col px-2 mr-2'>
          <TypographyH1 className="mb-2 text-xl dark:text-black">
            {data.country.name}
          </TypographyH1>
          <TypographyP>
            Located in {data.country.continent.name}, its capital is {data.country.capital}.
            <br />
            The currency used is {data.country.currency}.
            <br />
            {languageText}
            <br />
            It is represented by the emoji {data.country.emoji}.
          </TypographyP>
        </div>
      </Popup>
    </motion.div>
  );
}
