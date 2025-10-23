import initState from 'process/JPCLM/ManualAssessment/_models/state';
import effects from 'process/JPCLM/ManualAssessment/_models/effects';
import reducers from 'process/JPCLM/ManualAssessment/_models/reducers';
import listeners from 'process/JPCLM/ManualAssessment/_models/listeners';

export default {
  namespace: 'JPCLMOfClaimAssessment',

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

      dispatch({
        type: 'saveProcedurePayableAddItemListener',
      });

      dispatch({
        type: 'saveOtherProcedurePayableAddItemListener',
      });
    },
  },
};
