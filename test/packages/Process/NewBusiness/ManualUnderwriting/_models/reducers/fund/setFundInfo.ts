import { produce } from 'immer';
import lodash from 'lodash';

type TAction = {
  type: any;
  payload: {
    changedFields: any;
  };
};

export default (state: any, action: TAction) => {
  const { changedFields } = action.payload;
  const fundInfo = lodash.get(state, 'modalData.fund.fundInfo', {});

  const nextState = produce(state, (draftState: any) => {
    draftState.modalData.fund.fundInfo = { ...fundInfo, ...changedFields };
  });
  return { ...nextState };
};
