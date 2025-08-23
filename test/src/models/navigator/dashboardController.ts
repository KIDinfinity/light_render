import { reducers, listeners, effects, state } from 'navigator/pages/Home/Dashboard/_models';

export default {
  namespace: 'dashboardController',
  state,
  effects: {
    ...effects,
    ...listeners,
  },
  reducers,
};
