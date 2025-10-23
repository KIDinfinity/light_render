export default (year: number) => {
  if (year % 10 === 1) return year + 'st';
  if (year % 10 === 2) return year + 'nd';
  if (year % 10 === 3) return year + 'rd';
  return year + 'th';
};
