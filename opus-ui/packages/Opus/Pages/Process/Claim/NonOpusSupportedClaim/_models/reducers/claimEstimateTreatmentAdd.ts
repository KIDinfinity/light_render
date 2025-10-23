import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';

const claimEstimateTreatmentAdd = (state: any, { payload }: any) => {
  const { idx } = payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.businessData.nonSupportClaimEstimation.nonSupportIncident.nonSupportTreatmentList.splice(
      idx + 1,
      0,
      {
        id: uuidv4(),
      }
    );
  });

  return { ...nextState };
};

export default claimEstimateTreatmentAdd;
