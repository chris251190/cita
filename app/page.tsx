"use client"
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

export default function Home() {
  const [name, setName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleButtonClick = () => {
    console.log(`Name: ${name}, Selected Date: ${selectedDate}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex">
        <input
          type="text"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="date"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleButtonClick}
        >
          <FaCheck /> {/* Replace "Display" with the checkmark icon */}
        </button>
      </div>
    </main>
  );
}
