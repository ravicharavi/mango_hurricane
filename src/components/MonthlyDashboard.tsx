import { useMemo } from 'react';
import { Transaction, Category, MonthlySummary } from '../types';
import { format, parse } from 'date-fns';

interface MonthlyDashboardProps {
  transactions: Transaction[];
  categories: Category[];
}

export const MonthlyDashboard = ({ transactions, categories }: MonthlyDashboardProps) => {
  const monthlySummaries = useMemo(() => {
    const summaries: Record<string, MonthlySummary> = {};
    
    transactions.forEach(transaction => {
      let date: Date;
      try {
        // Try to parse the date
        date = parse(transaction.date, 'M/d/yyyy', new Date());
        if (isNaN(date.getTime())) {
          date = parse(transaction.date, 'M/d/yy', new Date());
        }
        if (isNaN(date.getTime())) {
          date = new Date(transaction.date);
        }
      } catch {
        date = new Date();
      }
      
      const monthKey = format(date, 'yyyy-MM');
      
      if (!summaries[monthKey]) {
        summaries[monthKey] = {
          month: format(date, 'MMMM yyyy'),
          total: 0,
          byCategory: {},
        };
      }
      
      summaries[monthKey].total += transaction.amount;
      summaries[monthKey].byCategory[transaction.category] = 
        (summaries[monthKey].byCategory[transaction.category] || 0) + transaction.amount;
    });
    
    // Sort by month (newest first)
    return Object.values(summaries).sort((a, b) => {
      const dateA = parse(a.month, 'MMMM yyyy', new Date());
      const dateB = parse(b.month, 'MMMM yyyy', new Date());
      return dateB.getTime() - dateA.getTime();
    });
  }, [transactions]);

  if (monthlySummaries.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Monthly Spending Summary</h2>
      <div className="space-y-6">
        {monthlySummaries.map((summary) => (
          <div key={summary.month} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">{summary.month}</h3>
              <div className="text-2xl font-bold text-gray-900">
                ${summary.total.toFixed(2)}
              </div>
            </div>
            
            <div className="space-y-2">
              {Object.entries(summary.byCategory)
                .sort(([, a], [, b]) => b - a)
                .map(([categoryName, amount]) => {
                  const category = categories.find(c => c.name === categoryName);
                  const percentage = (amount / summary.total) * 100;
                  
                  return (
                    <div key={categoryName} className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-700">{categoryName}</span>
                          <span className="text-sm font-semibold text-gray-800">
                            ${amount.toFixed(2)} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: category?.color || '#6b7280',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
