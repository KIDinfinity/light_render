import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const policyList = lodash.get(action, 'payload.businessData.policyList[0]', {});
  const isWaive = lodash.get(action, 'payload.isWaive');
  const {
    coverageList,
    policyBasePremium,
    policyLoadingPremium,
    policyInstalmentPremiumWithTax,
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
      lodash.set(draftState, 'processData.planInfoData.actualPremiumDue', actualPremiumDue);
    }
    lodash.set(draftState, 'processData.coverageList', coverageList);
    lodash.set(draftState, 'processData.planInfoData.policyBasePremium', policyBasePremium);
    lodash.set(draftState, 'processData.planInfoData.policyLoadingPremium', policyLoadingPremium);
    lodash.set(
      draftState,
      'processData.planInfoData.policyInstalmentPremiumWithTax',
      policyInstalmentPremiumWithTax
    );
  });
  return {
    ...nextState,
  };
};
