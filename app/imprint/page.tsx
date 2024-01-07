import React from 'react';
import Footer from '../components/Footer';
import Logo from '../components/Logo';

const Imprint = () => (
    <div className='flex flex-col items-center text-center'>
        <Logo />

        <div>
        <h2 className="font-bold mb-3">Responsible For Content</h2>

            <p>Christian Lehr</p>
            <p>Bramfelder Dorfplatz 8</p>
            <p>22179 Hamburg</p>
            <p>Phone: +4915202685626</p>
            <p>Email: christian_lehr.1@gmx.de</p>
        </div>

        <Footer />
    </div>
);

export default Imprint;