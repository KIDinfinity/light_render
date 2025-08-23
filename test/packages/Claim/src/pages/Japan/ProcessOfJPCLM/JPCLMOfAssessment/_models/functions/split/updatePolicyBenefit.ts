import { isArray, chain, isEqual, differenceWith } from 'lodash';

/**
 * 从claim payable中拿到所有关联好的policy No.
 * @param claimPayableList
 */
const collectPolicyByPayable = (claimPayableList: any[]) => {
  if (!isArray(claimPayableList)) return claimPayableList;
  return chain(claimPayableList)
    .map((claimPayable: any) => claimPayable.policyNo)
    .compact()
    .uniq()
    .value();
};

/**
 * 过滤当前case关联到的所有policy benefits
 * @param policyBenefits
 * @param claimPayableList
 */
export const updatePolicyBenefit = (policyBenefits: any[], claimPayableList: any[]) => {
  if (!isArray(policyBenefits) || !isArray(claimPayableList)) return policyBenefits;
  const policyNos = collectPolicyByPayable(claimPayableList);
  return chain(policyBenefits)
    .compact()
    .filter((benefit: any) => policyNos.includes(benefit.policyNo))
    .value();
};

/**
 * 从源policy benefit里面过滤出和目标数据不同的数据
 * @param decisionSource 源policy benefit
 * @param decisionTarget 目标policy benefit
 */
export const diffPolicyBenefit = (decisionSource: any[] = [], decisionTarget: any[] = []) =>
  differenceWith(decisionSource, decisionTarget, isEqual);
