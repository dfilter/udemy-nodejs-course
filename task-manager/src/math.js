const calculateTip = (total, tipPercent = .25) => total + (total * tipPercent)

const celsiusToFahrenheit = (temp) => (temp * 1.8) + 32

const fahrenheitToCelsius = (temp) => (temp - 32) / 1.8

module.exports = {
  calculateTip,
  celsiusToFahrenheit,
  fahrenheitToCelsius,
}
