import lodash from 'lodash';
import { produce } from 'immer';

export default (state: any, action: any) => {
  const { key, result } = lodash.pick(action?.payload, ['key', 'result']);
  const nextState = produce(state, (draftState: any) => {
    if (result) {
      draftState.sections[`${key}`] = result;
      draftState.sections.default = result;
    } else {
      draftState.sections.default = draftState.sections[`${key}`];
    }
  });
  return nextState;
};
