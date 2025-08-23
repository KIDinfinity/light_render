import { produce }  from 'immer';
import { PolicySource } from 'claim/pages/Enum';

const cleanSubmitParam = (state: any, action: any) => {
  const { policyNo, searchByPolicyId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData = {
      ...draftState.claimProcessData,
      insured: searchByPolicyId ? {} : draftState.claimProcessData.insured,
      claimant: {},
    };
    draftState.claimEntities.payeeListMap = {};
    draftState.insuredList = [];
    draftState.claimProcessData.payeeList = [];
    draftState.claimProcessData.policyAgent = {};
    draftState.searchInsuredObj = {
      ...draftState.searchInsuredObj,
      policySource: PolicySource.individualVal,
    };
    draftState.claimProcessData.insured.policyId = policyNo;
  });
  return { ...nextState };
};

export default cleanSubmitParam;
