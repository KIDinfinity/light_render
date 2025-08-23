import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const addLoadingModalVisible = lodash.get(action, 'payload.addLoadingModalVisible', false);

  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'addLoadingModalVisible', addLoadingModalVisible);
  });
  return { ...nextState };
};
