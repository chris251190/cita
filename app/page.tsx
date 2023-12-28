"use client";
import QRCode from 'qrcode.react';
import React, { useState } from 'react';
import { FaCheck, FaTimes, FaQrcode } from 'react-icons/fa';


export default function Home() {
  const [name, setName] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [appointments, setAppointments] = useState<{ name: string; selectedDate: string; selectedTime: string }[]>([]);
  const [showQRCodeIndex, setShowQRCodeIndex] = useState<number | null>(null);

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
  };

  const handleRemoveAppointment = (index: number) => {
    setAppointments((prevAppointments) => {
      return prevAppointments.filter((_, i) => i !== index);
    });
  };

  const handleToggleQRCode = (index: number) => {
    setShowQRCodeIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const formatGoogleCalendarURL = (appointment: { name: any; selectedDate: any; selectedTime: any; }) => {
    const startDate = new Date(appointment.selectedDate + 'T' + appointment.selectedTime);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour later

    const params = {
      action: 'TEMPLATE',
      text: appointment.name,
      dates: `${startDate.toISOString().replace(/-|:|\.\d\d\d/g, '')}/${endDate.toISOString().replace(/-|:|\.\d\d\d/g, '')}`,
      details: 'Created via QR Code',
    };

    const url = new URL('https://www.google.com/calendar/render');
    Object.keys(params).forEach(key => url.searchParams.append(key, (params as any)[key]));

    return url.toString();
  };

  const lastAppointment = appointments[appointments.length - 1];

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-2xl font-bold">Next Appointment:</h1>
      <div className="flex m-5">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-black mr-2 mb-5"
            placeholder="Enter your name"
            value={name}
            onChange={handleNameChange}
          />
          <input
            type="date"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-black mr-2 mb-5"
            value={selectedDate || new Date().toISOString().split('T')[0]}
            onChange={handleDateChange}
          />
          <input
            type="time"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-black mr-2 mb-5"
            value={selectedTime || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            onChange={handleTimeChange}
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            <FaCheck />
          </button>
        </form>
      </div>

      <div className='flex min-h-screen flex-col items-center'>
        <h1 className="text-2xl font-bold">Recent Appointments:</h1>

        {appointments.map((appointment, index) => (
          <div key={index} className="flex items-center">
            <p className='mr-5 mt-3 mb-3'>{appointment.name}, {new Date(appointment.selectedDate).toLocaleDateString()} - {appointment.selectedTime}</p>

            {showQRCodeIndex === index ? (
              <QRCode
                className="mr-5 mt-5 mb-5"
                value={formatGoogleCalendarURL(appointment)}
              />
            ) : null}
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-3"
              onClick={() => handleToggleQRCode(index)}
            >
              <FaQrcode />
            </button>

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
