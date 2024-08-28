"use client"

import { motion } from 'framer-motion';
import { useTheme } from "next-themes";
import { LocateIcon } from 'lucide-react';
import Map, { MapRef, Marker } from 'react-map-gl';
import { useCallback, useRef, useEffect } from 'react';

import { cn } from '@/lib/utils';
import { Header } from './header';
import { Button } from './ui/button';
import { CountryDetails } from './country-details';
import { CountryData, useCountriesStore } from '@/stores/countries';

import 'mapbox-gl/dist/mapbox-gl.css';

// Load the Mapbox token from environment variables
const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const initialViewState = {
  zoom: 2,
  pitch: 0,
  bearing: 0,
  latitude: -10.7751,
  longitude: -58.4193,
};

export function CountriesMap() {
  const { theme } = useTheme();
  const mapRef = useRef<MapRef>(null);

  const {
    flyTo,
    setMapRef,
    countriesSelected,
    clearCountries,
    setFocusedIndex,
    focusedIndex,
    setPopupVisible,
  } = useCountriesStore((state) => state);

  useEffect(() => {
    setMapRef(mapRef);
  }, [setMapRef]);

  // Handles marker click event: focuses on the country and triggers the popup.
  const handleMarkerClick = useCallback((country: CountryData, index: number) => {
    setFocusedIndex(index);
    setTimeout(() => setPopupVisible(true), 1500);
    flyTo(country);
  }, [flyTo, setFocusedIndex, setPopupVisible]);

  // Clears the selection of countries and resets the map view.
  const handleClearSelection = useCallback(() => {
    clearCountries();
    if (mapRef.current) {
      mapRef.current.flyTo({
        ...initialViewState,
        duration: 2000,
      });
    }
  }, [clearCountries]);

  return (
    <div className='flex grow'>
      <Header />
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        initialViewState={initialViewState}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle={
          theme === "light"
            ? "mapbox://styles/mapbox/light-v11"
            : "mapbox://styles/mapbox/dark-v11"
        }
      >
        {focusedIndex !== null && countriesSelected[focusedIndex] && (
          <CountryDetails
            longitude={countriesSelected[focusedIndex].Longitude}
            latitude={countriesSelected[focusedIndex].Latitude}
          />
        )}

        {countriesSelected.map((country, index) => (
          <Marker
            key={country['ISO Code']}
            longitude={country.Longitude}
            latitude={country.Latitude}
            anchor="bottom"
            onClick={() => handleMarkerClick(country, index)}
          >
            <LocateIcon
              className={cn(
                'h-8 w-8 cursor-pointer hover:scale-110 transition-transform',
                focusedIndex === index ? 'text-[#facc16]' : 'text-black dark:text-white'
              )}
            />
          </Marker>
        ))}
      </Map>

      {countriesSelected.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            size="default"
            variant="outline"
            onClick={handleClearSelection}
            className="absolute bottom-8 left-8 sm:right-8 sm:left-[auto]"
          >
            Clear selection
          </Button>
        </motion.div>
      )}
    </div>
  );
}
