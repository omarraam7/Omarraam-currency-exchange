import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { CurrencyProvider } from '../contexts/CurrencyContext';

const Layout: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <CurrencyProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
        <Header scrolled={scrolled} />
        <main className="flex-grow px-4 py-6 md:px-6 lg:px-8 pt-24">
          <Outlet />
        </main>
        <Footer />
      </div>
    </CurrencyProvider>
  );
};

export default Layout;