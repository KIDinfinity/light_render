import { state, effects, reducers, listeners } from 'navigator/pages/AdvancedQuery/_models';

export default {
  namespace: 'NewAdvancedQueryController',
  state,
  effects: {
    ...effects,
    ...listeners,
  },
  reducers,
};
