import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any) => {
  const productCodeList = lodash.get(state, 'productCodeList', []);
  const nextState = produce(state, (draftState: any) => {
    if (
      !lodash.isEmpty(productCodeList) &&
      lodash.some(
        productCodeList,
        (productCode) => productCode.cfgPlanFundBOS && productCode.cfgPlanFundBOS.length > 0
      )
    ) {
      lodash.set(draftState, `businessData.policyList[0].fundInfo.totalFundInfoList`, []);
    }
  });
  return nextState;
};
