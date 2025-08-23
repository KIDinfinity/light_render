import initState from 'process/MYCLM/ClaimPaymentTrack/_models/state';
import effects from 'process/MYCLM/ClaimPaymentTrack/_models/effects';
import reducers from 'process/MYCLM/ClaimPaymentTrack/_models/reducers';

export default {
  namespace: 'MYCLMOfClaimPaymentTrackController',

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
