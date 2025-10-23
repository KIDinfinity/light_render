import initState from 'claim/pages/Thailand/ProcessOfDA/DAOfAssessment/_models/state';
import effects from 'claim/pages/Thailand/ProcessOfDA/DAOfAssessment/_models/effects';
import reducers from 'claim/pages/Thailand/ProcessOfDA/DAOfAssessment/_models/reducers';
import listeners from 'claim/pages/Thailand/ProcessOfDA/DAOfAssessment/_models/listeners';

export default {
  namespace: 'daOfClaimAssessmentController',

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
        type: 'saveAccidentBenefitPayableItemListener',
      });

      dispatch({
        type: 'saveBenefitPayableItemListener',
      });

      dispatch({
        type: 'saveInvoiceItemListener',
      });

      dispatch({
        type: 'complementClaimPayableListener',
      });
      dispatch({
        type: 'saveServiceItemListener',
      });
      dispatch({
        type: 'saveCompareDataListener',
      })
    },
  },
};
