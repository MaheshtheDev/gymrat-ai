/**
 * @description Function to convert cent amount to dollar amount with detailed configuration.
 * @param cents The cent amount to be converted to the dollar amount.
 * @param showsComma The flag indicates showing the commas as thousands separators.
 * @param numberOfDecimalPlaces The number of decimal places.
 * @returns {string} Converted dollar currency string.
 */

export const convertCentsToDollar = (cents: number): string => {
  return `$${Math.round(cents / 100).toLocaleString('en-US')}`;
};

export const toTitleCase = (str: string) => {
  if (str) {
    return str
      .toLowerCase()
      .split(' ')
      .map(function (word) {
        return word.replace(word[0], word[0].toUpperCase());
      })
      .join(' ');
  }
  return str;
};
