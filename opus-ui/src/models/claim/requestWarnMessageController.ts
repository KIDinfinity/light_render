import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { formUtils } from 'basic/components/Form';
import handleMessageModal from '@/utils/commonMessage';
import { test } from '@/services/claimWarningMessageControllerService';

export default {
  namespace: 'requestWarnMessageController',
  state: {
    formData: {
      name: '',
      age: 11,
      weight: 99,
    },
  },
  effects: {
    *submitFormData(_, { call, select }) {
      let formData = yield select((state) => state.requestWarnMessageController.formData);
      formData = objectToFormData(formUtils.cleanValidateData(formData));
      const response = yield call(test, formData);
      if (response?.success) {
        // eslint-disable-next-line no-alert
        alert('你很棒棒！');
      } else if (response?.resultData && response.resultData['x-warn-nonce']) {
        // eslint-disable-next-line no-console
        console.log('你不太行！');
      } else {
        handleMessageModal(response?.promptMessages);
      }
    },
  },
  reducers: {
    saveFormData(state, { payload }) {
      const formData = lodash.cloneDeep(state.formData);
      const { changedFields } = payload;
      const newFormData = {
        ...formData,
        ...changedFields,
      };
      return {
        ...state,
        formData: newFormData,
      };
    },
  },
};
