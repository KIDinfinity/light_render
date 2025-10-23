import initState from 'process/PHCLM/ClaimPaymentTrack/_models/state';
import effects from 'process/PHCLM/ClaimPaymentTrack/_models/effects';
import reducers from 'process/PHCLM/ClaimPaymentTrack/_models/reducers';

export default {
  namespace: 'PHCLMOfClaimPaymentTrackController',

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
