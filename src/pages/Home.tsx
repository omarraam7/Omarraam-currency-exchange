import React from 'react';
import CurrencyConverter from '../components/CurrencyConverter';
import TransactionHistory from '../components/TransactionHistory';
import { TrendingUp, Lock, Zap } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-12 text-center pt-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text leading-tight">
          Your Trusted Digital Currency Hub
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Convert between USD, KSH, and ETB with real-time rates and zero hidden fees. Fast, secure, and transparent currency exchange.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
        <div className="lg:col-span-2">
          <CurrencyConverter className="animate-fade-in" />

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 mt-6">
            <h3 className="text-blue-900 font-semibold mb-2 text-lg">Quick Fact</h3>
            <p className="text-sm text-blue-800 leading-relaxed">
              The Kenyan Shilling (KSH) was introduced in 1966, while the Ethiopian Birr (ETB) is one of Africa's oldest and most stable currencies.
            </p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <TransactionHistory limit={5} className="animate-fade-in delay-150" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          title="Real-Time Rates"
          description="Get up-to-date exchange rates refreshed every 30 seconds for accurate conversions."
          icon={TrendingUp}
          color="blue"
        />
        <FeatureCard
          title="Zero Hidden Fees"
          description="We believe in transparency. What you see is exactly what you get with every conversion."
          icon={Zap}
          color="green"
        />
        <FeatureCard
          title="Fast & Secure"
          description="Your transactions are processed instantly with bank-grade security and encryption."
          icon={Lock}
          color="purple"
        />
      </div>
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color: 'blue' | 'green' | 'purple';
}

const colorStyles = {
  blue: 'from-blue-50 to-blue-100 border-blue-200 text-blue-700',
  green: 'from-green-50 to-green-100 border-green-200 text-green-700',
  purple: 'from-purple-50 to-purple-100 border-purple-200 text-purple-700'
};

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon: Icon, color }) => {
  return (
    <div className={`bg-gradient-to-br ${colorStyles[color]} rounded-xl shadow-md border p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in`}>
      <div className={`w-12 h-12 rounded-lg bg-white mb-4 flex items-center justify-center`}>
        <Icon className="h-6 w-6 text-inherit" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
};

export default Home;