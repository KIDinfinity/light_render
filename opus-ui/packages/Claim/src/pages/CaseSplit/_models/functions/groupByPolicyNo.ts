import { groupBy, values, isPlainObject, isEmpty, chain } from 'lodash';
import { formUtils } from 'basic/components/Form';
import getExtraClaimPayable from './getExtraClaimPayable';

export default (claimEntities: any) => {
  if (!claimEntities) {
    return {};
  }

  const { treatmentPayableListMap, lifePayableMap, claimPayableListMap } = claimEntities;
  if (
    !isPlainObject(claimPayableListMap) &&
    isEmpty(claimPayableListMap) &&
    !isPlainObject(treatmentPayableListMap) &&
    !isPlainObject(lifePayableMap)
  )
    return {};

  // treatment payable 和 life payable当做同一层级处理
  const existTreatment = formUtils.cleanValidateData(
    values({
      ...treatmentPayableListMap,
      ...lifePayableMap,
    })
  );
  // 获取不存在 treatment payable和life payable的claim payable
  const extraClaim = getExtraClaimPayable(claimPayableListMap, existTreatment);

  const policyGroup = groupBy([...existTreatment, ...extraClaim], 'policyNo');

  return chain(policyGroup)
    .keys()
    .sort()
    .map((key: string) => ({ policyNo: key, payables: policyGroup[key] }))
    .value();
};
