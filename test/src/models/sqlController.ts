import { state, effects, reducers } from '../../packages/SQL/_models';

export default {
  namespace: 'sqlController',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
