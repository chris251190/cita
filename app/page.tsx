"use client";
import QRCode from 'qrcode.react';
import React, { useState } from 'react';
import { FaCheck, FaTimes, FaEye, FaCalendar } from 'react-icons/fa';
import Image from 'next/image';

interface Appointment {
  title: string;
  location: string;
  selectedDate: string;
  selectedTime: string;
}

type InputFieldProps = {
  type: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField: React.FC<InputFieldProps> = ({ type, name, placeholder, value, onChange }) => (
  <input
    type={type}
    name={name}
    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-black mr-2 mb-5"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export default function Cita() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showQRCodeIndex, setShowQRCodeIndex] = useState<number | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'selectedDate':
        setSelectedDate(value);
        break;
      case 'selectedTime':
        setSelectedTime(value);
        break;
      case 'location':
        setLocation(value);
        break;
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newAppointment: Appointment = { title, location, selectedDate, selectedTime };
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
      text: appointment.title,
      dates: `${formatISODate(startDate)}/${formatISODate(endDate)}`,
      location: appointment.location,
      details: 'Created via QR Code on Cita',
    };

    const url = new URL('https://www.google.com/calendar/render');
    Object.keys(params).forEach(key => url.searchParams.append(key, (params as any)[key]));

    return url.toString();
  };

  return (
    <main className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-repeat-x bg-cover h-screen">
      <Image className="mb-20" src="/Cita.png" alt="Logo" width={200} height={200} />

      <div className=''>

        <h1 className="text-2xl font-bold">Next Appointment:</h1>
        <div className="">
          <form onSubmit={handleFormSubmit}>
            <InputField
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={handleInputChange}
            />
            <InputField
              type="text"
              name="location"
              placeholder="Location"
              value={location}
              onChange={handleInputChange}
            />
            <InputField
              type="date"
              name="selectedDate"
              value={selectedDate}
              onChange={handleInputChange}
            />
            <InputField
              type="time"
              name="selectedTime"
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

      <div className=''>
        <h1 className="text-2xl font-bold">Recent Appointments:</h1>

        {appointments.map((appointment, index) => (
          <div key={index} className="">
            <p className='mr-5 mt-3 mb-3'>{appointment.title}, {new Date(appointment.selectedDate).toLocaleDateString()} - {appointment.selectedTime}</p>

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
