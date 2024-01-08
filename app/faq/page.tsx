"use client";
import React, { useState } from 'react';

const FAQPage: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const faqData = [
        {
            question: 'What is Tailwind CSS?',
            answer: 'Tailwind CSS is a utility-first CSS framework that allows you to rapidly build custom user interfaces.'
        },
        {
            question: 'How do I install Tailwind CSS?',
            answer: 'You can install Tailwind CSS via npm or yarn by running the appropriate command in your project directory.'
        },
        // Add more FAQ data here...
    ];

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="max-w-lg mx-auto flex justify-center items-center">
            <div className="w-full">
                <h1 className="text-2xl font-bold mb-4">FAQ</h1>
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
