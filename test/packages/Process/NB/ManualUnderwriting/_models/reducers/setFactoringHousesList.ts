import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const factoringHousesList = lodash.get(action, 'payload.factoringHousesList', []);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'factoringHousesList', factoringHousesList);
  });
  return {
    ...nextState,
  };
};
