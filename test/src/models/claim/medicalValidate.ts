import { validateMedicalName } from '@/utils/medicalSearch';
import lodash from 'lodash';

export default {
  namespace: 'medicalValidate',
  state: {
    validateResult: {},
    values: {},
  },
  effects: {
    *updateValues(_) {},
    *validateRequest({ payload }, { put, call }) {
      const { item, fields, objectType, preItem, key, changeFormAction, changeFormParams } =
        lodash.pick(payload, [
          'item',
          'fields',
          'objectType',
          'preItem',
          'key',
          'changeFormAction',
          'changeFormParams',
        ]);
      const { warningList, needUpdate } = yield call(validateMedicalName, {
        item,
        fields,
        objectType,
        preItem,
      });
      if (needUpdate) {
        yield put({
          type: 'updateValidateResult',
          payload: {
            warningList,
            key,
          },
        });
        yield put({
          type: changeFormAction,
          payload: {
            messageList: warningList,
            formData: item,
            ...changeFormParams,
          },
        });
      }
    },
    *delayValidateRequest(_, { put, throttle }) {
      yield throttle(3000, 'medicalValidate/updateValues', function* action(ac: any) {
        yield put({
          type: 'validateRequest',
          payload: ac?.payload,
        });
      });
    },
  },
  reducers: {
    updateValidateResult(state, action: any) {
      const { key, warningList } = lodash.pick(action?.payload, ['key', 'warningList']);
      return {
        ...state,
        validateResult: {
          ...state?.validateResult,
          [key]: warningList,
        },
      };
    },
    cleanValidateResult() {},
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({
        type: 'delayValidateRequest',
      });
    },
  },
};
