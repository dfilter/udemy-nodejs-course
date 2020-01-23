// Object property shorthand

const name = 'John'
const userAge = 20

const user = {
  name,
  age: userAge,
  location: 'Toronto'
}

console.log(user)

// Object destructuring

const product = {
  label: 'Red notebook',
  price: 3,
  stock: 201,
  salePrice: undefined
}

// const label = product.label
// const stock = product.stock
// ==
// The name of the property to destructure cane changed by using a colon and then the new name. 
// Here these are label and productLabel respectively
// If there is no matching property for a destructured variable it will be set to a default using equals symbol.
// Here there is no property set for rating so the default of 5 will be used. 
const { label: productLabel, stock, rating = 5 } = product

console.log(productLabel)
console.log(stock)
console.log(rating)

// here we use braces to destructure label and stock from the product object
const transaction = (type, { label, stock }) => {
  console.log(type)
  console.log(label)
  console.log(stock)
}

transaction('order', product)
