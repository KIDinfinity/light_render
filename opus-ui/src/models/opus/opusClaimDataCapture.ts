import state from 'packages/Opus/Pages/Process/Claim/DataCapture/_models/state';
import effects from 'packages/Opus/Pages/Process/Claim/DataCapture/_models/effects';
import reducers from 'packages/Opus/Pages/Process/Claim/DataCapture/_models/reducers';


export default {
  namespace: 'opusClaimDataCapture',

  state: {
    ...state,
  },

  effects: {
    ...effects,
  },

  reducers: {
    ...reducers,
  },
};
