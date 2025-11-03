// hooks/useWeather.ts
import { useState, useEffect, useCallback } from 'react';

// Define the basic structure of the data the hook returns
export interface WeatherData {
  temp: number;
  condition: string;
  icon: string; // e.g., '01d' from OpenWeatherMap
  city: string;
}

// Define the hook's return value
interface UseWeatherResult {
  data: WeatherData | null;
  isLoading: boolean;
  error: string | null;
}

// Configuration
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY; // Ensure this is set in .env.local
const CITY = 'Howrah, IN'; // Your current location
const REFRESH_INTERVAL_MS = 600000; // 10 minutes

// -----------------------------------------------------

/**
 * Custom hook to fetch weather data and update it periodically.
 */
export function useWeather(): UseWeatherResult {
  const [data, setData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async () => {
    if (!API_KEY) {
      setError("Weather API key is missing.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // NOTE: Replace this with your actual Weather API endpoint
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();

      const newWeatherData: WeatherData = {
        temp: Math.round(json.main.temp),
        condition: json.weather[0].main,
        icon: getWeatherIcon(json.weather[0].icon),
        city: json.name,
      };

      setData(newWeatherData);
    } catch (e) {
      console.error("Failed to fetch weather:", e);
      setError("Could not retrieve weather data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Run initial fetch and set up interval
  useEffect(() => {
    fetchWeather(); // Initial fetch

    const intervalId = setInterval(fetchWeather, REFRESH_INTERVAL_MS);

    // Cleanup function to clear interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [fetchWeather]);

  return { data, isLoading, error };
}


// Simple utility to map API icon codes to a local emoji/icon (for demonstration)
function getWeatherIcon(iconCode: string): string {
  switch (iconCode.substring(0, 2)) {
    case '01': return '☀️'; // Clear Sky
    case '02': return '🌤️'; // Few Clouds
    case '03': return '☁️'; // Scattered Clouds
    case '04': return '☁️'; // Broken Clouds
    case '09': return '🌧️'; // Shower Rain
    case '10': return '🌦️'; // Rain
    case '11': return '⛈️'; // Thunderstorm
    case '13': return '❄️'; // Snow
    case '50': return '🌫️'; // Mist
    default: return '❓';
  }
}