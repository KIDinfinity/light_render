export default (amount: number, precision: number = 2) => {
  const newAmount = String(precision ? Number(amount).toFixed(precision) : Number(amount));
  const reg =
    newAmount.indexOf('.') > -1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g;
  return newAmount.replace(reg, '$1,');
};
