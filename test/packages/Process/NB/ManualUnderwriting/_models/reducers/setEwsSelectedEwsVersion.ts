import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const selectedEwsVersion = lodash.get(action, 'payload.selectedEwsVersion');
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'selectedEwsVersion', selectedEwsVersion);
  });
  return {
    ...nextState,
  };
};
