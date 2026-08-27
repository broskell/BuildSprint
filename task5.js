const calculateDiscount = (price, discountPercent) => {
    return discountPercent * price /100;
}

const calculateTax = (priceAfterDiscount, taxPercent) => {
    return priceAfterDiscount * taxPercent / 100;
}

const calculateFinalPrice = (price, discountPercent, taxPercent) => {
    const discount = calculateDiscount(price, discountPercent);
    const priceAfterDiscount = price - discount;
    const taxAmountAfterDisc = calculateTax(priceAfterDiscount, taxPercent);
    const finalPrice = priceAfterDiscount + taxAmountAfterDisc;
    return finalPrice;
}

const createPriceSummary = (price, discountPercent, taxPercent) => {
    const discountAmount = calculateDiscount(price, discountPercent);
    const priceAfterDiscount = price - discountAmount;
    const tax = calculateTax(priceAfterDiscount, taxPercent);
    const finalPrice = calculateFinalPrice(price, discountPercent, taxPercent)

    const finalPriceSummary = {
        price,
        discountAmount,
        tax,
        finalPrice,
    }
    return finalPriceSummary;
}
console.log(createPriceSummary(2000, 10, 5))