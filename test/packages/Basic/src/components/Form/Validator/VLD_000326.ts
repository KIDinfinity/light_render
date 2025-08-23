import lodash from 'lodash';

export const VLD_000326 = (fieldName: string) => {
  const isRequireArr = ['address'];
  return lodash.includes(isRequireArr, fieldName);
};
