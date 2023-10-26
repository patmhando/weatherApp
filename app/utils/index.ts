export const tempConvert = (tempCalc: number, temp: string): number => {
  if (temp === 'C') {
    return Math.round(((tempCalc - 32) * 5) / 9);
  }
  return tempCalc;
};
