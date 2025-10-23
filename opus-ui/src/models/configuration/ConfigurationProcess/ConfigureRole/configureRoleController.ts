import {
  state,
  effects,
  reducers,
} from 'configuration/pages/ConfigurationProcess/ConfigureRole/DataConfiguration/_models';

export default {
  namespace: 'configureRoleController',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
