import { state, effects, reducers, listeners } from 'process/GeneralPOS/PHNotCFT/_models';

export default {
  namespace: 'GeneralPOSPHNotCFTController',
  state,
  effects: {
    ...effects,
    ...listeners,
  },
  reducers,
};
