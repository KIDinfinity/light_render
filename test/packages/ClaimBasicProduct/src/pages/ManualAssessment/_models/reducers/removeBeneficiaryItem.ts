import { produce } from 'immer';
import lodash from 'lodash';

const removeBeneficiaryItem = (state: any, action: any) => {
  const { policyBenefitId, beneficiaryId } = action.payload;

  const newBeneficiaryList = lodash.filter(
    state.claimEntities.policyBenefitListMap[policyBenefitId].beneficiaryList,
    (item) => item !== beneficiaryId
  );

  const nextState = produce(state, (draftState) => {
    draftState.claimEntities.policyBenefitListMap[
      policyBenefitId
    ].beneficiaryList = newBeneficiaryList;
    delete draftState.claimEntities.beneficiaryListMap[beneficiaryId];
  });

  return { ...nextState };
};

export default removeBeneficiaryItem;
