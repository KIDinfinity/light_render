import initState from 'claim/pages/Thailand/ProcessOfHB/HBOfAssessment/_models/state';
import effects from 'claim/pages/Thailand/ProcessOfHB/HBOfAssessment/_models/effects';
import reducers from 'claim/pages/Thailand/ProcessOfHB/HBOfAssessment/_models/reducers';
import listeners from 'claim/pages/Thailand/ProcessOfHB/HBOfAssessment/_models/listeners';

export default {
  namespace: 'hbOfClaimAssessmentController',

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
        type: 'saveClaimProcessDataListener',
      });

      dispatch({
        type: 'saveClaimPayableItemListener',
      });

      dispatch({
        type: 'saveTreatmentPayableAddItemListener',
      });

      dispatch({
        type: 'updatePayableAmountListener',
      });

      dispatch({
        type: 'saveBenefitPayableItemListener',
      });
    },
  },
};
