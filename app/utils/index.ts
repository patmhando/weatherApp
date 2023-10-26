export const tempConvert = (tempCalc: number, temp: string): number => {
  if (temp === 'C') {
    return ((tempCalc - 32) * 5) / 9;
  }
  return tempCalc;
};
