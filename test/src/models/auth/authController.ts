import { state, effects, reducers } from '@/auth/_models';

export default {
  namespace: 'authController',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
