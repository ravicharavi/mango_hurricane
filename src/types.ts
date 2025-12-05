export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  originalText: string;
}

export interface Category {
  name: string;
  keywords: string[];
  color: string;
}

export interface MonthlySummary {
  month: string;
  total: number;
  byCategory: Record<string, number>;
}
