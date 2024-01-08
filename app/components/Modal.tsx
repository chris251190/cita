import React from 'react';
import { FaCalendar, FaWhatsapp, FaTimes } from 'react-icons/fa';
import QRCode from 'qrcode.react';
import Appointment from '../interfaces/Appointment';

interface ModalProps {
    appointment: Appointment;
    formatGoogleCalendarURL: (appointment: Appointment) => string;
    shareViaWhatsApp: (appointment: Appointment) => void;
    setIsModalOpen: (isOpen: boolean) => void;
}

const Modal: React.FC<ModalProps> = ({ appointment, formatGoogleCalendarURL, shareViaWhatsApp, setIsModalOpen }) => {
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Scan or send via WhatsApp:
                                </h3>
                                <div className="mt-2 flex flex-col items-center justify-center">
                                    <QRCode
                                        className="mt-3 mb-3"
                                        value={formatGoogleCalendarURL(appointment)}
                                    />
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
                    </div>
                    <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse bg-gradient-to-r from-yellow-500 to-orange-500">
                        <button type="button" className="text-red-500 hover:text-red-700 font-bold mt-3 w-full inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setIsModalOpen(false)}>
                            <FaTimes size={25} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;