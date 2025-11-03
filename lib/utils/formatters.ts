// lib/utils/formatters.ts

/**
 * Formats a raw temperature value into a displayable string with a Celsius unit.
 * @param temp - The raw temperature number.
 * @returns A formatted string (e.g., "25°C").
 */
export function formatTemperature(temp: number): string {
    // Uses Math.round to ensure clean, whole numbers for display
    const roundedTemp = Math.round(temp);
    return `${roundedTemp}°C`;
}

/**
 * Formats a raw number into a currency string (example utility).
 * @param value - The raw number.
 * @param currency - The currency symbol.
 * @returns A formatted currency string.
 */
export function formatCurrency(value: number, currency: string = '$'): string {
    return `${currency}${value.toFixed(2)}`;
}
