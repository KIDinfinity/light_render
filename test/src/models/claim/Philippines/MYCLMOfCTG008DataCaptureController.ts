import initState from 'process/MYCLM/DataCapture/_models/state';
import effects from 'process/MYCLM/DataCapture/_models/effects';
import reducers from 'process/MYCLM/DataCapture/_models/reducers';

export default {
  namespace: 'MYCLMOfCTG008DataCaptureController',

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
