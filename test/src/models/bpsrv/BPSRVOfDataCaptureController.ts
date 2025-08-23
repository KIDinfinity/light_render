import state from 'process/BPSRV/DataCapture/_models/state';
import effects from 'process/BPSRV/DataCapture/_models/effects';
import reducers from 'process/BPSRV/DataCapture/_models/reducers';
import listeners from 'process/BPSRV/DataCapture/_models/listeners';

export default {
  namespace: 'BPSRVOfDataCaptureController',

  state: {
    ...state,
  },

  effects: {
    ...effects,
    ...listeners,
  },

  reducers: {
    ...reducers,
  },
  subscriptions: {
  },
};

