//BOTH map and filter constructs a new array but does not manipulate the source array
const products = [
  { id: 1, name: 'Notebook', category: 'stationery', price: 10, inStock: true },
  { id: 2, name: 'Desk Lamp', category: 'home', price: 35, inStock: false },
  { id: 3, name: 'Pen Set', category: 'stationery', price: 6, inStock: true },
  {
    id: 4,
    name: 'Water Bottle',
    category: 'fitness',
    price: 18,
    inStock: true,
  },
];

const filterByCategory = (products, category) => {
    return products.filter((product) => product.category == category)
}

const filterByMaxPrice = (products, maxPrice) => {
    return products.filter((product)=> product.price <= maxPrice)
}

const findProductById = (products, productId) => {
    return products.find((product)=> product.id == productId)
}


const searchProducts = (products, searchText) => {
    const lowerCasedSearchText = searchText.toLowerCase();
    return products.filter((product)=> product.name.toLowerCase().includes(lowerCasedSearchText) )
}

const getInStockProducts = (products) => {
    return products.filter((product)=> product.inStock)
}


console.log(filterByCategory(products, "home"))
console.log(filterByMaxPrice(products, 15))
console.log(findProductById(products, 1))
console.log(searchProducts(products, "NOTE"))
console.log(getInStockProducts(products))