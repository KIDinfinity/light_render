import initState from 'claim/pages/Thailand/ProcessOfDA/DAOfQualityControl/_models/state';
import effects from 'claim/pages/Thailand/ProcessOfDA/DAOfQualityControl/_models/effects';
import reducers from 'claim/pages/Thailand/ProcessOfDA/DAOfQualityControl/_models/reducers';
import listeners from 'claim/pages/Thailand/ProcessOfDA/DAOfQualityControl/_models/listeners';

export default {
  namespace: 'daOfClaimCaseController',

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
        type: 'saveBenefitPayableItemListener',
      });

      dispatch({
        type: 'saveInvoiceItemListener',
      });
      dispatch({
        type: 'saveServiceItemListener',
      });
    },
  },
};
