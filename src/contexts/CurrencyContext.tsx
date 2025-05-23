import React, { createContext, useContext, useState, useEffect } from 'react';
import { Transaction } from '../types';

// Fixed exchange rates as per requirements
const fixedRates = {
  USD: {
    KSH: 128.00, // 100 USD = 12800 KSH
    ETB: 56.45,
    USD: 1
  },
  KSH: {
    USD: 0.00769, // 13000 KSH = 100 USD (1/130)
    ETB: 1.15, // 1000 KSH = 1150 ETB (1.15)
    KSH: 1
  },
  ETB: {
    USD: 0.0177,
    KSH: 0.80, // 100 ETB = 80 KSH (0.80)
    ETB: 1
  }
};

type CurrencyType = 'USD' | 'KSH' | 'ETB';

interface CurrencyContextType {
  fromCurrency: CurrencyType;
  toCurrency: CurrencyType;
  rates: typeof fixedRates;
  transactions: Transaction[];
  setFromCurrency: (currency: CurrencyType) => void;
  setToCurrency: (currency: CurrencyType) => void;
  addTransaction: (transaction: Transaction) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fromCurrency, setFromCurrency] = useState<CurrencyType>('USD');
  const [toCurrency, setToCurrency] = useState<CurrencyType>('KSH');
  const [rates] = useState(fixedRates);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load saved transactions from localStorage on component mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      try {
        const parsedTransactions = JSON.parse(savedTransactions);
        // Convert string dates back to Date objects
        const formattedTransactions = parsedTransactions.map((t: any) => ({
          ...t,
          date: new Date(t.date)
        }));
        setTransactions(formattedTransactions);
      } catch (error) {
        console.error('Failed to parse saved transactions', error);
      }
    }
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  return (
    <CurrencyContext.Provider 
      value={{ 
        fromCurrency, 
        toCurrency, 
        rates, 
        transactions,
        setFromCurrency, 
        setToCurrency, 
        addTransaction 
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};