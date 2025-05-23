import React from 'react';
import CurrencyConverter from '../components/CurrencyConverter';
import TransactionHistory from '../components/TransactionHistory';

const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-amber-800 text-transparent bg-clip-text">
          Your Trusted Digital Currency Hub
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Convert between USD, KSH, and ETB with real-time rates and zero hidden fees.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <CurrencyConverter className="animate-fade-in" />
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
            <h3 className="text-yellow-800 font-medium mb-2">Did you know?</h3>
            <p className="text-sm text-yellow-700">
              The Kenyan Shilling (KSH) was introduced in 1966 to replace the East African Shilling,
              while the Ethiopian Birr (ETB) is one of Africa's oldest currencies.
            </p>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <TransactionHistory limit={5} className="animate-fade-in delay-150" />
        </div>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          title="Real-Time Rates" 
          description="Get up-to-date exchange rates refreshed every 30 seconds for accurate conversions."
          icon="📊"
        />
        <FeatureCard 
          title="Zero Hidden Fees" 
          description="We believe in transparency. What you see is exactly what you get."
          icon="💰"
        />
        <FeatureCard 
          title="Fast & Secure" 
          description="Your transactions are processed instantly and with bank-grade security."
          icon="🔒"
        />
      </div>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-yellow-500 hover:shadow-lg transition-shadow animate-fade-in">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;