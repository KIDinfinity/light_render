import initState from 'opus/Pages/Process/Claim/ManualAssessment/_models/state';
import effects from 'opus/Pages/Process/Claim/ManualAssessment/_models/effects';
import reducers from 'opus/Pages/Process/Claim/ManualAssessment/_models/reducers';
import listeners from 'opus/Pages/Process/Claim/ManualAssessment/_models/listeners';

export default {
  namespace: 'opusAssessment',

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
