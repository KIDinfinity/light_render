import state from 'navigator/pages/Home/Watching/_models/state';
import * as effects from 'navigator/pages/Home/Watching/_models/effects';
import * as reducers from 'navigator/pages/Home/Watching/_models/reducers';

export default {
  namespace: 'navigatorHomeWatching',

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
