const { calculateTip, celsiusToFahrenheit, fahrenheitToCelsius } = require('../src/math')

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
