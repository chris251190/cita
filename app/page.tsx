"use client"
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

export default function Home() {
  const [name, setName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [appointments, setAppointments] = useState<{ name: string; selectedDate: string }[]>([]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleButtonClick = () => {
    const newAppointment = { name, selectedDate };
    setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-2xl font-bold">Next Appointment:</h1>
      <div className="flex m-5">
        <input
          type="text"
          className="border border-gray-300 rounded-md px-1 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black mr-2"
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
        />
        <input
          type="date"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black mr-2"
          value={selectedDate}
          onChange={handleDateChange}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleButtonClick}
        >
          <FaCheck />
        </button>
      </div>
      <div>
        {appointments.map((appointment, index) => (
          <p key={index}>{appointment.name}, {new Date(appointment.selectedDate).toLocaleDateString()}</p>
        ))}
      </div>
    </main>
  );
}
