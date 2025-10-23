import state from 'process/BPSRV/ServicingDecision/_models/state';
import effects from 'process/BPSRV/ServicingDecision/_models/effects';
import reducers from 'process/BPSRV/ServicingDecision/_models/reducers';
import listeners from 'process/BPSRV/ServicingDecision/_models/listeners';

export default {
  namespace: 'BPSRVOfServicingDecisionController',

  state: {
    ...state,
  },

  effects: {
    ...effects,
    ...listeners,
  },

  reducers: {
    ...reducers,
  },
  subscriptions: {
  },
};

