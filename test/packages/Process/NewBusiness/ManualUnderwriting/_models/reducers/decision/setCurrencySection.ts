import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { currencyCode } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'processData.planInfoData.currencyCode', currencyCode);
  });
  return { ...nextState };
};
