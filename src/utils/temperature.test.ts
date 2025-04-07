import { describe, it, expect } from 'vitest';
import { kelvinToFahrenheit, kelvinToCelsius } from './temperature';

describe('Temperature Conversions', () => {
  it('converts kelvin to fahrenheit correctly', () => {
    expect(kelvinToFahrenheit(273.15)).toBeCloseTo(32, 1);
    expect(kelvinToFahrenheit(293.15)).toBeCloseTo(68, 1);
    expect(kelvinToFahrenheit(373.15)).toBeCloseTo(212, 1);
  });

  it('converts kelvin to celsius correctly', () => {
    expect(kelvinToCelsius(273.15)).toBeCloseTo(0, 1);
    expect(kelvinToCelsius(293.15)).toBeCloseTo(20, 1);
    expect(kelvinToCelsius(373.15)).toBeCloseTo(100, 1);
  });
});
