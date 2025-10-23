import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const ewsData = lodash.get(action, 'payload.ewsData', []);
  const nextState = produce(state, (draftState: any) => {
    return lodash.set(draftState, 'ewsData', ewsData);
  });
  return {
    ...nextState,
  };
};
