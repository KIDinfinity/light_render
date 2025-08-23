import {
  state,
  effects,
  reducers,
} from 'configuration/pages/ConfigurationProcess/ConfigureUser/DataConfiguration/_models';

export default {
  namespace: 'configureUserController',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
