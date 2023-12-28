"use client";
import QRCode from 'qrcode.react';
import React, { useState } from 'react';
import { FaCheck, FaTimes, FaEye, FaCalendar } from 'react-icons/fa';
import Image from 'next/image';

interface Appointment {
  name: string;
  location: string;
  selectedDate: string;
  selectedTime: string;
}

export default function Home() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showQRCodeIndex, setShowQRCodeIndex] = useState<number | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'date':
        setSelectedDate(value);
        break;
      case 'time':
        setSelectedTime(value);
        break;
      case 'location':
        setLocation(value);
        break;
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newAppointment: Appointment = { name, location, selectedDate, selectedTime };
    setAppointments(prevAppointments => [...prevAppointments, newAppointment]);
    setShowQRCodeIndex(appointments.length);
  };

  const handleRemoveAppointment = (index: number) => {
    setAppointments(prevAppointments => prevAppointments.filter((_, i) => i !== index));
  };

  const handleToggleQRCode = (index: number) => {
    setShowQRCodeIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const formatGoogleCalendarURL = (appointment: Appointment) => {
    const formatISODate = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, '');

    const startDate = new Date(appointment.selectedDate + 'T' + appointment.selectedTime);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

    const params = {
      action: 'TEMPLATE',
      text: appointment.name,
      dates: `${formatISODate(startDate)}/${formatISODate(endDate)}`,
      location: appointment.location,
      details: 'Created via QR Code on Cita',
    };

    const url = new URL('https://www.google.com/calendar/render');
    Object.keys(params).forEach(key => url.searchParams.append(key, (params as any)[key]));

    return url.toString();
  };

  return (
    <main className="flex min-h-screen flex-col p-12">
      <Image className="mb-20" src="/Cita.png" alt="Logo" width={300} height={300} />

      <div className='flex flex-col items-center justify-center'>

        <h1 className="text-2xl font-bold">Next Appointment:</h1>
        <div className="flex m-5">
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="name"
              className="border border-gray-300 rounded-md px-1 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-black mr-2 mb-5"
              placeholder="Name and title"
              value={name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="location"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-black mr-2 mb-5"
              placeholder="Location"
              value={location}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="date"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-black mr-2 mb-5"
              value={selectedDate}
              onChange={handleInputChange}
            />
            <input
              type="time"
              name="time"
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-black mr-2 mb-5"
              value={selectedTime}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            >
              <FaCheck />
            </button>
          </form>
        </div>
      </div>

      <div className='flex flex-col items-center'>
        <h1 className="text-2xl font-bold">Recent Appointments:</h1>

        {appointments.map((appointment, index) => (
          <div key={index} className="flex items-center">
            <p className='mr-5 mt-3 mb-3'>{appointment.name}, {new Date(appointment.selectedDate).toLocaleDateString()} - {appointment.selectedTime}</p>

            {showQRCodeIndex === index && (
              <QRCode
                className="mr-5 mt-5 mb-5"
                value={formatGoogleCalendarURL(appointment)}
              />
            )}
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-3"
              onClick={() => handleToggleQRCode(index)}
            >
              <FaEye />
            </button>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-7"
              onClick={() => window.open(formatGoogleCalendarURL(appointment), '_blank')}
            >
              <FaCalendar />
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
