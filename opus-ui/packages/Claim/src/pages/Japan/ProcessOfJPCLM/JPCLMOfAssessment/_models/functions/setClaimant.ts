import { formUtils } from 'basic/components/Form';

const setClaimant = (nextState: any) => {
  const insuredValue = formUtils.cleanValidateData(nextState.claimProcessData.insured);
  if (formUtils.queryValue(nextState.claimProcessData.claimant.claimant) === '02') {
    nextState.claimProcessData.claimant.firstName = insuredValue.firstName;
    nextState.claimProcessData.claimant.gender = insuredValue.gender;
    nextState.claimProcessData.claimant.postCode = insuredValue.postCode;
    nextState.claimProcessData.claimant.phoneNo = insuredValue.phoneNo;
    nextState.claimProcessData.claimant.address = insuredValue.address;
    nextState.claimProcessData.claimant.relationshipWithInsured = '';
  }
};

export default setClaimant;
