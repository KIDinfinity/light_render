import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import type { PayeeModal } from '../_dto/Models';

/**
 * 过滤已经redeposit的policy，过滤redeposit 规则禁止的policyCurrency
 * @param ownerPolicyList 需要过滤的数据
 * @param payeeItem 获取redeposited polices
 */
const getRedepositPolicyDicts = (
  ownerPolicyMap?: Record<string, { policyId: string; policyCurrency: string }[]>,
  payeeItem?: PayeeModal
) => {
  if (!ownerPolicyMap || !payeeItem) return [];
  const payoutCurrency = formUtils.queryValue(payeeItem?.payoutCurrency);
  const ownerPolicyList = payeeItem?.clientId
    ? lodash.get(ownerPolicyMap, payeeItem?.clientId, [])
    : [];

  if (lodash.isEmpty(ownerPolicyList)) return [];
  const allSelectedPolicesId = lodash
    .chain(payeeItem?.claimRedepositList)
    .compact()
    .map((policy) => formUtils.queryValue(policy?.redepositPolicyNo))
    .uniq()
    .value();

  const isHKD = payoutCurrency === 'HKD';
  return lodash
    .chain(ownerPolicyList)
    .compact()
    .filter((ownerPolicy) => {
      const { policyId, policyCurrency } = ownerPolicy;

      const matchedCurrency = isHKD || policyCurrency === payoutCurrency;

      // 过滤所有已经选择的policy，和 不等于payout currency的 policy(HKD 可以选择所有),
      return !lodash.includes(allSelectedPolicesId, policyId) && matchedCurrency;
    })
    .value();
};

export default getRedepositPolicyDicts;
