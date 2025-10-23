import state from 'packages/Opus/Pages/Process/POS/BaseProduct/_models/state';
import effects from 'packages/Opus/Pages/Process/POS/BaseProduct/_models/effects';
import reducers from 'packages/Opus/Pages/Process/POS/BaseProduct/_models/reducers';

export default {
  namespace: 'opusGeneralPOSController',

  state: {
    ...state,
  },

  effects: {
    ...effects,
  },

  reducers: {
    ...reducers,
  },
  subscriptions: {},
};
