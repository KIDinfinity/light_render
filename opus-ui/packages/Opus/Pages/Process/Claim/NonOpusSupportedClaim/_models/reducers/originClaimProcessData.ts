import { produce } from 'immer';
import lodash from 'lodash';

const originClaimProcessData = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { businessData } = action.payload;
    draftState.originClaimProcessData = lodash.cloneDeep(businessData);
  });
  return { ...nextState };
};

export default originClaimProcessData;
