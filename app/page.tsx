"use client";
import QRCode from 'qrcode.react';
import React, { useEffect, useState } from 'react';
import { FaTimes, FaCalendar, FaPlus, FaMinus, FaQrcode, FaWhatsapp } from 'react-icons/fa';
import InputField from './components/InputField';
import Appointment from './interfaces/Appointment';
import Footer from './components/Footer';
import Logo from './components/Logo';
import InstallPWAButton from './components/InstallPWAButton';

export default function Cita() {

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => console.log('scope is: ', registration.scope));
    }
  }, []);

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const currentHour = new Date().getHours().toString().padStart(2, '0');
  const currentMinutes = new Date().getMinutes();
  const selectedMinutes = currentMinutes < 15 || currentMinutes >= 45 ? '00' : '30';
  const [selectedTime, setSelectedTime] = useState(`${currentHour}:${selectedMinutes}`);

  const [selectedDuration, setSelectedDuration] = useState('01:00');
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showDuration, setShowDuration] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setAppointment(newAppointment);
    setShowQRCode(true);
  };

  const handleRemoveAppointment = () => {
    setAppointment(null);
    setShowQRCode(false);
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
      <Logo />
      <div className="flex flex-col items-center justify-center mb-10">
        <h1 className="text-2xl font-bold mb-10 text-center">Create your next appointment:</h1>
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
              onClick={() => setIsModalOpen(true)}
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mb-5 mt-5 hover:text-lg">
              <div className='flex items-center'><p className='mr-2'>Create Appointment</p> <FaQrcode /></div>
            </button>
          </form>
        </div>
      </div>

      {isModalOpen && appointment && (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Scan or send via WhatsApp:
                    </h3>
                    <div className="mt-2">
                      <QRCode
                        className="mt-3 mb-3"
                        value={formatGoogleCalendarURL(appointment)}
                      />
                    </div>
                    <div className='flex justify-center items-center'>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-3"
                        onClick={() => window.open(formatGoogleCalendarURL(appointment), '_blank')}
                      >
                        <FaCalendar />
                      </button>

                      <button
                        className="text-green-500 hover:text-green-700 font-bold py-1 mr-5"
                        onClick={() => shareViaWhatsApp(appointment)}
                      >
                        <FaWhatsapp size={30} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button type="button" className="text-red-500 hover:text-red-700 font-bold mt-3 w-full inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setIsModalOpen(false)}>
                <FaTimes size={25} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center">
        <InstallPWAButton />
      </div>
      <Footer />
    </main>
  );
}