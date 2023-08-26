export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export const tempConvert = (temp: string, tempCalc: number) => {
  // Celcius to Faregnheight
  if (temp === 'C') {
    return (tempCalc * 9) / 5 + 32;
  } else if (temp === 'F') {
    // Fareghnheight to Celcius
    return ((tempCalc - 32) * 5) / 9;
  }
};
