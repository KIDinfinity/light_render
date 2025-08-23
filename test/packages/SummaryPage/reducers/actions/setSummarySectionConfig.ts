import { produce } from 'immer';
import lodash from 'lodash';

export default (state: any, action: any) => {
  const summarySectionConfig = lodash.get(action, 'payload.summarySectionConfig', []);
  const nextState = produce(state, (draftState: any) => {
    lodash.set(draftState, 'summarySectionConfig', summarySectionConfig);
  });
  return nextState;
};
