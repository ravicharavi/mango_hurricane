import { Transaction, Category } from './types';

const STORAGE_KEY = 'financial-tracker-transactions';
const CATEGORIES_KEY = 'financial-tracker-categories';

export const defaultCategories: Category[] = [
  { name: 'Food & Dining', keywords: ['restaurant', 'food', 'dining', 'cafe', 'starbucks', 'mcdonald', 'uber eats', 'doordash', 'grubhub', 'grocery', 'supermarket', 'walmart', 'target', 'kroger', 'safeway'], color: '#ef4444' },
  { name: 'Transportation', keywords: ['gas', 'fuel', 'uber', 'lyft', 'taxi', 'parking', 'metro', 'subway', 'bus', 'train', 'airline', 'flight'], color: '#3b82f6' },
  { name: 'Shopping', keywords: ['amazon', 'store', 'shop', 'retail', 'purchase', 'buy'], color: '#8b5cf6' },
  { name: 'Bills & Utilities', keywords: ['electric', 'water', 'gas bill', 'utility', 'internet', 'phone', 'cable', 'subscription', 'netflix', 'spotify'], color: '#f59e0b' },
  { name: 'Entertainment', keywords: ['movie', 'cinema', 'theater', 'concert', 'event', 'ticket', 'game', 'entertainment'], color: '#ec4899' },
  { name: 'Healthcare', keywords: ['pharmacy', 'drug', 'medical', 'doctor', 'hospital', 'clinic', 'cvs', 'walgreens', 'health'], color: '#10b981' },
  { name: 'Personal Care', keywords: ['hair', 'salon', 'spa', 'gym', 'fitness', 'beauty', 'cosmetic'], color: '#06b6d4' },
  { name: 'Education', keywords: ['school', 'tuition', 'course', 'book', 'education', 'university'], color: '#6366f1' },
  { name: 'Other', keywords: [], color: '#6b7280' },
];

export const getTransactions = (): Transaction[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveTransactions = (transactions: Transaction[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};

export const getCategories = (): Category[] => {
  const stored = localStorage.getItem(CATEGORIES_KEY);
  return stored ? JSON.parse(stored) : defaultCategories;
};

export const saveCategories = (categories: Category[]): void => {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
};
