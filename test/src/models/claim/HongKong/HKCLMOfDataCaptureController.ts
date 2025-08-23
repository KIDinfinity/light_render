import initState from 'process/HKCLM/DataCapture/_models/state';
import effects from 'process/HKCLM/DataCapture/_models/effects';
import reducers from 'process/HKCLM/DataCapture/_models/reducers';

export default {
  namespace: 'HKCLMOfDataCaptureController',

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
