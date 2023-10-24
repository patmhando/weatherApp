export const tempConvert = (tempCalc: any, temp: string) => {
  // Celcius to Faregnheight
  if (temp === 'F') {
    return tempCalc;
  } else if (temp === 'C') {
    // Fareghnheight to Celcius
    return ((tempCalc - 32) * 5) / 9;
  }
};
