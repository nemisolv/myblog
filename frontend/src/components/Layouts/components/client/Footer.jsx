import { faFacebook, faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-8 mt-auto">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <p className="text-xl font-semibold">Nemisol</p>
                    <p className="mt-2">where I write anything I want and share interesting things.</p>
                </div>

                <div className="flex space-x-4">
                    <a
                        target="_blank"
                        href="https://github.com/nemisolv"
                        className="text-gray-400 hover:text-white transition duration-300"
                    >
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a href="/" className="text-gray-400 hover:text-white transition duration-300">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="/" className="text-gray-400 hover:text-white transition duration-300">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                </div>
            </div>
            <p className="text-center text-white transform rotate-180 ">Nemisol- All rights reversed</p>
        </footer>
    );
};

export default Footer;
