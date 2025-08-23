
import { produce } from 'immer';

const cleanSubmitParam = (state: any, action: any) => {
  const { policyNo } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData = {
      ...draftState.claimProcessData,
      insured: {},
      claimant: {}
    }
    draftState.searchInsuredObj = {};
    draftState.claimProcessData.insured.policyId = policyNo;
  })
  return { ...nextState }
}

export default cleanSubmitParam;
