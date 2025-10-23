import state from 'packages/Opus/Pages/Process/Claim/ManualAssessment/_models/state';
import effects from 'packages/Opus/Pages/Process/Claim/ManualAssessment/_models/effects';
import reducers from 'packages/Opus/Pages/Process/Claim/ManualAssessment/_models/reducers';
import listeners from 'packages/Opus/Pages/Process/Claim/ManualAssessment/_models/listeners';

export default {
  namespace: 'opusClaimAssessment',
  state,
  effects: {
    ...effects,
    ...listeners,
  },
  reducers,
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
