import { produce }  from 'immer';
import lodash from 'lodash';
import { PolicySource } from 'claim/pages/Enum';
import { formUtils } from 'basic/components/Form';

const cleanSubmitParam = (state: any, action: any) => {
  const { policyNo, searchByPolicyId } = action.payload;
  if(!searchByPolicyId) return state;

  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData.insured = {}
    draftState.claimProcessData.policyAgent = {}

    // relationshipWithInsured = others 不用删掉claimant
    if(formUtils.queryValue(draftState.claimProcessData.claimant.relationshipWithInsured) !== 'T'){
      draftState.claimProcessData.claimant = {}
    }
    // Payee type = others 时，不用删掉 payee
    const newPayeeListMap = lodash.reduce(lodash.values(draftState.claimEntities.payeeListMap), (res, i) => {
      if(formUtils.queryValue(i.payeeType) === 'T'){
        res[i.id] = i
      }
      return res
    },{})
    const newPayeeList = lodash.keys(newPayeeListMap)
    lodash.set(draftState, 'claimEntities.payeeListMap', newPayeeListMap)
    lodash.set(draftState, 'claimProcessData.payeeList', newPayeeList)
    draftState.selectedPayeeId = newPayeeList[0]

    draftState.insuredList = [];
    draftState.searchInsuredObj = { ...draftState.searchInsuredObj, policySource: PolicySource.individualVal };
    draftState.claimProcessData.insured.policyId = policyNo;
  })
  return { ...nextState }
}

export default cleanSubmitParam;
