import { produce } from 'immer';
import claimHospitalBillingControllerService from '@/services/claimHospitalBillingControllerService';

export default {
  namespace: 'hbProcessController',

  state: {
    billing: {
      amount: null,
      coverPageNo: '',
      firstName: '',
      invoiceNo: '',
      lastName: '',
      type: '',
      visitDate: '',
    },
  },

  effects: {
    *create({ payload }, { call }) {
      const response = yield call(claimHospitalBillingControllerService.submit, payload);
      return response;
    },
  },

  reducers: {
    saveBilling(state, { payload }) {
      return produce(state, (draft) => {
        Object.keys(payload.changedFields).forEach((changedFieldName) => {
          draft.billing[changedFieldName] = payload.changedFields[changedFieldName];
        });
      });
    },
    setType(state, { payload }) {
      return produce(state, (draft) => {
        draft.billing.type = payload.dictCode;
      });
    },
  },
};
