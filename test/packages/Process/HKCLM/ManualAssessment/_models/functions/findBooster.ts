import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { findPolicyBooster } from 'basic/utils/PolicyUtils';

/**
 * 找booster的servicepayable
 * @param serviceItemPayableListMap
 * @param servicePayable
 * @param listPolicy
 * @returns
 */
export const findBooster = (
  serviceItemPayableListMap: any,
  servicePayable: any,
  listPolicy: any
) => {
  const { policyNo, benefitItemCode, productCode, productPlan, serviceItemId, policyYear } =
    formUtils.cleanValidateData(servicePayable);

  const boosterData =
    lodash.find(formUtils.cleanValidateData(lodash.values(serviceItemPayableListMap) || []), {
      policyNo,
      benefitItemCode,
      productCode,
      productPlan,
      booster: 'Y',
      serviceItemId,
      policyYear,
    }) || {};

  const policyBoosterData = findPolicyBooster({
    listPolicy,
    policyNo,
    benefitItemCode,
    coreProductCode: productCode,
    productPlan,
    policyYear,
  });

  return {
    booster: boosterData,
    hasBooster: !lodash.isEmpty(policyBoosterData),
    policyBooster: policyBoosterData,
  };
};
