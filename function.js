const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'resources', 'transactions.txt');
const fileContents = fs.readFileSync(filePath, 'utf8');
const transactions = JSON.parse(fileContents);

function groupCancelledTransactions(transactions) {
    return transactions
      .filter(transaction => transaction.status === 'cancelled')
      .map(transaction => ({
        ...transaction,
        createdAt: new Date(transaction.createdAt)
      }))
      .sort((a, b) => b.createdAt - a.createdAt)
      .reduce((acc, transaction) => {
        const year = transaction.createdAt.getFullYear();
        if (!acc[year]) {
          acc[year] = [];
        }
        acc[year].push(transaction);
        return acc;
      }, {});
  }

console.log(groupCancelledTransactions(transactions));
