import lodash from 'lodash';

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
    policyCurrency,
    serviceItemId,
  } = servicePayable;

  const booster =
    lodash.find(serviceItemPayableListMap, {
      policyNo,
      benefitItemCode,
      productCode,
      productPlan,
      booster: 'Y',
      policyCurrency,
      serviceItemId,
    }) || {};

  let hasBooster = {};
  if (lodash.isEmpty(booster)) {
    hasBooster = lodash.find(listPolicy, {
      policyNo,
      benefitItemCode,
      productCode,
      productPlan,
      booster: 'Y',
      policyCurrency,
    });
  }

  return { booster, hasBooster: lodash.isEmpty(booster) && lodash.isEmpty(hasBooster) };
};
