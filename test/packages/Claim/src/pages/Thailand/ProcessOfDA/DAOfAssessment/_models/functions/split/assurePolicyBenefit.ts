import { isArray, chain } from 'lodash';
import collectPolicyNo from './collectPolicyNo';

/**
 * 需求：根据claim payable中的policy拆分policy benefit数据
 * 步骤：
 * 1.找到claim payable中的所有policy number
 * 2.从policy benefit list数据中过滤出policy number包含在步骤1中的policy benefit
 *
 */
export default (claimPayableList: any[], policyBenefitList: any[]) => {
  if (!isArray(claimPayableList) || !isArray(policyBenefitList)) return [];

  const policyNolist: string[] = collectPolicyNo(claimPayableList);

  return chain(policyBenefitList)
    .filter((item: any) => policyNolist.includes(item.policyNo))
    .value();
};
