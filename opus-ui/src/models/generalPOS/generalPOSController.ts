import state from 'process/GeneralPOS/BaseProduct/_models/state';
import effects from 'process/GeneralPOS/BaseProduct/_models/effects';
import reducers from 'process/GeneralPOS/BaseProduct/_models/reducers';
import listeners from 'process/GeneralPOS/BaseProduct/_models/listeners';

export default {
  namespace: 'GeneralPOSController',

  state: {
    ...state,
  },

  effects: {
    ...effects,
    ...listeners,
  },

  reducers: {
    ...reducers,
  },
  subscriptions: {},
};
