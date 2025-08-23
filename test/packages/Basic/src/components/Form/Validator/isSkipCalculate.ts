import lodash from 'lodash';

/**
 * 是否不进行计算
 * @param policyList {Array<any>} 保单列表
 * @param benefitItemCode {string} xxx
 * @return {boolean} true:是;false:不是
 */
export const isSkipCalculate = (policyList: any[], benefitItemCode: string) =>
  lodash
    .chain(policyList)
    .find({ benefitItemCode })
    // @ts-ignore
    .get('accidentBenefit.skipCalculate')
    .value() === 'Y';
