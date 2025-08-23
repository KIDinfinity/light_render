import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const brankList = lodash.get(action, 'payload.brankList', {});
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'brankList', brankList);
  });
  return {
    ...nextState,
  };
};
