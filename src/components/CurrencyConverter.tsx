import React, { useState, useEffect } from 'react';
import { ArrowRight, RefreshCw, TrendingUp } from 'lucide-react';
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

      const message = `Hello, I would like to exchange ${formatAmount(parseFloat(amount), fromCurrency)} to ${formatAmount(result, toCurrency)}`;
      const whatsappUrl = `https://wa.me/254740798137?text=${encodeURIComponent(message)}`;

      addTransaction({
        id: Date.now().toString(),
        date: new Date(),
        fromCurrency,
        toCurrency,
        amountFrom: parseFloat(amount),
        amountTo: result,
        rate: rates[fromCurrency][toCurrency]
      });

      window.open(whatsappUrl, '_blank');
      setIsConverting(false);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 ${className}`}>
      <div className="p-8 bg-gradient-to-br from-blue-50 via-white to-slate-50">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Currency Converter</h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">From Currency</label>
            <div className="flex gap-3">
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value as 'USD' | 'KSH' | 'ETB')}
                className="w-32 px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300"
              >
                <option value="USD">USD</option>
                <option value="KSH">KSH</option>
                <option value="ETB">ETB</option>
              </select>

              <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0.00"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
              />
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {presetAmounts.map((presetAmount) => (
                <button
                  key={presetAmount}
                  onClick={() => handlePresetAmount(presetAmount)}
                  className="px-3 py-2 text-xs font-medium border border-gray-200 rounded-lg bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all"
                >
                  {formatAmount(presetAmount, fromCurrency)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSwapCurrencies}
              className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 transition-all hover:shadow-md"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">To Currency</label>
            <div className="flex gap-3">
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value as 'USD' | 'KSH' | 'ETB')}
                className="w-32 px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300"
              >
                <option value="USD">USD</option>
                <option value="KSH">KSH</option>
                <option value="ETB">ETB</option>
              </select>

              <div className="flex-1 px-4 py-3 rounded-lg border border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50 text-gray-900 font-semibold flex items-center">
                {result !== null ? formatAmount(result, toCurrency) : '0.00'}
              </div>
            </div>

            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-100">
              <span className="text-sm text-gray-600">Rate</span>
              <span className="text-sm font-semibold text-gray-900">
                1 {fromCurrency} = {rates[fromCurrency]?.[toCurrency]?.toFixed(4) || '—'} {toCurrency}
              </span>
            </div>
          </div>

          <button
            onClick={handleConvert}
            disabled={!amount || result === null || isConverting}
            className={`w-full py-3 rounded-lg flex justify-center items-center gap-2 font-semibold transition-all ${
              !amount || result === null || isConverting
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:from-blue-700 hover:to-blue-800 active:scale-95'
            }`}
          >
            {isConverting ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Continue on WhatsApp</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;