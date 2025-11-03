// components/Clock/Clock.tsx

'use client'; // ⬅️ Must be a Client Component to use useState and useEffect

import React, { useState, useEffect } from 'react';

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // This runs only on the client
    const timerId = setInterval(() => setTime(new Date()), 1000);
    
    // Clean up the interval when the component unmounts
    return () => clearInterval(timerId);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="text-left">
      <p className="text-6xl font-bold">{formattedTime}</p>
      <p className="text-2xl text-gray-300">{formattedDate}</p>
    </div>
  );
}