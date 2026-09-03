const expenses = [
  { id: 1, category: 'food', amount: 24 },
  { id: 2, category: 'transport', amount: 15 },
  { id: 3, category: 'food', amount: 18 },
  { id: 4, category: 'books', amount: 40 },
  { id: 5, category: 'pens', amount: 50 }
];

const calculateTotal = (expenses) => {
    let total = 0;

    for (const expense of expenses) {
        total += expense.amount;
    }
    return total;
}

const calculateCategoryTotal = (expenses, category) => {
    let categoryTotal = 0;

    for(const eachCategory of expenses) {
        if(eachCategory.category == category) {
            categoryTotal += eachCategory.amount;
        }
    }
    return categoryTotal;
}
const findLargestExpense = (expenses) => {
    let largestExpense = expenses[0].amount;
    for(const expense of expenses) {
        if(expense.amount > largestExpense) {
            largestExpense = expense.amount;
        }
    }
    return largestExpense;
}

const calculateTransportTotal = (expenses, category) => {
    let transportTotal = 0;

    for(const expense of expenses) {
        if(expense.category == category){
            transportTotal = expense.amount;
        }
    }
    return transportTotal;
}

const createExpenseSummary = (expenses) => {
    const total = calculateTotal(expenses);
    const foodTotal = calculateCategoryTotal(expenses, "food");
    const largestExpense = findLargestExpense(expenses);
    const transportTotal = calculateTransportTotal(expenses, "transport")

    return {
        total,
        foodTotal,
        transportTotal,
        largestExpense
    }
}

console.log(createExpenseSummary(expenses));