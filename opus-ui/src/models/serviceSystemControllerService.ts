import initState from 'serviceSystem/_models/state';
import effects from 'serviceSystem/_models/effects';
import reducers from 'serviceSystem/_models/reducers';

export default {
  namespace: 'serviceSystemController',

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
