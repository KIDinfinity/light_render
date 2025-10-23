import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const waiveLoadingModalVisible = lodash.get(action, 'payload.waiveLoadingModalVisible', {});
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'waiveLoadingModalVisible', waiveLoadingModalVisible);
  });
  return {
    ...nextState,
  };
};
