import { gql } from '@apollo/client';

export interface CountryDetailsResponse {
  country: {
    __typename: "Country";
    name: string;
    capital: string;
    emoji: string;
    currency: string;
    phone: string;
    languages: {
      __typename: "Language";
      name: string;
    }[];
    continent: {
      __typename: "Continent";
      name: string;
    };
  }
}

export const GET_COUNTRY_DETAILS = gql`
  query GetCountryDetails($code: ID!) {
    country(code: $code) {
      name
      capital
      emoji
      currency
      phone
      continent {
        name
      }
      languages {
        name
      }
    }
  }
`;
