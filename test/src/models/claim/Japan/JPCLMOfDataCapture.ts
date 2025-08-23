import initState from 'process/JPCLM/DataCapture/_models/state';
import effects from 'process/JPCLM/DataCapture/_models/effects';
import reducers from 'process/JPCLM/DataCapture/_models/reducers';

export default {
  namespace: 'JPCLMOfDataCapture',

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
