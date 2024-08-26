"use client"

import 'mapbox-gl/dist/mapbox-gl.css';
import { useTheme } from "next-themes"
import { ScanIcon } from 'lucide-react';
import { useCallback, useRef, useEffect } from 'react';
import Map, { MapRef, Marker } from 'react-map-gl';

import { Header } from './header';
import { Button } from './ui/button';
import { CountryData, useCountriesStore } from '@/stores/countries';
import { VFXProvider } from 'react-vfx';

const mapboxToken = "pk.eyJ1Ijoic2FudGk0MjAiLCJhIjoiY20wYWFpbHYwMjAwbzJqb3BjOTN6cGN2YiJ9.rsNMX34bs4lrzGo96YVn1A"

export function CountriesMap() {
  const { theme } = useTheme()
  const mapRef = useRef<MapRef>(null);
  const {
    flyTo,
    setMapRef,
    countriesSelected,
    removeCountriesSelected,
  } = useCountriesStore((state) => state)

  useEffect(() => {
    setMapRef(mapRef)
  }, [setMapRef])

  const initialViewState = {
    zoom: 2,
    pitch: 0,
    bearing: 0,
    latitude: -10.7751,
    longitude: -58.4193,
  };

  const onCountrySelect = useCallback((country: CountryData) => {
    flyTo(country);
  }, [flyTo]);

  const handleMarkerClick = useCallback((country: CountryData) => {
    flyTo(country);
  }, [flyTo]);

  return (
    <div className='flex grow'>
      <Header onOptionChange={onCountrySelect} />
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        initialViewState={initialViewState}
        style={{
          width: "100vw",
          height: "100vh"
        }}
        mapStyle={theme === "light"
          ? "mapbox://styles/mapbox/light-v11"
          : "mapbox://styles/mapbox/dark-v11"
        }
      >
        {countriesSelected.map((country) => (
          <Marker
            key={country['ISO Code']}
            longitude={country.Longitude}
            latitude={country.Latitude}
            anchor="bottom"
            onClick={() => handleMarkerClick(country)}
          >
            <ScanIcon className="h-8 w-8 text-[#facc16] cursor-pointer hover:scale-110 transition-transform" />
          </Marker>
        ))}
      </Map>

      {countriesSelected.length > 0 && (
        <Button
          size="default"
          variant="outline"
          onClick={removeCountriesSelected}
          className="absolute bottom-8 left-8 sm:right-8 sm:left-[auto]"
        >
          Clear selection
        </Button>
      )}
    </div>
  )
}