import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, { payload }: any) => {
  const { resultData,selectedBasicPlan } = payload || {};
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'productDetailList', lodash.chain(resultData).value());
    lodash.set(draftState, 'selectedBasicPlan', selectedBasicPlan);
  });
  return {
    ...nextState,
  };
};
