// components/Calendar/Calendar.tsx

'use client'; // ⬅️ Must be a Client Component to fetch/display user-specific data

import React from 'react';

// Mock data
const upcomingEvents = [
  { time: '10:00', title: 'Team Standup' },
  { time: '14:30', title: 'Dentist Appointment' },
  { time: '19:00', title: 'Dinner with Sarah' },
];

export default function Calendar() {
  if (upcomingEvents.length === 0) {
    return (
      <div className="text-2xl text-gray-500">No events today.</div>
    );
  }

  return (
    <div className="text-right">
      <h3 className="text-3xl font-bold mb-4">Upcoming Events</h3>
      <ul className="space-y-2">
        {upcomingEvents.map((event, index) => (
          <li key={index} className="text-xl">
            <span className="font-semibold text-green-400 mr-2">{event.time}</span>
            <span className="text-gray-200">{event.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}