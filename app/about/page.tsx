import React from 'react';
import { FaInstagram, FaGithub } from 'react-icons/fa';
import Image from 'next/image';

const AboutPage = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Hey there! 👋</h1>

                <Image src="/me.jpeg" width={200} height={200} alt="Profile Picture" className="rounded-full mx-auto mb-4" />

                <p className="mb-4">Welcome to Cita, The easiest way to create and share appointments!</p>
                <p className="mb-4">I am Christian, a passionate software developer from beautiful Hamburg with expertise in Java Spring and Next.js. I love building innovative and user-friendly applications that solve real-world problems while always learning something new.</p>
                <p className="mb-4">When I'm not coding I love to stand up paddle, play squash with friends or do some gaming on Switch/PC. Additionally I'm a big anime fan ❤️ and try to raise more awareness about veganism. 🌱🐮🐷🐤🐟</p>
                <p className="mb-4">I created Cita to help people create and share appointments with their friends and family. I hope you enjoy using it!</p>
                <p className="mb-4">Feel free to connect with me on social media:</p>
                <div className="flex justify-center items-center">
                    <a href="https://www.instagram.com/jinfroftw" className="mr-4">
                        <FaInstagram size={40} />
                    </a>
                    <a href="https://github.com/chris251190">
                        <FaGithub size={40} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;