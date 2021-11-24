export const convertNumberToDollar = (value = 0) =>
  `${value !== 0 ? Math.floor(value / 100) : 0}`;

export const convertNumberToDollarWithCents = (value = 0) => {
  const cents = value % 100 > 9 ? value % 100 : `0${value % 100}`;

  return `${convertNumberToDollar(value)}.${cents}`;
};
