import lodash from 'lodash';



const UNIT = 'day';

/**
 *
 * @param value 保单号
 * @param policyNoArray 所有的保单号
 */
export const VLD_000071Rule = (value, policyNoArray) => {
  const duplicateItem = lodash.filter(policyNoArray, (item) => item === value);
  const isCheckSuccess = duplicateItem.length < 2;

  return isCheckSuccess;
};
