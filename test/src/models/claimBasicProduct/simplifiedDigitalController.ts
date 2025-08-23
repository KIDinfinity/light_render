import initState from 'claimBasicProduct/pages/SimplifiedDigital/CaseCreation/_models/state';
import effects from 'claimBasicProduct/pages/SimplifiedDigital/CaseCreation/_models/effects';
import listeners from 'claimBasicProduct/pages/SimplifiedDigital/CaseCreation/_models/listeners';
import reducers from 'claimBasicProduct/pages/SimplifiedDigital/CaseCreation/_models/reducers';

export default {
  namespace: 'simplifiedDigitalController',

  state: {
    ...initState,
  },

  effects: {
    ...effects,
    ...listeners,
  },

  reducers: {
    ...reducers,
  },

  subscriptions: {},
};
