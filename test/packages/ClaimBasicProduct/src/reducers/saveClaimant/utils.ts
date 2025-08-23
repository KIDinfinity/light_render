import { formUtils } from 'basic/components/Form';
import { get, find } from 'lodash';

export const setClaimant = (nextState: any) => {
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

export const resetClaimant = (nextState: any) => {
  if (formUtils.queryValue(nextState.claimProcessData.claimant.claimant) !== '02') {
    nextState.claimProcessData.claimant.firstName = '';
    nextState.claimProcessData.claimant.gender = '';
    nextState.claimProcessData.claimant.postCode = '';
    nextState.claimProcessData.claimant.phoneNo = '';
    nextState.claimProcessData.claimant.address = '';
    nextState.claimProcessData.claimant.relationshipWithInsured = '';
  }
};

export const getPrevious = (target: any, path: string) => formUtils.queryValue(get(target, path));

export const getPolicyOwnerInfo = (policyId: string, policyOwnerList: any[]) => {
  const policyOwner = find(policyOwnerList, (item) => item.policyId === policyId)?.ownerClientInfo;
  if (policyOwner?.id) delete policyOwner.id;
  return policyOwner;
};

export default {
  setClaimant,
  resetClaimant,
  getPrevious,
  getPolicyOwnerInfo,
};
