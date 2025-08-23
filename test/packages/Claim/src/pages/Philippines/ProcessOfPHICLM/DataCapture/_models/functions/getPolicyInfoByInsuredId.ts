import lodash from 'lodash';
import type { IInsured } from '@/dtos/claim';
import { formUtils } from 'basic/components/Form';

export function getPolicyInfoByInsuredId(policyList: any[], insuredInfo: IInsured) {
  const { policyId } = insuredInfo;
  return lodash
    .chain(policyList)
    .compact()
    .filter((policy: any) => policy.policyId === lodash.toUpper(formUtils.queryValue(policyId)))
    .orderBy('issueEffectiveDate')
    .first()
    .value();
}
export default getPolicyInfoByInsuredId;
