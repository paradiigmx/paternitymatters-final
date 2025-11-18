import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Page } from '../types';
import { LOGO_URL, NAV_LINKS, NavLink as NavLinkType } from '../constants';
import { MenuIcon, CloseIcon } from './icons';
import { pageToPath } from '../App';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  };
  
  const handleDropdownToggle = (linkName: Page) => {
    setOpenDropdown(openDropdown === linkName ? null : linkName);
  };
  
  const NavItem: React.FC<{ link: NavLinkType }> = ({ link }) => {
    if (link.sublinks) {
      return (
        <div className="relative">
          <button
            onClick={() => handleDropdownToggle(link.name)}
            className="px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-md flex items-center text-white hover:bg-white/10"
          >
            {link.name}
            <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${openDropdown === link.name ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          {openDropdown === link.name && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-dark-blue rounded-md shadow-lg py-1 z-50 border border-gray-700">
              {link.sublinks.map(sublink => (
                <NavLink
                  key={sublink.name}
                  to={pageToPath(sublink.name)}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `w-full text-left px-4 py-2 text-sm ${isActive ? 'text-primary-orange' : 'text-white'} hover:bg-white/10`
                  }
                >
                  {sublink.name}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <NavLink
        to={pageToPath(link.name)}
        onClick={closeMenu}
        className={({ isActive }) =>
          `px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-md ${
            isActive ? 'bg-primary-orange text-white' : 'text-white hover:bg-white/10'
          }`
        }
      >
        {link.name}
      </NavLink>
    );
  };

  return (
    <header ref={headerRef} className="bg-dark-blue shadow-md sticky top-0 z-[1000]">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" onClick={closeMenu} className="flex items-center">
          <img src={LOGO_URL} alt="Paternity Matters Logo" className="h-10 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center space-x-2">
          {NAV_LINKS.map(link => (
            link.sublinks ? (
              <div key={link.name} className="relative">
                <button
                  onClick={() => handleDropdownToggle(link.name)}
                  className="px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-md flex items-center text-white hover:bg-white/10"
                >
                  {link.name}
                  <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${openDropdown === link.name ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {openDropdown === link.name && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-dark-blue rounded-md shadow-lg py-1 z-50 border border-gray-700 flex flex-col">
                    <NavLink
                      to={pageToPath(link.name)}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `w-full text-left px-4 py-2 text-sm ${isActive ? 'text-primary-orange' : 'text-white'} hover:bg-white/10`
                      }
                    >
                      {link.name}
                    </NavLink>
                    {link.sublinks.map(sublink => (
                      <NavLink
                        key={sublink.name}
                        to={pageToPath(sublink.name)}
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          `w-full text-left px-4 py-2 text-sm ${isActive ? 'text-primary-orange' : 'text-white'} hover:bg-white/10`
                        }
                      >
                        {sublink.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={link.name}
                to={pageToPath(link.name)}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-md ${
                    isActive ? 'bg-primary-orange text-white' : 'text-white hover:bg-white/10'
                  }`
                }
              >
                {link.name}
              </NavLink>
            )
          ))}
          {NAV_LINKS.map(link => <NavItem key={link.name} link={link} />)}
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            {isMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-dark-blue absolute w-full py-4 border-t border-gray-700 z-[999]">
          <nav className="flex flex-col items-center space-y-2">
            {NAV_LINKS.map(link => (
              <div key={link.name} className="w-full text-center">
                {link.sublinks ? (
                  <>
                    <button
                      onClick={() => handleDropdownToggle(link.name)}
                      className="w-full px-4 py-2 text-lg font-semibold flex justify-center items-center gap-1 text-white"
                    >
                      {link.name}
                      <svg className={`w-4 h-4 transition-transform duration-200 ${openDropdown === link.name ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    {openDropdown === link.name && (
                      <div className="bg-black/20 mt-2 py-2 flex flex-col">
                        <NavLink
                          to={pageToPath(link.name)}
                          onClick={closeMenu}
                          className={({ isActive }) =>
                            `w-full px-4 py-2 text-base ${isActive ? 'text-primary-orange' : 'text-white'}`
                          }
                        >
                          {link.name}
                        </NavLink>
                      <div className="bg-black/20 mt-2 py-2">
                        {link.sublinks.map(sublink => (
                          <NavLink
                            key={sublink.name}
                            to={pageToPath(sublink.name)}
                            onClick={closeMenu}
                            className={({ isActive }) =>
                              `w-full px-4 py-2 text-base ${isActive ? 'text-primary-orange' : 'text-white'}`
                            }
                          >
                            {sublink.name}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <NavLink
                    to={pageToPath(link.name)}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `w-full px-4 py-2 text-lg font-semibold ${isActive ? 'text-primary-orange' : 'text-white'}`
                    }
                  >
                    {link.name}
                  </NavLink>
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
