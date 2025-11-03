// types/module-types.ts

// --- Weather Module Types ---
export interface WeatherData {
    // Temperature is a number (raw data) as formatting is now handled by the component.
    temp: number; 
    condition: string;
    icon: string;
    city: string;
}

// --- News Module Types (Placeholder for NewsFeed component) ---
export interface NewsItem {
    id: string;
    title: string;
    source: string;
    url: string;
}

// --- Calendar Module Types (Placeholder for Calendar component) ---
export interface CalendarEvent {
    id: string;
    time: string; // e.g., "10:00 AM"
    description: string;
}
