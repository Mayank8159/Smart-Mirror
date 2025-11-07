import { useState, useEffect, useCallback } from 'react';

export interface NewsItem {
  id: number;
  headline: string;
}

const ROTATION_INTERVAL_MS = 10000;

export function useNews() {
  const [headlines, setHeadlines] = useState<NewsItem[]>([]);
  const [currentHeadline, setCurrentHeadline] = useState<NewsItem | null>(null);

  const rotateHeadline = useCallback(() => {
    setHeadlines(prev => {
      if (prev.length === 0) return prev;
      const [first, ...rest] = prev;
      const newHeadlines = [...rest, first];
      setCurrentHeadline(newHeadlines[0]);
      return newHeadlines;
    });
  }, []);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch(
          `https://newsdata.io/api/1/news?apikey=pub_1e01fba53f62476c82852280bbbde6ad&q=kolkata&country=in&language=en`
        );
        const data = await response.json();

        if (Array.isArray(data.results)) {
          const parsed: NewsItem[] = data.results.map((item: any, index: number) => ({
            id: index,
            headline: item.title,
          }));
          setHeadlines(parsed);
          if (parsed.length > 0) setCurrentHeadline(parsed[0]);
        } else {
          console.error("Unexpected API structure:", data);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    }

    fetchNews();
  }, []);

  useEffect(() => {
    if (headlines.length === 0) return;
    const intervalId = setInterval(rotateHeadline, ROTATION_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, [headlines, rotateHeadline]);

  return {
    currentHeadline,
    isLoading: headlines.length === 0,
  };
}