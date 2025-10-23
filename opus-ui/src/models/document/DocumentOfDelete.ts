import initState from 'process/Document/_models/state';
import effects from 'process/Document/_models/effects';
import reducers from 'process/Document/_models/reducers';

export default {
  namespace: 'DocumentOfDeleteController',

  state: {
    ...initState,
  },

  effects: {
    ...effects,
  },

  reducers: {
    ...reducers,
  },
};
