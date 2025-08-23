import state from './state';
import effects from './effects';
import listeners from './listeners';
import reducers from './reducers';

export default {
  namespace: 'PHCLMOfClaimAssessmentController',
  state,
  effects: {
    ...effects,
    ...listeners,
  },
  reducers,
  subscriptions: {
    setup({ dispatch }: any) {
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
        type: 'saveAccidentBenefitPayableItemListener',
      })
    },
  },
};
