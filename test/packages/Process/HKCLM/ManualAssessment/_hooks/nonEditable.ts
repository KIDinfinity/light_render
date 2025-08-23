import { useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/HKCLM/ManualAssessment/activity.config';
import { eClaimDecision } from 'claim/enum/claimDecision';

export default (payableId: string) => {
  const claimDecision = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities?.claimPayableListMap?.[payableId]?.claimDecision
  );

  return (
    formUtils.queryValue(claimDecision) !== eClaimDecision.deny &&
    formUtils.queryValue(claimDecision) !== eClaimDecision.na
  );
};
