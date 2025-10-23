import { state, effects, reducers } from 'claim/pages/ExceptionalHandling/_models';

export default {
  namespace: 'exceptionalHandlingController',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
