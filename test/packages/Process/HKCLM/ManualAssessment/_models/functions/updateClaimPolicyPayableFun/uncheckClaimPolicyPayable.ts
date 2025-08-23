import { formUtils } from 'basic/components/Form';

export default (draftState, policyNo) => {
  if(draftState.claimProcessData?.claimPolicyPayableList?.length) {
    draftState.claimProcessData.claimPolicyPayableList = draftState.claimProcessData.claimPolicyPayableList.map(item => {
      if(policyNo && item.policyNo !== policyNo)
        return item;
      if(formUtils.queryValue(item.ncdFlag) !== 'Y')
        return item;
      return {
        ...item,
        ncdFlag: 'N'
      }
    })
  }
}