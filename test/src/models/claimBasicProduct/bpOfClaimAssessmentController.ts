import initState from 'claimBasicProduct/pages/ManualAssessment/_models/state';
import effects from 'claimBasicProduct/pages/ManualAssessment/_models/effects';
import reducers from 'claimBasicProduct/pages/ManualAssessment/_models/reducers';
import listeners from 'claimBasicProduct/pages/ManualAssessment/_models/listeners';

export default {
  namespace: 'bpOfClaimAssessmentController',

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
        type: 'saveInvoicePayableAddItemListener',
      });

      dispatch({
        type: 'saveServicePayableAddItemListener',
      });

      dispatch({
        type: 'updatePayableAmountListener',
      });
    },
  },
};
