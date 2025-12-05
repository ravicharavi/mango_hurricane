import { useState } from 'react';
import { Transaction, Category } from '../types';
import { parseTransactions } from '../categorize';
import { getTransactions, saveTransactions } from '../storage';

interface TransactionInputProps {
  onTransactionsAdded: (transactions: Transaction[]) => void;
  categories: Category[];
}

export const TransactionInput = ({ onTransactionsAdded, categories }: TransactionInputProps) => {
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  const handleSubmit = () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    const newTransactions = parseTransactions(inputText, categories);
    
    if (newTransactions.length > 0) {
      const existing = getTransactions();
      const updated = [...existing, ...newTransactions];
      saveTransactions(updated);
      onTransactionsAdded(newTransactions);
      setInputText('');
    }
    
    setIsProcessing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Transactions</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Paste your spending data here
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste transaction data here (e.g., dates, descriptions, amounts)..."
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePaste}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            📋 Paste from Clipboard
          </button>
          <button
            onClick={handleSubmit}
            disabled={!inputText.trim() || isProcessing}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isProcessing ? 'Processing...' : 'Add Transactions'}
          </button>
        </div>
        <p className="text-sm text-gray-500">
          The app will automatically categorize transactions based on keywords. You can review and change categories after adding.
        </p>
      </div>
    </div>
  );
};
