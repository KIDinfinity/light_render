import initState from 'claimBasicProduct/pages/DataCapture/_models/state';
import effects from 'claimBasicProduct/pages/DataCapture/_models/effects';
import reducers from 'claimBasicProduct/pages/DataCapture/_models/reducers';

export default {
  namespace: 'bpOfDataCaptureController',

  state: {
    ...initState,
  },

  effects: {
    ...effects,
  },

  reducers: {
    ...reducers,
  },
};
