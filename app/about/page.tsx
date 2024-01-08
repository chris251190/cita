import React from 'react';
import { FaInstagram, FaGithub } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../components/Footer';
import Logo from '../components/Logo';

const AboutPage = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-center max-w-2xl mx-auto px-4">
                <Logo />

                <Image src="/me.jpeg" width={200} height={200} alt="Profile Picture" className="rounded-full mx-auto mb-4" />
                <h1 className="text-lg mb-4">Hey there! 👋</h1>
                <p className="mb-4">I am Christian, a passionate software developer from beautiful Hamburg programming mostly in Java Spring and Next.js. I love building innovative and user-friendly applications that solve real-world problems while always learning something new.</p>
                <p className="mb-4">When I&apos;m not coding I love to stand up paddle, play squash with friends or do some gaming on Switch/PC. Additionally I&apos;m a big anime fan ❤️ and try to raise more awareness about veganism and animal rights. 🌱🐮🐷🐥🐑🐠</p>
                <p className="mb-4">I created Cita to help people create and share appointments with their friends and family. I hope you enjoy using it!</p>
                <p className="mb-4">Feel free to connect with me on social media:</p>
                <div className="flex justify-center items-center">
                    <Link className="mr-4" href="https://www.instagram.com/jinroftw" passHref target="_blank">
                        <FaInstagram size={40} />
                    </Link>
                    <Link href="https://github.com/chris251190" passHref target="_blank">
                        <FaGithub size={40} />
                    </Link>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default AboutPage;