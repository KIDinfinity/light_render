import { produce }  from 'immer';
import lodash from 'lodash';
import { getAutoAttachFunds, isAutoAttachFunds } from '../../utils/fundUtils';
import { formUtils } from 'basic/components/Form';

export default (state: any, action: any) => {
  const productFundCfgList = lodash.get(state, 'productCodeList', []);
  const coverageList = lodash.get(state, 'businessData.policyList[0].coverageList', []);
  const { changedFields } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    if (!(lodash.size(changedFields) === 1 && changedFields?.totalFundAllocation)) {
      lodash.set(draftState, 'stepsChange.PlanInfo', true);
    }
    const fundInfo = lodash.get(draftState, 'businessData.policyList[0].fundInfo');
    if (
      isAutoAttachFunds(productFundCfgList) &&
      lodash.has(changedFields, 'portfolioType') &&
      formUtils.queryValue(changedFields.portfolioType) !==
        formUtils.queryValue(fundInfo.portfolioType)
    ) {
      const attachFunds = getAutoAttachFunds(
        productFundCfgList,
        formUtils.queryValue(changedFields.portfolioType),
        coverageList
      );
      lodash.set(draftState, 'businessData.policyList[0].fundInfo.totalFundInfoList', attachFunds);
    }
    lodash.set(draftState, 'businessData.policyList[0].fundInfo', {
      ...fundInfo,
      ...changedFields,
    });
  });
  return { ...nextState };
};
