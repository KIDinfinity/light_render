import initState from 'claim/pages/Thailand/ProcessOfAP/APOfQualityControl/_models/state';
import effects from 'claim/pages/Thailand/ProcessOfAP/APOfQualityControl/_models/effects';
import reducers from 'claim/pages/Thailand/ProcessOfAP/APOfQualityControl/_models/reducers';

export default {
  namespace: 'apOfClaimCaseController',

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
