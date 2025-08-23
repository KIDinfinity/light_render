import { produce } from 'immer';
import lodash from 'lodash';

type TAction = {
  type: any;
  payload: {
    productCodeList: any[];
  };
};

export default (state: any, action: TAction) => {
  const { productCodeList } = action.payload;
  const productFundCodeMap = productCodeList.reduce((pre, nxt) => {
    if (!nxt?.fundCode) return pre;
    return { ...pre, [nxt.fundCode]: nxt };
  }, {});
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'modalData.fund.productCodeList', productFundCodeMap);
  });
  return { ...nextState };
};
