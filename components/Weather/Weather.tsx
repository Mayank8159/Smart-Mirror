// components/Weather/Weather.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from '../../lib/weather-api';
import { WeatherData } from '../../types/module-types';

/**
 * Client component to fetch and display current weather information.
 * It handles the API call and error states.
 */
export default function Weather() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadWeather() {
            try {
                // Fetch data from the API client (which fetches from Open-Meteo)
                const data = await fetchWeatherData();
                setWeather(data);
                setError(null);
            } catch (err) {
                console.error("Failed to load weather data:", err);
                setError("Failed to load weather data.");
            } finally {
                setLoading(false);
            }
        }
        
        loadWeather();

        // Optional: Set up interval for refreshing weather data every 10 minutes (600000 ms)
        // Note: The Next.js fetch cache setting handles server-side revalidation, 
        // but this ensures client-side updates if the mirror stays open.
        const interval = setInterval(loadWeather, 600000); 

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <div className="text-2xl text-gray-500">Loading Weather...</div>;
    }

    if (error) {
        return (
            <div className="text-lg text-red-500 max-w-xs p-2 rounded bg-black/50">
                {error}
            </div>
        );
    }

    if (!weather) {
        return <div className="text-2xl text-gray-500">Weather data unavailable.</div>;
    }

    // Use Intl.NumberFormat to correctly format the temperature number with degree symbol
    const formattedTemp = new Intl.NumberFormat('en-IN', {
        style: 'unit',
        unit: 'celsius',
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
    }).format(weather.temp);


    return (
        <div className="flex flex-col items-start space-y-2 text-white/90">
            {/* Weather Icon and Temperature */}
            <div className="flex items-center space-x-2">
                <span className="text-4xl">{weather.icon}</span>
                <span className="text-5xl font-light tracking-tight">{formattedTemp}</span>
            </div>

            {/* Condition and Location */}
            <p className="text-xl font-thin opacity-80">
                {weather.condition}
            </p>
            <p className="text-sm font-light text-gray-400">
                {weather.city}
            </p>
        </div>
    );
}
