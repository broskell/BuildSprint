const items = [
    {name: "pen", price: 10, quantity: 2},
    {name: "pencil", price: 30, quantity: 4}
]

const calculateSubtotal = (items) => {
    let subtotal = 0;
    for (let item in items) {
        subtotal += items[item].price * items[item].quantity
    }
    return subtotal;
}

const calculateDiscount = (subtotal, discountPercent) => {
    return (subtotal * discountPercent) / 100;
}

const calculateTax = (amountAfterDiscount, taxPercent) => {
    return (amountAfterDiscount * taxPercent) / 100;
}

const createCartSummary = (items, discountPercent, taxPercent) => {
    const subtotal = calculateSubtotal(items);
    const discount = calculateDiscount(subtotal, discountPercent);
    const amountAfterDiscount = subtotal - discount;
    const tax = calculateTax(amountAfterDiscount, taxPercent)
    const total = amountAfterDiscount + tax;

    return {
        subtotal,
        discount,
        tax,
        total
    }
}

console.log(createCartSummary(items, 20, 2))