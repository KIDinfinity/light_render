import state from './state/state';
import effects from './effects/effects';
import reducers from './reducers/reducers';
import listeners from './listeners';

export default {
  namespace: 'reportCenterController',
  state,
  effects: {
    ...effects,
    ...listeners,
  },
  reducers: {
    ...reducers,
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({
        type: 'findStorageListener',
      });
    },
  },
};
