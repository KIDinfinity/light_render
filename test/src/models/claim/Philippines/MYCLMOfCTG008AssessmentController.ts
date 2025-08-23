import initState from 'process/MYCLM/ManualAssessment/_models/state';
import effects from 'process/MYCLM/ManualAssessment/_models/effects';
import reducers from 'process/MYCLM/ManualAssessment/_models/reducers';
import listeners from 'process/MYCLM/ManualAssessment/_models/listeners';

export default {
  namespace: 'MYCLMOfCTG008AssessmentController',

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
