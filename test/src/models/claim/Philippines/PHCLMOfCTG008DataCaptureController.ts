import initState from 'process/PHCLM/DataCapture/_models/state';
import effects from 'process/PHCLM/DataCapture/_models/effects';
import reducers from 'process/PHCLM/DataCapture/_models/reducers';

export default {
  namespace: 'PHCLMOfCTG008DataCaptureController',

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
