"use client";
import QRCode from 'qrcode.react';
import React, { useState } from 'react';
import { FaTimes, FaEye, FaCalendar, FaPlus, FaMinus, FaQrcode } from 'react-icons/fa';
import Image from 'next/image';

interface Appointment {
  title: string;
  location: string;
  selectedDate: string;
  selectedTime: string;
  selectedDuration?: string;
}

type InputFieldProps = {
  title?: string;
  additionalClasses?: string;
  type: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField: React.FC<InputFieldProps> = ({ type, name, placeholder, value, onChange, additionalClasses, title }) => (
  <>
    {title && <label className="font-bold mb-1"> {title}</label>}
    <input
      type={type}
      name={name}
      className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 text-black mr-2 mb-5 ${additionalClasses}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </>
);

export default function Cita() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [selectedDuration, setSelectedDuration] = useState('01:00');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showQRCodeIndex, setShowQRCodeIndex] = useState<number | null>(null);
  const [showLocation, setShowLocation] = useState(false);
  const [showDuration, setShowDuration] = useState(false);

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
      case 'selectedDuration':
        setSelectedDuration(value);
        break;
      case 'location':
        setLocation(value);
        break;
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newAppointment: Appointment = { title, location, selectedDate, selectedTime , selectedDuration};
    setAppointments(prevAppointments => [...prevAppointments, newAppointment]);
    setShowQRCodeIndex(0);
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
    <main className="flex flex-col items-center bg-gradient-to-r from-yellow-500 to-orange-500 bg-repeat-x bg-cover min-h-screen">
      <div className="w-full flex justify-center">
        <Image src="/Cita.png" alt="Logo" width={200} height={200} />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-5">Next Appointment:</h1>
        <div>
          <form className="flex flex-col items-center justify-center" onSubmit={handleFormSubmit}>
            <InputField
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={handleInputChange}
            />

            <div className="flex items-center">
              {showLocation && (
                <InputField
                  additionalClasses="ml-4"
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={location}
                  onChange={handleInputChange}
                />)}
              <button className="font-bold rounded mb-5" type="button" onClick={() => setShowLocation(!showLocation)}>
                {showLocation ? <FaMinus className="text-red-500 hover:text-red-600" /> : <div className="flex items-center text-blue-600 hover:text-blue-500">
                  <FaPlus />
                  <span className="ml-1">Add location (optional)</span>
                </div>}
              </button>
            </div>
            <InputField
              title='Date:'
              type="date"
              name="selectedDate"
              value={selectedDate}
              onChange={handleInputChange}
            />
            <InputField
              title='When:'
              type="time"
              name="selectedTime"
              value={selectedTime}
              onChange={handleInputChange}
            />

            <div className="flex items-center">
              {showDuration &&
                <InputField
                  title="Duration:"
                  type="time"
                  additionalClasses="ml-4"
                  name="selectedDuration"
                  value={selectedDuration}
                  onChange={handleInputChange}
                />}
              <button className="font-bold rounded mb-5" type="button" onClick={() => setShowDuration(!showDuration)}>
                {showDuration ? <FaMinus className="text-red-500 hover:text-red-600" /> : <div className="flex items-center text-blue-600 hover:text-blue-500">
                  <FaPlus />
                  <span className="ml-1">Add duration (optional)</span>
                </div>}
              </button>
            </div>

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mb-5">
              <div className='flex items-center'><p className='mr-2'>Create Appointment</p> <FaQrcode /></div>

            </button>
          </form>
        </div>
      </div>

      <div>
        {showQRCodeIndex !== null && (
          <h1 className="text-2xl font-bold mb-5">Recent Appointments:</h1>
        )}

        {[...appointments].reverse().map((appointment, index) => (
          <div key={index} className="mb-10 flex flex-col items-center justify-center font-bold">
            <p>{appointment.title ? appointment.title : ''}</p>
            {appointment.location && (<p>Where: {appointment.location} h</p>)}
            <p>Date: {new Date(appointment.selectedDate).toLocaleDateString()}</p>
            <p>When: {appointment.selectedTime} h</p>
            <p>Duration: {appointment.selectedDuration} h</p>

            {showQRCodeIndex === index && (
              <QRCode
                className="mt-3 mb-3"
                value={formatGoogleCalendarURL(appointment)}
              />
            )}

            <div className='flex justify-center items-center'>
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
                className="text-red-500 hover:text-red-700 font-bold py-1 rounded"
                onClick={() => handleRemoveAppointment(index)}
              >
                <FaTimes size={25} />
              </button>
            </div>

          </div>
        ))}
      </div>
    </main>
  );
}
