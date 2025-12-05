import { useState } from 'react';
import { Transaction, Category } from '../types';
import { getTransactions, saveTransactions } from '../storage';

interface TransactionListProps {
  transactions: Transaction[];
  categories: Category[];
  onUpdate: () => void;
}

export const TransactionList = ({ transactions, categories, onUpdate }: TransactionListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<string>('');

  const handleEdit = (transaction: Transaction) => {
    setEditingId(transaction.id);
    setEditingCategory(transaction.category);
  };

  const handleSave = (id: string) => {
    const allTransactions = getTransactions();
    const updated = allTransactions.map(t =>
      t.id === id ? { ...t, category: editingCategory } : t
    );
    saveTransactions(updated);
    setEditingId(null);
    onUpdate();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      const allTransactions = getTransactions();
      const updated = allTransactions.filter(t => t.id !== id);
      saveTransactions(updated);
      onUpdate();
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500 text-center">No transactions yet. Add some transactions to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Transactions</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Description</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              const category = categories.find(c => c.name === transaction.category);
              const isEditing = editingId === transaction.id;
              
              return (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-700">{transaction.date}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{transaction.description}</td>
                  <td className="py-3 px-4 text-sm text-right font-semibold text-gray-800">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    {isEditing ? (
                      <select
                        value={editingCategory}
                        onChange={(e) => setEditingCategory(e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        {categories.map(cat => (
                          <option key={cat.name} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    ) : (
                      <span
                        className="inline-block px-2 py-1 rounded text-xs font-medium text-white"
                        style={{ backgroundColor: category?.color || '#6b7280' }}
                      >
                        {transaction.category}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2 justify-center">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleSave(transaction.id)}
                            className="text-green-600 hover:text-green-700 text-sm"
                          >
                            ✓ Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-gray-600 hover:text-gray-700 text-sm"
                          >
                            ✕ Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(transaction)}
                            className="text-blue-600 hover:text-blue-700 text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(transaction.id)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
