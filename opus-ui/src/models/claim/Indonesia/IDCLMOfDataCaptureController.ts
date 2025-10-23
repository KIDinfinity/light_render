import initState from 'process/IDCLM/DataCapture/_models/state';
import effects from 'process/IDCLM/DataCapture/_models/effects';
import reducers from 'process/IDCLM/DataCapture/_models/reducers';

export default {
  namespace: 'IDCLMOfDataCaptureController',

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
