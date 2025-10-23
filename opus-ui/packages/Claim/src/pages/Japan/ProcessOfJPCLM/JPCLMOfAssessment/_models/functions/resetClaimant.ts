import { formUtils } from 'basic/components/Form';

const resetClaimant = (nextState: any) => {
  if (formUtils.queryValue(nextState.claimProcessData.claimant.claimant) !== '02') {
    nextState.claimProcessData.claimant.firstName = '';
    nextState.claimProcessData.claimant.gender = '';
    nextState.claimProcessData.claimant.postCode = '';
    nextState.claimProcessData.claimant.phoneNo = '';
    nextState.claimProcessData.claimant.address = '';
    nextState.claimProcessData.claimant.relationshipWithInsured = '';
  }
};

export default resetClaimant;
