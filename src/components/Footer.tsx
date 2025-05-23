import React from 'react';
import { Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-yellow-500">Omarraam Exchange</h3>
            <p className="text-gray-400">
              Your trusted platform for currency exchange between USD, KSH, and ETB.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-yellow-500">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-yellow-500 transition-colors">Home</a></li>
              <li><a href="/history" className="text-gray-400 hover:text-yellow-500 transition-colors">History</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-yellow-500 transition-colors">About</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-yellow-500 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-yellow-500">Contact Us</h3>
            <div className="space-y-2">
              <a 
                href="https://wa.me/254740798137" 
                className="flex items-center text-gray-400 hover:text-yellow-500 transition-colors"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Phone className="h-5 w-5 mr-2" />
                <span>+254740798137 (WhatsApp)</span>
              </a>
              <a 
                href="mailto:omarkeyow318@gmail.com" 
                className="flex items-center text-gray-400 hover:text-yellow-500 transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                <span>omarkeyow318@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Omarraam Exchange. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;