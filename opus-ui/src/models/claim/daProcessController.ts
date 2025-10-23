import initState from 'claim/pages/Thailand/ProcessOfDA/DAOfCreate/_models/state';
import effects from 'claim/pages/Thailand/ProcessOfDA/DAOfCreate/_models/effects';
import reducers from 'claim/pages/Thailand/ProcessOfDA/DAOfCreate/_models/reducers';
import listeners from 'claim/pages/Thailand/ProcessOfDA/DAOfCreate/_models/listeners';

export default {
  namespace: 'daProcessController',
  state: {
    ...initState,
  },

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
        type: 'saveErrorCountListener',
      });
    },
  },
};
