import lodash from 'lodash';

export const VLD_000065 = (arr: any[]): boolean => {
  return lodash.every(arr, (item: any) => item.checked);
};
