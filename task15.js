const order = {
  id: 'ORD-1001',
  customer: {
    name: 'Ava Stone',
    email: 'ava@example.com',
  },
  payment: {
    status: 'paid',
  },
  shipping: {
    status: 'shipped',
    estimatedDelivery: '2026-06-18',
  },
  items: [
    { name: 'Notebook', quantity: 2 },
    { name: 'Pen Set', quantity: 1 },
  ],
};

const isPaid = (order) => order.payment.status == "paid";

const hasShipped = (order) => order.shipping.status == "shipped";

// const getDeliveryMessage = (order) => {
//     if (hasShipped(order)) {
//         return `Order shipped. Estimated delivery: ${order.shipping.estimatedDelivery}.`;
//     }
//     return "Order has not shipped yet.";
// }

const getDeliveryMessage = (order) => hasShipped(order) ? `Order shipped. Estimated delivery: ${order.shipping.estimatedDelivery}.` : "Order has not shipped yet.";

const needsAttention = (order) => !isPaid(order) || !hasShipped(order);

const createOrderSummary = (order) => {
    const itemCount = order.items.reduce((total, item) => total + item.quantity, 0);

    return {
        id: order.id,
        customerName: order.customer.name,
        paid: isPaid(order),
        shipped: hasShipped(order),
        itemCount,
        deliveryMessage: getDeliveryMessage(order),
        needsAttention: needsAttention(order),
    };
}

console.log(createOrderSummary(order));
console.log(isPaid(order));
console.log(hasShipped(order));

// const pendingOrder = {
//   ...order,
//   payment: { status: 'unpaid' },
//   shipping: { status: 'processing', estimatedDelivery: '2026-06-18' },
// };
// console.log(needsAttention(pendingOrder));
// console.log(getDeliveryMessage(pendingOrder));

// Expected output:
// { id: "ORD-1001", customerName: "Ava Stone", paid: true, shipped: true, itemCount: 3, deliveryMessage: "Order shipped. Estimated delivery: 2026-06-18.", needsAttention: false }
// true
// true
// true
// Order has not shipped yet.