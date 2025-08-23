import lodash from 'lodash';

export const VLD_000324 = (fieldName: string) => {
  const isRequireArr = ['emailAddress', 'subject'];
  return lodash.includes(isRequireArr, fieldName);
};
