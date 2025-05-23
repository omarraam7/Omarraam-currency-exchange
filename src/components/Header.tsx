import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { DollarSign, Menu, X } from 'lucide-react';
import { routes } from '../routes';

interface HeaderProps {
  scrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ scrolled }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <DollarSign className="h-8 w-8 text-yellow-600" />
            <span className="font-bold text-xl bg-gradient-to-r from-yellow-500 to-amber-700 bg-clip-text text-transparent">Omarraam Exchange</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {routes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                className={({ isActive }) => 
                  `font-medium transition-colors hover:text-yellow-600 ${
                    isActive ? 'text-yellow-600' : 'text-gray-700'
                  }`
                }
              >
                {route.name}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-4 space-y-1 bg-white shadow-lg">
            {routes.map((route) => (
              <NavLink
                key={route.path}
                to={route.path}
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md font-medium transition-colors ${
                    isActive ? 'bg-yellow-50 text-yellow-700' : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {route.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;