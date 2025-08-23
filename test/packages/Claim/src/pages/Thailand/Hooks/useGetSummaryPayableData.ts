import { useMemo } from 'react';
import { useSelector } from 'dva';
import {
  calculatPayableAmountIncidentLevel,
  calculatPayableProportionIncidentLevel,
} from 'claim/pages/utils/calculatPayableAmount';

export default ({ NAMESPACE, incidentId }: any) => {
  const claimEntities =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.claimEntities) || {};
  const totalPayableAmount = calculatPayableAmountIncidentLevel(claimEntities, incidentId);
  const percentValue = calculatPayableProportionIncidentLevel(claimEntities, incidentId);
  return useMemo(() => {
    return {
      totalPayableAmount,
      percentValue,
    };
  }, [totalPayableAmount, percentValue]);
};
