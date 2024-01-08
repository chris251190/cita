"use client";
import React, { useState } from 'react';

const FAQPage: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const faqData = [
        {
            question: 'What kind of software is this?',
            answer: 'Cita is a Webapp designed to easily create simple appointments and sharen them with friends or customers.'
        },
        {
            question: 'What makes Cita different to other Appointment Apps?',
            answer: 'Many Apps nowadays cost something or you first have to go first through an installation process. I wanted to create a simple App to reduce the use of paper which can be used by everyone to create appointments in an easy way without any complications or learning curves on how to use the App.'
        },
        {
            question: 'Which calendars are supported?',
            answer: 'Currently only Google Calendar is supported.'
        },
        {
            question: 'Why is there an App Install Button?',
            answer: 'Cita is a PWA (Progressive Web App) which means you can install it on your device and use it like a native App. This is especially useful for mobile devices.'
        },
        {
            question: 'Where can I submit my Feedback or request new features?',
            answer: 'You can leave me a mail at christian_lehr.1@gmx.de. I would love to hear from you!'
        },
        {
            question: 'Does it cost something or will in the future?',
            answer: 'No the App is currently free. Probably the App will be monetized in the future with ads or maybe a premium version with more features.'
        },
    ];

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="max-w-lg mx-auto flex justify-center items-center h-screen">
            <div className="w-full">
                <h1 className="text-2xl font-bold mb-4 text-center">FAQ - Frequently Asked Questions</h1>
                {faqData.map((faq, index) => (
                    <div key={index} className="border-b border-orange-700">
                        <button
                            className="flex items-center justify-between w-full p-4 focus:outline-none"
                            onClick={() => toggleAccordion(index)}
                        >
                            <span className="font-medium">{faq.question}</span>
                            <svg
                                className={`w-4 h-4 transition-transform ${
                                    activeIndex === index ? 'transform rotate-180' : ''
                                }`}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {activeIndex === index && (
                            <div className="p-4">{faq.answer}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQPage;
