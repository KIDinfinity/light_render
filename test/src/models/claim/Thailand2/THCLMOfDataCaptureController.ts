import initState from 'process/THCLM/DataCapture/_models/state';
import effects from 'process/THCLM/DataCapture/_models/effects';
import reducers from 'process/THCLM/DataCapture/_models/reducers';

export default {
  namespace: 'THCLMOfDataCaptureController',

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
