import { state, effects, reducers } from 'basic/models/atomConfig';

export default {
  namespace: 'atomConfig',
  state,
  effects: {
    ...effects,
  },
  reducers,
};
