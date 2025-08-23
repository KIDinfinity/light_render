import { useMemo } from 'react';
import { useSelector } from 'dva';

interface IProps {
  incidentId: string;
  treatmentId: string;
  treatmentPayableItemId: string;
}

export default ({ incidentId, treatmentId, treatmentPayableItemId }: IProps) => {
  const payableItem =
    useSelector(
      ({ JPCLMOfClaimAssessment }: any) =>
        JPCLMOfClaimAssessment?.claimEntities?.treatmentPayableListMap?.[treatmentPayableItemId]
    ) || {};

  return useMemo(() => {
    return {
      incidentId,
      treatmentId,
      treatmentPayableItemId,
      claimPayableId: payableItem.payableId,
      policyNo: payableItem?.policyNo,
      hospitalizationSequentialNo: payableItem?.hospitalizationSequentialNo,
    };
  }, [incidentId, treatmentId, treatmentPayableItemId]);
};
