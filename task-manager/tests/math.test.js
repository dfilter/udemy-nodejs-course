const { add, calculateTip, celsiusToFahrenheit, fahrenheitToCelsius } = require('../src/math')

test('Should calculate total with tip', () => {
  const total = calculateTip(10, .3)
  expect(total).toBe(13)
})

test('Should calculate total with default tip', () => {
  const total = calculateTip(10)
  expect(total).toBe(12.5)
})

test('Should calculate conversion of Fahrenheit (32) to Celsius (0)', () => {
  const temperature = fahrenheitToCelsius(32)
  expect(temperature).toBe(0)
})

test('Should calculate conversion of Celsius (0) to Fahrenheit (32)', () => {
  const temperature = celsiusToFahrenheit(0)
  expect(temperature).toBe(32)
})

// test('Async test demo', (done) => {
//   setTimeout(() => {
//     expect(1).toBe(1)
//     done()
//   }, 2000)
// })

test('async should add two numbers', (done) => {
  add(2, 3).then(sum => {
    expect(sum).toBe(5)
    done()
  })
})

test('async/await should add two numbers', async () => {
  const sum = await add(2, 3)
  expect(sum).toBe(5)
})
