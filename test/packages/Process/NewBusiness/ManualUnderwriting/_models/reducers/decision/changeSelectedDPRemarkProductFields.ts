import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const changedFields = lodash.get(action, 'payload.changedFields', {});
  const nextState = produce(state, (draftState: any) => {
    if (!lodash.isEmpty(changedFields)) {
      lodash.set(draftState, 'addDPRemarkSelectedProduct', {
        ...state.addDPRemarkSelectedProduct,
        ...changedFields,
      });
    }
  });
  return { ...nextState };
};
