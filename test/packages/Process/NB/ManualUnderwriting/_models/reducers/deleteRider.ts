import { produce }  from 'immer';
import lodash from 'lodash';
import { isAutoAttachFunds } from '../../utils/fundUtils';

export default (state: any, action: any) => {
  const { id } = lodash.pick(action?.payload, ['id']);
  const { businessData } = state;
  const productFundCfgList = lodash.get(state, 'productCodeList', []);
  const coverageList = lodash.get(businessData, 'policyList[0].coverageList');
  const finalCoverageList = lodash
    .filter(coverageList, (item) => item.id !== id)
    .map((item, index) => ({ ...item, coverageNum: index + 1 }));

  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'stepsChange.PlanInfo', true);
    lodash.set(draftState, `businessData.policyList[0].coverageList`, finalCoverageList);
    if (isAutoAttachFunds(productFundCfgList)) {
      const totalFundInfoList = lodash.get(
        businessData,
        'policyList[0].fundInfo.totalFundInfoList'
      );
      let newTotalFundInfoList = totalFundInfoList;
      if (!lodash.some(finalCoverageList, (coverageItem) => coverageItem.productType === 'RT')) {
        newTotalFundInfoList = lodash.map(newTotalFundInfoList, (fund) => {
          return { ...fund, epaAllocation: null };
        });
      }
      if (!lodash.some(finalCoverageList, (coverageItem) => coverageItem.productType === 'AT')) {
        newTotalFundInfoList = lodash.map(newTotalFundInfoList, (fund) => {
          return { ...fund, adHocTopUpAllocation: null };
        });
      }
      lodash.set(
        draftState,
        `businessData.policyList[0].fundInfo.totalFundInfoList`,
        newTotalFundInfoList
      );
    }
  });
  return {
    ...nextState,
  };
};
