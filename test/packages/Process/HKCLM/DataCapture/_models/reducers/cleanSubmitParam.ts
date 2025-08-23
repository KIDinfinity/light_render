import { produce }  from 'immer';
import lodash from 'lodash';
import { PolicySource } from 'claim/pages/Enum';

const cleanSubmitParam = (state: any, action: any) => {
  const { policyNo, searchByPolicyId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData = {
      ...draftState.claimProcessData,
      insured: searchByPolicyId ? {} : draftState.claimProcessData.insured,
      claimant: {}
    }
    lodash.set(draftState, 'claimEntities.payeeListMap', {})
    lodash.set(draftState, 'claimProcessData.payeeList', [])
    draftState.insuredList = [];
    draftState.searchInsuredObj = { ...draftState.searchInsuredObj, policySource: PolicySource.individualVal };
    draftState.claimProcessData.insured.policyId = policyNo;
  })
  return { ...nextState }
}

export default cleanSubmitParam;
