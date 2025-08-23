import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const { result, cascadeAdressKey } = action?.payload;
  const nextState = produce(state, (draftState: any) => {
    if (cascadeAdressKey && Array.isArray(result)) {
      lodash.set(draftState.cascadeAdress, cascadeAdressKey, result);
    }
  });
  return { ...nextState };
};
