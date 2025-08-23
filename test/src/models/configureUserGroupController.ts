import {
  state,
  effects,
  reducers,
} from '../../packages/Configuration/src/pages/ConfigurationProcess/ConfigureUserGroup/DataConfiguration/_models';

export default {
  namespace: 'configureUserGroupController',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
