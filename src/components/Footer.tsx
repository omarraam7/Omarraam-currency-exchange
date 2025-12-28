import React from 'react';
import { Mail, Phone, DollarSign } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white">Omarraam Exchange</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your trusted platform for seamless currency exchange between USD, KSH, and ETB with transparent rates.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-5 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-400 hover:text-blue-400 transition-colors font-medium">Home</a></li>
              <li><a href="/history" className="text-gray-400 hover:text-blue-400 transition-colors font-medium">Transaction History</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-blue-400 transition-colors font-medium">About Us</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors font-medium">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-5 text-white">Get in Touch</h3>
            <div className="space-y-3">
              <a
                href="https://wa.me/254740798137"
                className="flex items-center text-gray-400 hover:text-blue-400 transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Phone className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                <span className="font-medium">+254 740 798 137</span>
              </a>
              <a
                href="mailto:omarkeyow318@gmail.com"
                className="flex items-center text-gray-400 hover:text-blue-400 transition-colors group"
              >
                <Mail className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                <span className="font-medium">omarkeyow318@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Omarraam Currencies Exchange. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;