import crypto from 'crypto';

export const getShortenedFormat = (
  address: string = '',
  length: number = 6,
) => {
  if (!address) return '';
  const maxLength = address.length;
  const minLength = 6;

  const actualLength = length - minLength < 0 ? minLength : length;

  if (actualLength < maxLength) {
    return `${address.substring(0, actualLength)}...${address.substring(
      maxLength - 4,
      maxLength,
    )}`;
  } else {
    return address;
  }
};

export function randomBytes32(): string {
  return crypto.randomBytes(15).toString('hex');
}
