import React, { useState, useRef, useEffect } from 'react';
import { Page } from '../types';
import { LOGO_URL, NAV_LINKS, NavLink as NavLinkType } from '../constants';
import { MenuIcon, CloseIcon } from './icons';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNav = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };
  
  const handleDropdownToggle = (linkName: Page) => {
    setOpenDropdown(openDropdown === linkName ? null : linkName);
  };
  
  const NavItem: React.FC<{ link: NavLinkType }> = ({ link }) => {
    const isActive = currentPage === link.name || link.sublinks?.some(sub => sub.name === currentPage);

    if (link.sublinks) {
      return (
        <div className="relative">
          <button
            onClick={() => handleDropdownToggle(link.name)}
            className={`px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-md flex items-center ${
              isActive ? 'bg-primary-orange text-white' : 'text-white hover:bg-white/10'
            }`}
          >
            {link.name}
            <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${openDropdown === link.name ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          {openDropdown === link.name && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-dark-blue rounded-md shadow-lg py-1 z-50 border border-gray-700">
              {link.sublinks.map(sublink => (
                <button
                  key={sublink.name}
                  onClick={() => handleNav(sublink.name)}
                  className={`w-full text-left px-4 py-2 text-sm ${currentPage === sublink.name ? 'text-primary-orange' : 'text-white'} hover:bg-white/10`}
                >
                  {sublink.name}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        onClick={() => handleNav(link.name)}
        className={`px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-md ${
          isActive ? 'bg-primary-orange text-white' : 'text-white hover:bg-white/10'
        }`}
      >
        {link.name}
      </button>
    );
  };

  return (
    <header className="bg-dark-blue shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <button onClick={() => handleNav(Page.Home)} className="flex items-center">
          <img src={LOGO_URL} alt="Paternity Matters Logo" className="h-10 w-auto" />
        </button>
        <nav ref={navRef} className="hidden md:flex items-center space-x-2">
          {NAV_LINKS.map(link => <NavItem key={link.name} link={link} />)}
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            {isMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-dark-blue absolute w-full py-4 border-t border-gray-700">
          <nav className="flex flex-col items-center space-y-2">
            {NAV_LINKS.map(link => (
              <div key={link.name} className="w-full text-center">
                <button
                  onClick={() => link.sublinks ? handleDropdownToggle(link.name) : handleNav(link.name)}
                  className={`w-full px-4 py-2 text-lg font-semibold flex justify-center items-center gap-1 ${currentPage === link.name ? 'text-primary-orange' : 'text-white'}`}
                >
                  {link.name}
                   {link.sublinks && (
                    <svg className={`w-4 h-4 transition-transform duration-200 ${openDropdown === link.name ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  )}
                </button>
                {link.sublinks && openDropdown === link.name && (
                  <div className="bg-black/20 mt-2 py-2">
                    {link.sublinks.map(sublink => (
                      <button
                        key={sublink.name}
                        onClick={() => handleNav(sublink.name)}
                        className={`w-full px-4 py-2 text-base ${currentPage === sublink.name ? 'text-primary-orange' : 'text-white'}`}
                      >
                        {sublink.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;