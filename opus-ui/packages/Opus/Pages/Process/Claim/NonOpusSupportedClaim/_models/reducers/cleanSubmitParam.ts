import { produce } from 'immer';
import { PolicySource } from 'claim/pages/Enum';

const cleanSubmitParam = (state: any, action: any) => {
  const { policyNo, searchByPolicyId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.businessData = {
      ...draftState.businessData,
      insured: searchByPolicyId ? {} : draftState.businessData.insured,
      claimant: {},
    };
    draftState.insuredList = [];

    draftState.businessData.policyAgent = {};
    draftState.searchInsuredObj = {
      ...draftState.searchInsuredObj,
      policySource: PolicySource.individualVal,
    };
    draftState.businessData.insured.policyId = policyNo;
  });
  return { ...nextState };
};

export default cleanSubmitParam;
