import { eClaimDecision } from 'claim/enum/claimDecision';
import uncheckClaimPolicyPayable from './uncheckClaimPolicyPayable';
import { formUtils } from 'basic/components/Form';

export default (draftState, policyNo) => {
  const claimPayableList = draftState.claimProcessData.claimPayableList?.map(id => draftState.claimEntities.claimPayableListMap[id]) || [];
  const allDecline = claimPayableList.every(claimPayable => 
    claimPayable.policyNo !== policyNo || 
    formUtils.queryValue(claimPayable.claimDecision) === eClaimDecision.deny);

  if(allDecline) {
    uncheckClaimPolicyPayable(draftState, policyNo);
  }
}