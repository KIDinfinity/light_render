import lodash from 'lodash';

export const VLD_000325 = (fieldName: string) => {
  const isRequireArr = ['phoneNo'];
  return lodash.includes(isRequireArr, fieldName);
};
