import initState from 'process/PHCLM/ManualAssessment/_models/state';
import effects from 'process/PHCLM/ManualAssessment/_models/effects';
import reducers from 'process/PHCLM/ManualAssessment/_models/reducers';
import listeners from 'process/PHCLM/ManualAssessment/_models/listeners';

export default {
  namespace: 'PHCLMOfCTG008AssessmentController',

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

      dispatch({
        type: 'handleAssessDecisionListener',
      });
    },
  },
};
