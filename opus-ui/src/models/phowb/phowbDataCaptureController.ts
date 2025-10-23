import { state, effects, reducers, listeners } from 'phowb/pages/POS/_models';

export default {
  namespace: 'phowbDataCaptureController',
  state,
  effects: {
    ...effects,
    ...listeners,
  },
  reducers,
};
