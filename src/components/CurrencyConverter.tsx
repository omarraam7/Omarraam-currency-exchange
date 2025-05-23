import React, { useState, useEffect } from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { useCurrency } from '../contexts/CurrencyContext';
import { formatAmount } from '../utils/formatters';

const presetAmounts = [10, 50, 100, 500, 1000];

interface CurrencyConverterProps {
  className?: string;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ className }) => {
  const { 
    fromCurrency, 
    toCurrency, 
    setFromCurrency, 
    setToCurrency, 
    rates, 
    addTransaction 
  } = useCurrency();
  
  const [amount, setAmount] = useState<string>('100');
  const [result, setResult] = useState<number | null>(null);
  const [isConverting, setIsConverting] = useState<boolean>(false);

  // Calculate result when inputs change
  useEffect(() => {
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount) && numericAmount > 0) {
      const rate = rates[fromCurrency]?.[toCurrency] || 0;
      setResult(numericAmount * rate);
    } else {
      setResult(null);
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string or valid numbers only
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handlePresetAmount = (presetAmount: number) => {
    setAmount(presetAmount.toString());
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleConvert = () => {
    if (amount && result !== null) {
      setIsConverting(true);
      
      // Create WhatsApp message
      const message = `Hello, I would like to exchange ${formatAmount(parseFloat(amount), fromCurrency)} to ${formatAmount(result, toCurrency)}`;
      const whatsappUrl = `https://wa.me/254740798137?text=${encodeURIComponent(message)}`;
      
      // Add transaction to history
      addTransaction({
        id: Date.now().toString(),
        date: new Date(),
        fromCurrency,
        toCurrency,
        amountFrom: parseFloat(amount),
        amountTo: result,
        rate: rates[fromCurrency][toCurrency]
      });
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');
      setIsConverting(false);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      <div className="p-6 bg-gradient-to-r from-yellow-50 to-amber-50">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Convert Currency</h2>
        
        {/* From Currency Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
          <div className="flex items-center space-x-4">
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value as 'USD' | 'KSH' | 'ETB')}
              className="w-28 border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="USD">USD</option>
              <option value="KSH">KSH</option>
              <option value="ETB">ETB</option>
            </select>
            
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="flex-1 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Enter amount"
            />
          </div>
          
          {/* Preset Amounts */}
          <div className="flex flex-wrap gap-2 mt-3">
            {presetAmounts.map((presetAmount) => (
              <button
                key={presetAmount}
                onClick={() => handlePresetAmount(presetAmount)}
                className="px-3 py-1 text-sm border border-yellow-400 rounded-full bg-yellow-50 text-yellow-800 hover:bg-yellow-100 transition-colors"
              >
                {formatAmount(presetAmount, fromCurrency)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Swap Button */}
        <div className="flex justify-center my-4">
          <button 
            onClick={handleSwapCurrencies}
            className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors"
          >
            <RefreshCw className="h-5 w-5 text-yellow-700" />
          </button>
        </div>
        
        {/* To Currency Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
          <div className="flex items-center space-x-4">
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value as 'USD' | 'KSH' | 'ETB')}
              className="w-28 border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="USD">USD</option>
              <option value="KSH">KSH</option>
              <option value="ETB">ETB</option>
            </select>
            
            <div className="flex-1 border border-gray-300 rounded-md p-2 bg-gray-50">
              {result !== null ? formatAmount(result, toCurrency) : '—'}
            </div>
          </div>
          
          {/* Exchange Rate Display */}
          <div className="flex justify-between mt-3 text-sm text-gray-500">
            <span>Exchange Rate:</span>
            <span className="font-medium">
              1 {fromCurrency} = {rates[fromCurrency]?.[toCurrency]?.toFixed(4) || '—'} {toCurrency}
            </span>
          </div>
        </div>
        
        {/* Convert Button */}
        <button
          onClick={handleConvert}
          disabled={!amount || result === null || isConverting}
          className={`w-full py-3 rounded-md flex justify-center items-center space-x-2 transition-colors ${
            !amount || result === null || isConverting 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white hover:from-yellow-600 hover:to-amber-700'
          }`}
        >
          {isConverting ? (
            <>
              <RefreshCw className="h-5 w-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>Convert Now</span>
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CurrencyConverter;