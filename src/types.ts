export interface Transaction {
  id: string;
  date: Date;
  fromCurrency: string;
  toCurrency: string;
  amountFrom: number;
  amountTo: number;
  rate: number;
}

export interface CurrencyRate {
  code: string;
  rate: number;
}