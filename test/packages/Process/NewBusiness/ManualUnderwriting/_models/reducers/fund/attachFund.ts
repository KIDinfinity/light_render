import { produce } from 'immer';
import lodash from 'lodash';
import { isAutoAttachFunds } from 'process/NB/ManualUnderwriting/utils/fundUtils';
import { getAutoAttachFunds } from 'process/NewBusiness/ManualUnderwriting/Pages/Fund/utils';
type TAction = {
  type: any;
  payload: {
    portfolioType: any;
  };
};
export default (state: any, action: TAction) => {
  const { portfolioType } = action.payload;
  const productFundCfgList = lodash.get(state, 'modalData.fund.productCodeList', []);
  const coverageList = lodash.get(state, 'processData.coverageList', []);

  const nextState = produce(state, (draftState: any) => {
    if (isAutoAttachFunds(productFundCfgList)) {
      const attachFunds = getAutoAttachFunds(productFundCfgList, portfolioType, coverageList);
      lodash.set(draftState, 'modalData.fund.fundList', attachFunds);
    }
  });
  return { ...nextState };
};
