import lodash from 'lodash';
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
  const {
    policyNo,
    benefitItemCode,
    productCode,
    productPlan,
    serviceItemId,
    policyYear,
  } = servicePayable;

  const booster =
    lodash.find(serviceItemPayableListMap, {
      policyNo,
      benefitItemCode,
      productCode,
      productPlan,
      booster: 'Y',
      serviceItemId,
      policyYear,
    }) || {};

  let hasBooster = {};
  if (lodash.isEmpty(booster)) {
    hasBooster = findPolicyBooster({
      policyNo,
      benefitItemCode,
      coreProductCode: productCode,
      productPlan,
      policyYear,
    });
  }

  return {
    booster,
    hasBooster: lodash.isEmpty(booster) && lodash.isEmpty(hasBooster),
    policyBooster: hasBooster,
  };
};
