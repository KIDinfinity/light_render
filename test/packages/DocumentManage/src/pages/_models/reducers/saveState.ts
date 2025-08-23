import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    lodash.keys(action?.payload).forEach((key) => {
      draft[key] = action.payload[key];
    });
  });
};
