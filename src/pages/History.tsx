import React from 'react';
import TransactionHistory from '../components/TransactionHistory';
import { useCurrency } from '../contexts/CurrencyContext';

const History: React.FC = () => {
  const { transactions } = useCurrency();
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-amber-800 text-transparent bg-clip-text">
          Transaction History
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          View all your past currency exchanges and transaction details.
        </p>
      </div>
      
      <TransactionHistory className="animate-fade-in" />
      
      {transactions.length > 0 && (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-blue-800 font-medium mb-2">Transaction Analytics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
              <div className="text-sm text-gray-500">Total Transactions</div>
              <div className="text-2xl font-bold text-blue-700">{transactions.length}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
              <div className="text-sm text-gray-500">Most Recent</div>
              <div className="text-lg font-medium text-blue-700">
                {new Date(transactions[0].date).toLocaleDateString()}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
              <div className="text-sm text-gray-500">Most Used Currency</div>
              <div className="text-lg font-medium text-blue-700">
                {getMostUsedCurrency(transactions)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function getMostUsedCurrency(transactions: Array<any>): string {
  const currencyCounts: Record<string, number> = {};
  
  transactions.forEach(transaction => {
    currencyCounts[transaction.fromCurrency] = (currencyCounts[transaction.fromCurrency] || 0) + 1;
    currencyCounts[transaction.toCurrency] = (currencyCounts[transaction.toCurrency] || 0) + 1;
  });
  
  let mostUsed = '';
  let highestCount = 0;
  
  Object.entries(currencyCounts).forEach(([currency, count]) => {
    if (count > highestCount) {
      mostUsed = currency;
      highestCount = count;
    }
  });
  
  return mostUsed;
}

export default History;