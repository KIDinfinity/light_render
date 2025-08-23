import state from 'packages/SupportCenter/_models/state';
import effects from 'packages/SupportCenter/_models/effects';
import reducers from 'packages/SupportCenter/_models/reducers';

export default {
  namespace: 'supportCenterController',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
