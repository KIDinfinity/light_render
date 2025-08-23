const toThousandsString = (number: string) => {
  const parserNum = number.replace(/\$\s?|(,*)|(.*)/g, '');

  const decimal = parserNum.toString().slice(-2);
  let integer = parserNum.toString().slice(0, -2);
  integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return `${integer}.${decimal}`;

};

export default toThousandsString;
