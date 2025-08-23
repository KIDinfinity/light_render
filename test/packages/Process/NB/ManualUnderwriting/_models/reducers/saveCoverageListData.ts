import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const policyList = lodash.get(action, 'payload.businessData.policyList[0]', {});
  const isWaive = lodash.get(action, 'payload.isWaive');
  const {
    coverageList,
    policyBasePremium,
    policyLoadingPremium,
    policyInstalmentPremiumWithTax,
    premiumBreakdownBOList,
    actualPremiumDue,
  } = lodash.pick(policyList, [
    'coverageList',
    'policyBasePremium',
    'policyLoadingPremium',
    'policyInstalmentPremiumWithTax',
    'premiumBreakdownBOList',
    'actualPremiumDue',
  ]);
  const nextState = produce(state, (draftState: any) => {
    if (isWaive) {
      lodash.set(draftState, 'businessData.policyList[0].actualPremiumDue', actualPremiumDue);
    }
    lodash.set(draftState, 'businessData.policyList[0].coverageList', coverageList);
    lodash.set(draftState, 'businessData.policyList[0].policyBasePremium', policyBasePremium);
    lodash.set(draftState, 'businessData.policyList[0].policyLoadingPremium', policyLoadingPremium);
    lodash.set(
      draftState,
      'businessData.policyList[0].policyInstalmentPremiumWithTax',
      policyInstalmentPremiumWithTax
    );
    lodash.set(
      draftState,
      'businessData.policyList[0].premiumBreakdownBOList',
      premiumBreakdownBOList
    );
  });
  return {
    ...nextState,
  };
};
