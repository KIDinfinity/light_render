import { produce }  from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const possibleSusOptNames = lodash.get(action, 'possibleSusOptNames', []);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'possibleSusOptNames', possibleSusOptNames);
  });
  return {
    ...nextState,
  };
};
