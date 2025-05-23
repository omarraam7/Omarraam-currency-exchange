export const formatAmount = (amount: number, currency: string): string => {
  switch (currency) {
    case 'USD':
      return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
    case 'KSH':
      return new Intl.NumberFormat('en-KE', { 
        style: 'currency', 
        currency: 'KES',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
      }).format(amount);
    case 'ETB':
      return new Intl.NumberFormat('en-ET', { 
        style: 'currency', 
        currency: 'ETB',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
    default:
      return amount.toFixed(2);
  }
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};