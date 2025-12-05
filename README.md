# Financial Tracker

A simple web application to track your monthly spending by category. Automatically categorizes transactions and allows you to review and edit categories as needed.

## Features

- 📋 Paste spending data from your bank statements or credit card statements
- 🤖 Automatic categorization based on keywords
- ✏️ Review and edit transaction categories
- 📊 Monthly spending summaries with category breakdowns
- 💾 Data stored locally in your browser

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd financial-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## Usage

1. **Add Transactions**: Copy and paste your spending data into the input field. The app will automatically parse dates, descriptions, and amounts.

2. **Review Categories**: After adding transactions, review the automatically assigned categories. Click "Edit" on any transaction to change its category.

3. **View Monthly Summary**: See your spending broken down by month and category in the dashboard at the top.

## Data Format

The app can parse various formats, but works best with formats like:
- `01/15/2024 AMAZON.COM $45.99`
- `01/15/2024  RESTAURANT  -$25.50`
- `AMAZON.COM $45.99 01/15/2024`

The app will attempt to extract:
- Dates (MM/DD/YYYY format)
- Transaction descriptions
- Amounts (with or without $ sign)

## Customization

You can customize categories and their keywords by editing the `defaultCategories` array in `src/storage.ts`.

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.
