import React from 'react';
import { formatDate, formatAmount } from '../utils/formatters';
import { useCurrency } from '../contexts/CurrencyContext';
import { Transaction } from '../types';

interface TransactionHistoryProps {
  limit?: number;
  className?: string;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ limit, className }) => {
  const { transactions } = useCurrency();
  const displayTransactions = limit ? transactions.slice(0, limit) : transactions;

  if (displayTransactions.length === 0) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Transaction History</h2>
        <div className="text-center py-8 text-gray-500">
          <p>No transactions yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      <h2 className="text-xl font-bold text-gray-800 p-6 border-b border-gray-200">
        Transaction History
      </h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exchange Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {displayTransactions.map((transaction: Transaction) => (
              <tr 
                key={transaction.id}
                className="hover:bg-yellow-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(transaction.date)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatAmount(transaction.amountFrom, transaction.fromCurrency)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatAmount(transaction.amountTo, transaction.toCurrency)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  1 {transaction.fromCurrency} = {transaction.rate.toFixed(4)} {transaction.toCurrency}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;