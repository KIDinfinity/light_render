export default ({ value, format }: any) => {
  const matchNumber = format?.match(/\d+/g)?.[0] || 2;
  return String(matchNumber ? Number(value).toFixed(matchNumber) : Number(value));
};
