import initState from 'process/IDCLM/ManualAssessment/_models/state';
import effects from 'process/IDCLM/ManualAssessment/_models/effects';
import reducers from 'process/IDCLM/ManualAssessment/_models/reducers';
import listeners from 'process/IDCLM/ManualAssessment/_models/listeners';

export default {
  namespace: 'IDCLMOfClaimAssessmentController',

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
