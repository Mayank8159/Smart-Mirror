// lib/weather-api.ts

import { WeatherData } from '@/types/module-types'; 
// The utility formatter is removed as the Weather component now handles formatting.

// --- Open-Meteo API Configuration (Free & No API Key Required) ---
const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

// Hardcoded Location for the Smart Mirror (Howrah, India)
const LATITUDE = 22.58; 
const LONGITUDE = 88.32; 

/**
 * Maps the raw weather code from Open-Meteo API to a displayable emoji icon.
 * Reference: https://www.open-meteo.com/en/docs
 * @param code - The WMO Weather code (e.g., 2 for "Partly cloudy").
 * @returns A corresponding weather emoji.
 */
function getWeatherIcon(code: number): string {
    // Grouping WMO codes for simplicity
    if (code === 0) return '☀️'; // Clear sky
    if (code >= 1 && code <= 3) return '🌤️'; // Mostly clear to cloudy
    if (code >= 45 && code <= 48) return '🌫️'; // Fog
    if (code >= 51 && code <= 57) return '🌧️'; // Drizzle / light rain
    if (code >= 61 && code <= 67) return '🌧️'; // Rain
    if (code >= 71 && code <= 75) return '❄️'; // Snow fall
    if (code >= 80 && code <= 82) return '🌧️'; // Rain showers
    if (code >= 85 && code <= 86) return '❄️'; // Snow showers
    if (code >= 95) return '⛈️'; // Thunderstorm
    return '❓'; // Unknown
}

/**
 * Fetches current weather data for the configured location.
 * @returns A promise resolving to formatted WeatherData.
 */
export async function fetchWeatherData(): Promise<WeatherData> {
    const url = `${BASE_URL}?latitude=${LATITUDE}&longitude=${LONGITUDE}&current_weather=true&temperature_unit=celsius&timezone=auto`;

    try {
        // Next.js fetch cache setting: revalidate every 10 minutes
        // This is primarily for Server Components, but remains good practice.
        const response = await fetch(url, { next: { revalidate: 600 } }); 

        if (!response.ok) {
            throw new Error(`Weather API HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();
        
        // Data is under the 'current_weather' object
        const currentData = json.current_weather;

        if (!currentData) {
            throw new Error("API response is missing current weather data.");
        }

        // Map raw API response to the clean WeatherData type. 
        // Note: temperature is passed as a number.
        return {
            temp: currentData.temperature, 
            condition: `Code ${currentData.weathercode}`, 
            icon: getWeatherIcon(currentData.weathercode),
            city: "Howrah, IN", 
        };

    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw new Error(error instanceof Error ? error.message : "Failed to fetch weather data.");
    }
}
