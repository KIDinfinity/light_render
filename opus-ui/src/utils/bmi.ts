import lodash from 'lodash';

export default ({ height, weight }: any) => {
  const heightInMeter = height / 100;
  const bmi = weight / (heightInMeter * heightInMeter);

  return lodash.round(bmi, 2).toFixed(2);
};
