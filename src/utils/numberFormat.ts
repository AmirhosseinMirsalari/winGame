export const numberFormat = (number:number) => {
    return new Intl.NumberFormat().format(number);
  };