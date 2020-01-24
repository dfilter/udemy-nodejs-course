const greeter = (age, name = 'John') => {
  console.log(`Hello ${name}`)
}

greeter(undefined, 20)

const transaction = (type, { label, stock = 0 } = {}) => {
  console.log(type, label, stock)
}

transaction('order')
