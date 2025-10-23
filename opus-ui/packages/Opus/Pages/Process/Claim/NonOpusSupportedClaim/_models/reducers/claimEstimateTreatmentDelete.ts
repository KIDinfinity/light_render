import { produce } from 'immer';
import lodash from 'lodash';

const claimEstimateTreatmentDelete = (state: any, { payload }: any) => {
  const { id } = payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.businessData.nonSupportClaimEstimation.nonSupportIncident.nonSupportTreatmentList =
      lodash.filter(
        draftState.businessData.nonSupportClaimEstimation.nonSupportIncident
          .nonSupportTreatmentList,
        (item: any) => item.id !== id
      );
  });

  return { ...nextState };
};

export default claimEstimateTreatmentDelete;
