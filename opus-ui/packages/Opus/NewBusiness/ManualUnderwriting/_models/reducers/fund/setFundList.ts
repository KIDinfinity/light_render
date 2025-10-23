import { produce } from 'immer';
import lodash from 'lodash';

type TAction = {
  type: any;
  payload: {
    fundList: any[];
  };
};

export default (state: any, action: TAction) => {
  const { fundList } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    const fundsObj = fundList?.reduce((pre, nxt) => {
      if (nxt?.id) {
        return { ...pre, [nxt.id]: nxt };
      }
      return pre;
    }, {});
    lodash.set(draftState, 'modalData.fund.fundList', fundsObj);
  });
  return { ...nextState };
};
