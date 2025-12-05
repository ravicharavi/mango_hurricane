import { Transaction, Category } from './types';

export const categorizeTransaction = (
  description: string,
  categories: Category[]
): string => {
  const lowerDescription = description.toLowerCase();
  
  // Try to match against each category's keywords
  for (const category of categories) {
    if (category.name === 'Other') continue;
    
    for (const keyword of category.keywords) {
      if (lowerDescription.includes(keyword.toLowerCase())) {
        return category.name;
      }
    }
  }
  
  return 'Other';
};

export const parseTransactions = (
  text: string,
  categories: Category[]
): Transaction[] => {
  const lines = text.split('\n').filter(line => line.trim());
  const transactions: Transaction[] = [];
  
  lines.forEach((line, index) => {
    // Try to extract date, description, and amount
    // Common formats:
    // "01/15/2024 AMAZON.COM $45.99"
    // "01/15/2024  AMAZON.COM  -$45.99"
    // "AMAZON.COM $45.99 01/15/2024"
    
    const trimmed = line.trim();
    if (!trimmed) return;
    
    // Extract amount (look for $ followed by numbers)
    const amountMatch = trimmed.match(/\$?([\d,]+\.?\d*)/);
    if (!amountMatch) return;
    
    const amountStr = amountMatch[1].replace(/,/g, '');
    const amount = parseFloat(amountStr);
    if (isNaN(amount)) return;
    
    // Extract date (look for MM/DD/YYYY or similar)
    const dateMatch = trimmed.match(/(\d{1,2}\/\d{1,2}\/\d{2,4})/);
    const date = dateMatch ? dateMatch[1] : new Date().toLocaleDateString('en-US');
    
    // Description is everything else
    let description = trimmed
      .replace(/\$?([\d,]+\.?\d*)/g, '')
      .replace(/(\d{1,2}\/\d{1,2}\/\d{2,4})/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    
    if (!description) {
      description = `Transaction ${index + 1}`;
    }
    
    const category = categorizeTransaction(description, categories);
    
    transactions.push({
      id: `${Date.now()}-${index}`,
      date,
      description,
      amount,
      category,
      originalText: trimmed,
    });
  });
  
  return transactions;
};
