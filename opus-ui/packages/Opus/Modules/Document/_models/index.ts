import state from './state';
import effects from './effects';
import listeners from './listeners';
import reducers from './reducers';

export default {
  namespace: 'documentManagement',
  state,
  effects: {
    ...effects,
    ...listeners,
  },
  reducers,
  subscriptions: {
    setup({ dispatch }: any) {
      dispatch({
        type: 'selectDocItemListener',
      });
      dispatch({
        type: 'selectToolItemListener',
      });
    },
  },
};
