import { initialState } from 'navigator/pages/User/_models/state';
import effects from 'navigator/pages/User/_models/effects';
import reducers from 'navigator/pages/User/_models/reducers';

export default {
  namespace: 'userManagement',

  state: {
    ...initialState,
  },

  effects: {
    ...effects,
  },

  reducers: {
    ...reducers,
  },
};
