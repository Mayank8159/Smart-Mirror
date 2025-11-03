// hooks/useNews.ts
import { useState, useEffect, useCallback } from 'react';

// Define the basic structure of a News Item
export interface NewsItem {
    id: number;
    headline: string;
}

// Mock Data (Replace with real API fetching later)
const MOCK_NEWS_HEADLINES: NewsItem[] = [
    { id: 1, headline: "Global markets react to unexpected interest rate decision." },
    { id: 2, headline: "Local council approves new public park project." },
    { id: 3, headline: "Tech analysis: The rise of ambient computing in smart devices." },
    { id: 4, headline: "Upcoming space mission delayed due to weather conditions." },
];

const ROTATION_INTERVAL_MS = 10000; // Rotate headline every 10 seconds

/**
 * Custom hook to manage and rotate a list of news headlines.
 */
export function useNews() {
    const [headlines, setHeadlines] = useState<NewsItem[]>(MOCK_NEWS_HEADLINES);
    const [currentHeadline, setCurrentHeadline] = useState<NewsItem | null>(null);

    // Function to rotate the headline
    const rotateHeadline = useCallback(() => {
        setHeadlines(prevHeadlines => {
            if (prevHeadlines.length === 0) return prevHeadlines;
            
            // Move the first headline to the end of the list
            const [first, ...rest] = prevHeadlines;
            const newHeadlines = [...rest, first];
            
            // Set the new current headline (which is the first item after rotation)
            setCurrentHeadline(newHeadlines[0]);
            
            return newHeadlines;
        });
    }, []);

    // Initial setup: set the very first headline
    useEffect(() => {
        if (headlines.length > 0) {
            setCurrentHeadline(headlines[0]);
        }
    }, [headlines]);

    // Set up the rotation interval
    useEffect(() => {
        if (headlines.length === 0) return;

        const intervalId = setInterval(rotateHeadline, ROTATION_INTERVAL_MS);

        return () => clearInterval(intervalId);
    }, [headlines, rotateHeadline]);

    // NOTE: If you integrate a real API, you'd add a useEffect block here to fetch the headlines.
    // E.g., fetchNews().then(setHeadlines);

    return { 
        currentHeadline,
        isLoading: false, // Assuming mock data is always ready
    };
}