import { create } from 'zustand'
import { MapRef } from 'react-map-gl'

export interface CountryData {
  'Country': string
  'ISO Code': string
  'Latitude': number
  'Longitude': number
}

interface CountryState {
  countriesSelected: CountryData[]
  focusedCountry: CountryData | null
  mapRef: React.RefObject<MapRef> | null
  updateFocusedCountry: (country: CountryData) => void
  updateCountriesSelected: (countries: CountryData[]) => void
  removeCountriesSelected: () => void
  setMapRef: (ref: React.RefObject<MapRef>) => void
  flyTo: (country: CountryData) => void
  closeDetails: () => void
}

export const useCountriesStore = create<CountryState>((set, get) => ({
  countriesSelected: [],
  focusedCountry: null,
  mapRef: null,
  updateFocusedCountry: (country) => set({ focusedCountry: country }),
  updateCountriesSelected: (countries) => set((state) => ({
    countriesSelected: [...state.countriesSelected, ...countries]
  })),
  removeCountriesSelected: () => set({ countriesSelected: [], focusedCountry: null }),
  setMapRef: (ref) => set({ mapRef: ref }),
  flyTo: (country) => {
    const { mapRef, updateFocusedCountry } = get()
    if (mapRef && mapRef.current) {
      mapRef.current.flyTo({
        zoom: 5,
        duration: 2000,
        center: [country.Longitude, country.Latitude]
      })
    }
    updateFocusedCountry(country)
  },
  closeDetails: () => set({ focusedCountry: null })
}))