import initState from 'claim/pages/Thailand/ProcessOfAP/APOfAssessment/_models/state';
import effects from 'claim/pages/Thailand/ProcessOfAP/APOfAssessment/_models/effects';
import reducers from 'claim/pages/Thailand/ProcessOfAP/APOfAssessment/_models/reducers';
import listeners from 'claim/pages/Thailand/ProcessOfAP/APOfAssessment/_models/listeners';

export default {
  namespace: 'apOfClaimAssessmentController',

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
  subscriptions: {
    setup({ dispatch }) {
      dispatch({
        type: 'saveIncidentDecisionListener',
      });

      dispatch({
        type: 'saveClaimProcessDataListener',
      });
    },
  },
};
