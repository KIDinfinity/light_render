import { useCallback } from 'react';
import { useDispatch } from 'dva';
import { BenefitCategory } from 'claim/pages/utils/claim';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';

export default () => {
  const dispatch = useDispatch();

  return useCallback(
    async (item) => {
      if (item.benefitCategory === BenefitCategory.MajorIllnessCashBenefit) {
        dispatch({
          type: `${NAMESPACE}/removeClaimIncidentPayableItem`,
          payload: {
            claimIncidentPayableId:
              item?.claimIncidentPayableId || item?.claimIncidentPayableList?.[0],
          },
        });
        return;
      }
      if (item.benefitCategory === BenefitCategory.life) {
        dispatch({
          type: `${NAMESPACE}/removeLifePayableItem`,
          payload: {
            claimIncidentPayableId: item?.id,
          },
        });
        return;
      }
      dispatch({
        type: `${NAMESPACE}/removeClaimPayableItem`,
        payload: {
          incidentPayableId: item?.id,
        },
      });
      const state: any = await dispatch({ type: 'global/accessStore' });
      const payoutCurrency =
        state.opusClaimAssessment.claimProcessData.claimDecision?.payoutCurrency;

      dispatch({
        type: `${NAMESPACE}/saveClaimPayablePolicyCurrency`,
        payload: { payoutCurrency },
      });
    },
    [dispatch]
  );
};
