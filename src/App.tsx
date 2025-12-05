import { useState, useEffect } from 'react';
import { Transaction, Category } from './types';
import { getTransactions, getCategories } from './storage';
import { TransactionInput } from './components/TransactionInput';
import { TransactionList } from './components/TransactionList';
import { MonthlyDashboard } from './components/MonthlyDashboard';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const loadData = () => {
    setTransactions(getTransactions());
    setCategories(getCategories());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTransactionsAdded = (newTransactions: Transaction[]) => {
    loadData();
  };

  const handleTransactionUpdate = () => {
    loadData();
  };

  // Filter transactions by month if needed (for now showing all)
  const displayTransactions = [...transactions].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA; // Newest first
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">💰 Financial Tracker</h1>
          <p className="text-gray-600">Track your spending by category and month</p>
        </header>

        <TransactionInput
          onTransactionsAdded={handleTransactionsAdded}
          categories={categories}
        />

        <MonthlyDashboard
          transactions={transactions}
          categories={categories}
        />

        <TransactionList
          transactions={displayTransactions}
          categories={categories}
          onUpdate={handleTransactionUpdate}
        />
      </div>
    </div>
  );
}

export default App;
