import { state, effects, reducers } from 'bpm/pages/Information/_models';

export default {
  namespace: 'navigatorInformationController',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
