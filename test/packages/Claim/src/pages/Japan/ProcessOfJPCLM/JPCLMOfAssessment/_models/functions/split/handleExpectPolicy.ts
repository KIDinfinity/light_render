import { isPlainObject, isArray, isEmpty, chain } from 'lodash';
import { EXPECTPOLICYCLAIM } from 'claim/pages/utils/claimConstant';

/**
 * 根据claim payable获取一个expect policy对象
 * @param claimPayable
 */
export const getExpectPolicy = (claimPayable: any = {}, parentClaimNo: string) => {
  if (!isPlainObject(claimPayable) || isEmpty(claimPayable)) return;
  const { claimNo, policyNo, incidentId } = claimPayable;
  return {
    ...EXPECTPOLICYCLAIM,
    claimNo,
    parentClaimNo,
    incidentId,
    policyId: policyNo,
  };
};

export const getExpectPolicies = (claimPayableList: any[] = [], parentClaimNo: string) => {
  if (!isArray(claimPayableList) || claimPayableList.length < 1) return [];
  return chain(claimPayableList)
    .compact()
    .map((claimPayable: any) => getExpectPolicy(claimPayable, parentClaimNo))
    .compact()
    .uniqBy('policyId')
    .value();
};

/**
 * 从list policy中获取expect information数据
 * @param listPolicy
 * @param chainPayables
 */
export const transExpectInfoFromListPolicy = (
  listPolicy: any[],
  claimPayables: any[],
  claimNo: string
) => {
  if (!isArray(listPolicy) || !isArray(claimPayables)) return listPolicy;
  return chain(listPolicy)
    .uniqBy('policyNo')
    .differenceBy(claimPayables, 'policyNo')
    .map((item: any) => ({ ...item, claimNo }))
    .compact()
    .value();
};

export default {
  getExpectPolicy,
  getExpectPolicies,
  transExpectInfoFromListPolicy,
};
