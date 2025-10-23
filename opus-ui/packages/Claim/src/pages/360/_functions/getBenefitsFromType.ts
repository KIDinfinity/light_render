import lodash from 'lodash';

/**
 * 从benefitType中获取benefitItem数据
 * @param benefitTypes
 */
const getBenefitsFromType = (benefitTypes: any[]): any => {
  if (!lodash.isArray(benefitTypes) || lodash.isEmpty(benefitTypes)) return [];

  return lodash
    .chain(benefitTypes)
    .map((benefitType: any) => benefitType?.benefitItemPayableList)
    .flatten()
    .value();
};

export default getBenefitsFromType;
