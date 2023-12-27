"use client";
import QRCode from 'qrcode.react';
import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function Home() {
  const [name, setName] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('');
  const [appointments, setAppointments] = useState<{ name: string; selectedDate: string; selectedTime: string }[]>([]);
  const [showQRCode, setShowQRCode] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(event.target.value);
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    const newAppointment = { name, selectedDate, selectedTime };
    setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
    setShowQRCode(true);
  };

  const handleRemoveAppointment = (index: number) => {
    setAppointments((prevAppointments) => {
      return prevAppointments.filter((_, i) => i !== index);
    });
  };

  const lastAppointment = appointments[appointments.length - 1];

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-2xl font-bold">Next Appointment:</h1>
      <div className="flex m-5">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black mr-2"
            placeholder="Enter your name"
            value={name}
            onChange={handleNameChange}
          />
          <input
            type="date"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black mr-2"
            value={selectedDate || new Date().toISOString().split('T')[0]}
            onChange={handleDateChange}
          />
          <input
            type="time"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black mr-2"
            value={selectedTime || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            onChange={handleTimeChange}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            <FaCheck />
          </button>
        </form>
      </div>
      {showQRCode && lastAppointment && (
        <QRCode className="mb-5" value={`${lastAppointment.name}, ${lastAppointment.selectedDate}, ${lastAppointment.selectedTime}`} />
      )}
      <div>
        {appointments.map((appointment, index) => (
          <div key={index} className="flex items-center">
            <p className='mr-5 mt-3 mb-3'>{appointment.name}, {new Date(appointment.selectedDate).toLocaleDateString()} - {appointment.selectedTime}</p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              onClick={() => handleRemoveAppointment(index)}
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
