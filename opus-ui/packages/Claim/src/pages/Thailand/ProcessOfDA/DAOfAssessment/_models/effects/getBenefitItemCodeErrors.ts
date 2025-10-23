import { formUtils } from 'basic/components/Form';
import { eClaimDecision } from 'claim/enum/claimDecision';
import lodash from 'lodash';

export default function* getDenormalizedClaimData(_: never, { select }: any) {
  const { treatmentPayableListMap, claimPayableListMap } = yield select(
    ({ daOfClaimAssessmentController }: any) => daOfClaimAssessmentController?.claimEntities
  ) || {};

  let hasDupicatePay = false;

  lodash
    .chain(lodash.values(claimPayableListMap))
    .groupBy('policyNo')
    .values()
    .value()
    .forEach((groupByPolicyNo: any[]) => {
      const approvePayableData = { count: 0, CH01: false };

      groupByPolicyNo.forEach((claimPayable) => {
        if (formUtils.queryValue(claimPayable.claimDecision) === eClaimDecision.approve) {
          approvePayableData.count++;

          claimPayable.treatmentPayableList?.forEach((treatmentPayableId: string) => {
            const benefitItemCode = formUtils.queryValue(
              treatmentPayableListMap[treatmentPayableId]?.benefitItemCode
            );
            if (benefitItemCode) {
              approvePayableData[benefitItemCode] = true;
            }
          });
        }
      });

      // 同一个保单号下，如果有多条 Approve 的 claimPayable 且存在benefitItemCode==CH01, 只能二选一赔付
      if (approvePayableData.count > 1 && approvePayableData.CH01) {
        hasDupicatePay = true;
        return false;
      }
    });

  return hasDupicatePay;
}
