import React from 'react';
import { formatDate, formatAmount } from '../utils/formatters';
import { useCurrency } from '../contexts/CurrencyContext';
import { Transaction } from '../types';
import { History } from 'lucide-react';

interface TransactionHistoryProps {
  limit?: number;
  className?: string;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ limit, className }) => {
  const { transactions } = useCurrency();
  const displayTransactions = limit ? transactions.slice(0, limit) : transactions;

  if (displayTransactions.length === 0) {
    return (
      <div className={`bg-white rounded-xl shadow-xl border border-gray-100 p-8 ${className}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100">
            <History className="h-5 w-5 text-green-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No transactions yet. Start converting currencies to see them here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden ${className}`}>
      <div className="p-8 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100">
            <History className="h-5 w-5 text-green-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">From</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">To</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Exchange Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {displayTransactions.map((transaction: Transaction) => (
              <tr
                key={transaction.id}
                className="hover:bg-blue-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                  {formatDate(transaction.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-3 py-1 rounded-lg bg-green-50 text-green-700 font-semibold text-sm">
                    {formatAmount(transaction.amountFrom, transaction.fromCurrency)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-3 py-1 rounded-lg bg-blue-50 text-blue-700 font-semibold text-sm">
                    {formatAmount(transaction.amountTo, transaction.toCurrency)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  1 {transaction.fromCurrency} = <span className="font-semibold">{transaction.rate.toFixed(4)}</span> {transaction.toCurrency}
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