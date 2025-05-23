import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-amber-800 text-transparent bg-clip-text">
          About Omarraam Exchange
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Your trusted partner for currency exchange between USD, KSH, and ETB.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="animate-fade-in">
          <div className="rounded-xl overflow-hidden mb-6">
            <img 
              src="https://images.pexels.com/photos/4386158/pexels-photo-4386158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Currency Exchange" 
              className="w-full h-64 object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            At Omarraam Exchange, we're dedicated to making currency exchange simple, transparent, and accessible to everyone. 
            Our platform bridges financial gaps between USD, Kenyan Shilling, and Ethiopian Birr to facilitate seamless 
            transactions for individuals, businesses, and organizations.
          </p>
          <p className="text-gray-600">
            We believe that financial services should be straightforward, honest, and fair. That's why we offer 
            competitive exchange rates with no hidden fees, ensuring that you get the most value out of every transaction.
          </p>
        </div>
        
        <div className="animate-fade-in delay-150">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Choose Us?</h2>
          <ul className="space-y-4">
            {[
              "Real-time exchange rates updated every 30 seconds",
              "Secure transactions with bank-grade encryption",
              "Transparent pricing with no hidden fees",
              "24/7 customer support via WhatsApp and email",
              "Fast and reliable currency conversion",
              "User-friendly interface optimized for all devices",
              "Detailed transaction history for your records",
              "Committed to financial inclusion and accessibility"
            ].map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="h-6 w-6 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-xl p-8 text-white text-center mb-16 animate-fade-in delay-300">
        <h2 className="text-2xl font-bold mb-4">Start Exchanging Today</h2>
        <p className="text-lg mb-6 max-w-3xl mx-auto">
          Experience the simplicity and security of Omarraam Exchange for all your currency conversion needs.
        </p>
        <a 
          href="/" 
          className="inline-block bg-white text-yellow-700 px-6 py-3 rounded-lg font-medium hover:bg-yellow-50 transition-colors"
        >
          Start Converting
        </a>
      </div>

      <div className="animate-fade-in delay-450">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Coverage</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CurrencyCard 
            code="USD" 
            name="United States Dollar" 
            description="The world's primary reserve currency and one of the most commonly used currencies in international transactions."
            image="https://images.pexels.com/photos/47344/dollar-currency-money-us-dollar-47344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <CurrencyCard 
            code="KSH" 
            name="Kenyan Shilling" 
            description="The official currency of Kenya since 1966, symbolized as 'KES' in international markets."
            image="https://images.pexels.com/photos/4386373/pexels-photo-4386373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <CurrencyCard 
            code="ETB" 
            name="Ethiopian Birr" 
            description="The official currency of Ethiopia since 1893, making it one of Africa's oldest currencies."
            image="https://images.pexels.com/photos/164474/pexels-photo-164474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </div>
      </div>
    </div>
  );
};

interface CurrencyCardProps {
  code: string;
  name: string;
  description: string;
  image: string;
}

const CurrencyCard: React.FC<CurrencyCardProps> = ({ code, name, description, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{code}</h3>
        <h4 className="text-gray-600 font-medium mb-3">{name}</h4>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default About;