/**
 * Convert temperature from Kelvin to Fahrenheit
 * @param kelvin Temperature in Kelvin
 * @returns Temperature in Fahrenheit
 */
export function kelvinToFahrenheit(kelvin: number): number {
  return ((kelvin - 273.15) * 9) / 5 + 32;
}

/**
 * Convert temperature from Kelvin to Celsius
 * @param kelvin Temperature in Kelvin
 * @returns Temperature in Celsius
 */
export function kelvinToCelsius(kelvin: number): number {
  return kelvin - 273.15;
}
