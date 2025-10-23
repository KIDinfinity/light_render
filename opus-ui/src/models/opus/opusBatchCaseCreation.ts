import state from 'packages/Opus/Pages/Process/Claim/BatchCaseCreation/_models/state';
import effects from 'packages/Opus/Pages/Process/Claim/BatchCaseCreation/_models/effects';
import reducers from 'packages/Opus/Pages/Process/Claim/BatchCaseCreation/_models/reducers';
import { NAMESPACE } from 'packages/Opus/Pages/Process/Claim/BatchCaseCreation/activity.config';

export default {
  namespace: NAMESPACE,

  state: {
    ...state,
  },

  effects: {
    ...effects,
  },

  reducers: {
    ...reducers,
  },
};
