"use client"

import { X, SquareArrowOutUpRight } from "lucide-react";
import { gql, useSuspenseQuery } from '@apollo/client';

import { Button } from "./ui/button";
import { TypographyP } from './ui/typography-p';
import { TypographyH1 } from './ui/typography-h1';
import { useCountriesStore } from "@/stores/countries"

interface CountryDetails {
  __typename: "Country";
  name: string;
  native: string;
  capital: string;
  emoji: string;
  currency: string;
  languages: {
    __typename: "Language";
    code: string;
    name: string;
  }[];
}

interface CountryData {
  country: CountryDetails;
}

const GET_COUNTRY_DETAILS = gql`
query GetCountryDetails($code: ID!) {
  country(code: $code) {
    name
    native
    capital
    emoji
    currency
    languages {
      name
      code
    }
  }
}
`;

export const CountryDetails = () => {
  const { focusedCountry, closeDetails } = useCountriesStore((state) => state)
  const { data, error } = useSuspenseQuery<CountryData>(GET_COUNTRY_DETAILS, {
    skip: !focusedCountry,
    variables: { code: focusedCountry?.['ISO Code'] },
    errorPolicy: "ignore"
  });

  const handleClose = () => {
    closeDetails();
  };

  if (!focusedCountry) {
    return null
  }

  if (error) return (
    <div className="bg-white/90 dark:bg-black/90 max-h-[400px] overflow-y-auto absolute bottom-8 sm:bottom-auto top-auto sm:top-1/2 sm:-translate-y-1/2 right-8 z-10 p-6 sm:p-8 flex flex-col border border-[#facc16] rounded-lg shadow-lg">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleClose}
        className="absolute top-2 right-2"
        aria-label="Close details"
      >
        <X className="h-4 w-4" />
      </Button>
      <div className='flex flex-col gap-2 text-sm sm:text-lg'>
        <TypographyH1>{error.message}</TypographyH1>
      </div>
    </div>
  )

  return (
    <div className="bg-white/90 dark:bg-black/90 max-h-[400px] overflow-y-auto absolute sm:bottom-auto top-24 sm:top-1/2 sm:-translate-y-1/2 left-8 sm:left-auto sm:right-8 z-10 p-6 sm:p-8 flex flex-col border border-[#facc16] rounded-lg shadow-lg">
      <a className="flex gap-1 absolute bottom-3 right-3 text-[6px]" href="https://github.com/trevorblades/countries" target="_blank" rel="noopener noreferrer">
        https://countries.trevorblades.com
        <SquareArrowOutUpRight className="h-2 w-2" color="#facc16" />
      </a>
      <Button
        size="icon"
        variant="ghost"
        onClick={handleClose}
        className="absolute p-2 top-0 right-0 "
        aria-label="Close details"
      >
        <X className="h-4 w-4" />
      </Button>
      {data?.country && (
        <div className='flex flex-col gap-2 text-sm sm:text-lg'>
          <TypographyH1 className="mb-4">
            {data.country.name}
          </TypographyH1>
          <TypographyP>
            <strong>Native Name:</strong>
            {data.country.native}
          </TypographyP>
          <TypographyP>
            <strong>Capital:</strong>
            {data.country.capital}
          </TypographyP>
          <TypographyP>
            <strong>Emoji:</strong>
            {data.country.emoji}
          </TypographyP>
          <TypographyP>
            <strong>Currency:</strong>
            {data.country.currency}
          </TypographyP>
          <div className="mt-2">
            <strong>Languages:</strong>
            <ul className="list-disc list-inside">
              {data.country.languages.map((lang) => (
                <li key={lang.code}>{lang.name} ({lang.code})</li>
              ))}
            </ul>
          </div>
        </div>
      )
      }
    </div >
  )
}