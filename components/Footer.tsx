import React from 'react';
import { Page } from '../types';
import { LOGO_ICON_URL, NAV_LINKS } from '../constants';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  return (
    <footer className="bg-dark-blue text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <button onClick={() => setCurrentPage(Page.Home)} className="flex items-center mb-4">
              <img src={LOGO_ICON_URL} alt="Paternity Matters Icon" className="h-16 w-16 bg-white rounded-full p-1" />
              <span className="ml-3 font-serif text-xl font-bold">Paternity Matters</span>
            </button>
            <p className="text-gray-400 text-sm">Your Rights, Your Family, Your Legacy.</p>
          </div>
          <div>
            <h3 className="font-bold tracking-wide uppercase text-gray-300">Navigation</h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map(link => (
                <li key={link.name}>
                  <button
                    onClick={() => setCurrentPage(link.name)}
                    className="text-gray-400 hover:text-primary-orange transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold tracking-wide uppercase text-gray-300">Legal</h3>
            <ul className="mt-4 space-y-2 text-gray-400">
              <li><button onClick={() => {}} className="hover:text-primary-orange transition-colors duration-300">Terms of Service</button></li>
              <li><button onClick={() => {}} className="hover:text-primary-orange transition-colors duration-300">Privacy Policy</button></li>
              <li><button onClick={() => setCurrentPage(Page.DisclaimerPage)} className="hover:text-primary-orange transition-colors duration-300">Disclaimer</button></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-black bg-opacity-20">
        <div className="container mx-auto px-6 py-4 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} PaternityMatters.org. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
