/* eslint-disable import/no-unresolved */
import initState from './state';
import effects from './effects';
import reducers from './reducers';
import listeners from './listeners';

export default {
  namespace: 'JPCLMOfClaimAssessmentController',

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
    setup({ dispatch }: any) {
      dispatch({
        type: 'saveIncidentPayableListener',
      });

      dispatch({
        type: 'saveClaimProcessDataListener',
      });

      dispatch({
        type: 'saveTreatmentPayableAddItemListener',
      });

      dispatch({
        type: 'updatePayableAmountListener',
      });

      dispatch({
        type: 'reCauseOfIncidentListener',
      });

      dispatch({
        type: 'updatePaymentAmountListener',
      });

      dispatch({
        type: 'saveListPendingInfoListener',
      });
    },
  },
};
