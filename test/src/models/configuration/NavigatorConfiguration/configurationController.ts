import { state, effects, reducers } from 'configuration/pages/NavigatorConfiguration/_models';

export default {
  namespace: 'configurationController',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
