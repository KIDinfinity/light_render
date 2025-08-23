import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const ewsVersions = lodash.get(action, 'payload.ewsVersions', []);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'ewsVersions', ewsVersions);
  });
  return {
    ...nextState,
  };
};
