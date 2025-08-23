import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const addDPRemarkModalVisible = lodash.get(action, 'payload.addDPRemarkModalVisible', false);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'addDPRemarkModalVisible', addDPRemarkModalVisible);
  });
  return { ...nextState };
};
