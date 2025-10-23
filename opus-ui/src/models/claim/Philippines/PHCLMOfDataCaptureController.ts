import initState from 'claim/pages/Philippines/ProcessOfPHICLM/DataCapture/_models/state';
import effects from 'claim/pages/Philippines/ProcessOfPHICLM/DataCapture/_models/effects';
import reducers from 'claim/pages/Philippines/ProcessOfPHICLM/DataCapture/_models/reducers';

export default {
  namespace: 'PHCLMOfDataCaptureController',

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
