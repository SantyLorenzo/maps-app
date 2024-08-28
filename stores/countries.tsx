import { create } from 'zustand';
import { MapRef } from 'react-map-gl';

export interface CountryData {
  'Country': string;
  'ISO Code': string;
  'Latitude': number;
  'Longitude': number;
}

interface CountrySelectionState {
  countriesSelected: CountryData[];
  focusedIndex: number | null;
  popupVisible: boolean;
  addCountry: (country: CountryData) => void;
  clearCountries: () => void;
  setFocusedIndex: (index: number | null) => void;
  setPopupVisible: (visible: boolean) => void;
}

interface MapState {
  mapRef: React.RefObject<MapRef> | null;
  setMapRef: (ref: React.RefObject<MapRef>) => void;
  flyTo: (country: CountryData) => void;
}

export const useCountriesStore = create<CountrySelectionState & MapState>((set, get) => ({
  focusedIndex: null,
  popupVisible: false,
  countriesSelected: [],
  mapRef: null,
  addCountry: (country) => {
    set((state) => {
      const index = state.countriesSelected.findIndex(c => c['ISO Code'] === country['ISO Code']);
      if (index === -1) {
        return {
          countriesSelected: [...state.countriesSelected, country],
          focusedIndex: state.countriesSelected.length,
          popupVisible: true,
        };
      } else {
        return {
          focusedIndex: index,
          popupVisible: true,
        };
      }
    });
  },
  clearCountries: () => set({ countriesSelected: [], focusedIndex: null, popupVisible: false }),
  setFocusedIndex: (index) => set({ focusedIndex: index, popupVisible: true }),
  setPopupVisible: (visible) => set({ popupVisible: visible }),
  setMapRef: (ref) => set({ mapRef: ref }),
  flyTo: (country) => {
    const { mapRef, countriesSelected } = get();
    if (mapRef && mapRef.current) {
      mapRef.current.flyTo({
        center: [country.Longitude, country.Latitude],
        zoom: 5,
        duration: 2000,
      });
    }
    const index = countriesSelected.findIndex(c => c['ISO Code'] === country['ISO Code']);
    if (index !== -1) {
      set({ focusedIndex: index, popupVisible: true });
    }
  },
}));
