"use client";
import QRCode from 'qrcode.react';
import React, { useState } from 'react';
import { FaTimes, FaEye, FaCalendar, FaPlus, FaMinus, FaQrcode, FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';
import InputField from './components/InputField';
import Appointment from './interfaces/Appointment';
import Footer from './components/Footer';
import Logo from './components/Logo';

export default function Cita() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const currentHour = new Date().getHours().toString().padStart(2, '0');
  const currentMinutes = new Date().getMinutes();
  const selectedMinutes = currentMinutes < 15 || currentMinutes >= 45 ? '00' : '30';
  const [selectedTime, setSelectedTime] = useState(`${currentHour}:${selectedMinutes}`);

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

    const newAppointment: Appointment = { title, location, selectedDate, selectedTime, selectedDuration };
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
    const [hours, minutes] = selectedDuration.split(':');
    const endDate = new Date(startDate.getTime() + (parseInt(hours) * 60 + parseInt(minutes)) * 60 * 1000);
    const params = {
      action: 'TEMPLATE',
      text: appointment.title,
      dates: `${formatISODate(startDate)}/${formatISODate(endDate)}`,
      location: appointment.location,
      details: 'Created with https://cita-three.vercel.app/',
    };

    const url = new URL('https://www.google.com/calendar/render');
    Object.keys(params).forEach(key => url.searchParams.append(key, (params as any)[key]));

    return url.toString();
  };

  const shareViaWhatsApp = async (appointment: Appointment) => {
    const formattedDate = new Date(appointment.selectedDate).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const longUrl = formatGoogleCalendarURL(appointment);
    const shortUrl = await shortenUrl(longUrl);
    const message = `\u{2757}${appointment.title}\n\u{1F551} ${formattedDate} at ${appointment.selectedTime} h\n\nCreate and share your own appointments on: https://cita-three.vercel.app/ \n\nAdd appointment to your calendar \u{1F4C5} ${shortUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shortenUrl = async (longUrl: string) => {
    const response = await fetch(`https://tinyurl.com/api-create.php?url=${longUrl}`);
    const shortUrl = await response.text();
    return shortUrl;
  };

  return (
    <main className="flex flex-col items-center bg-gradient-to-r from-yellow-500 to-orange-500 bg-repeat-x bg-cover min-h-screen">
      <Logo/>
      <div className="flex flex-col items-center justify-center mb-10">
        <h1 className="text-2xl font-bold mb-10">Create and share your next appointment!</h1>
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
                  additionalClasses="ml-4 mr-1"
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={location}
                  onChange={handleInputChange}
                />)}
              <button className="rounded mb-5" type="button" onClick={() => setShowLocation(!showLocation)}>
                {showLocation ? <FaMinus className="text-red-500 hover:text-red-600 hover:text-lg" /> : <div className="flex items-center text-orange-700 hover:text-orange-600 hover:text-lg">
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

            <div className="flex flex-col items-center">
              {showDuration &&
                <>
                  <label className="font-bold mb-2">Duration:</label>
                  <div className="flex items-center">
                    <InputField
                      type="time"
                      additionalClasses="ml-7 mr-1"
                      name="selectedDuration"
                      value={selectedDuration}
                      onChange={handleInputChange}
                    />
                    <button className="font-bold rounded mb-5 ml-2" type="button" onClick={() => {
                      setShowDuration(!showDuration);
                      setSelectedDuration('01:00');
                    }}>
                      <FaMinus className="text-red-500 hover:text-red-600 hover:text-lg" />
                    </button>
                  </div>
                </>
              }
              {!showDuration &&
                <button className="rounded mb-5 mt-2" type="button" onClick={() => setShowDuration(!showDuration)}>
                  <div className="flex items-center text-orange-700 hover:text-orange-600 hover:text-lg">
                    <FaPlus />
                    <span className="ml-1">Add duration (optional)</span>
                  </div>
                </button>
              }
            </div>

            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mb-5 mt-5 hover:text-lg">
              <div className='flex items-center'><p className='mr-2'>Create Appointment</p> <FaQrcode /></div>
            </button>
          </form>
        </div>
      </div>

      <div>
        {showQRCodeIndex !== null && appointments.length > 0 && (
          <h1 className="text-2xl font-bold mb-5 text-center">Recently created:</h1>
        )}

        {[...appointments].reverse().map((appointment, index) => (
          <div key={index} className="mb-10 flex flex-col items-center justify-center">
            <p className='font-bold text-xl'>{appointment.title ? appointment.title : ''}</p>
            {appointment.location && (<p>Where: {appointment.location}</p>)}
            <p>{new Date(appointment.selectedDate).toLocaleDateString()} ({new Date(appointment.selectedDate).toLocaleDateString('en-US', { weekday: 'long' })}) at {appointment.selectedTime} h</p>
            <p>Duration: {appointment.selectedDuration ? appointment.selectedDuration.replace(/^0/, '') : ''} h</p>

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
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-3"
                onClick={() => window.open(formatGoogleCalendarURL(appointment), '_blank')}
              >
                <FaCalendar />
              </button>

              <button
                className="text-green-500 hover:text-green-700 font-bold py-1 mr-5"
                onClick={() => shareViaWhatsApp(appointments[index])}
              >
                <FaWhatsapp size={30} />
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
      <Footer/>
    </main>
  );
}