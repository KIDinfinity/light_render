import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: Object) => {
  const informationData = lodash.get(action, 'payload.informationData', {});
  const nextState = produce(state, (draftState: any) => {
    draftState.informationData = informationData;
  });
  return {
    ...nextState,
  };
};
