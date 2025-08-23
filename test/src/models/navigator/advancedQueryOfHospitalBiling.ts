// @ts-ignore
import { saga } from 'dva';
import lodash from 'lodash';
import { resRevert } from '@/utils/transform';
import { formUtils } from 'basic/components/Form';
import HosBillingService from '@/services/claimHospitalBillingControllerService';

const { delay } = saga;

export default {
  namespace: 'advancedQueryOfHospitalBiling',

  state: {
    hospitalNameList: [],
    hospitalBillingList: [],
  },

  effects: {
    // TODO: 这里可以封装成一个通用类方法
    *gethospitalList({ payload }: any, { call, put }: any) {
      const response = yield call(HosBillingService.getHospitalName, payload);

      const list = lodash.get(response, 'resultData.rows', []);
      const result = lodash.set(response, 'resultData.rows', list);

      if (response?.success) {
        yield put({
          type: 'save',
          payload: {
            hospitalNameList: resRevert(result),
          },
        });
      }
    },
    getHospitalBilling: [
      function* getHospitalBilling({ payload }: any, { call, put }: any) {
        yield delay(0);

        // @ts-ignore
        const newParams = formUtils.transfersParams(payload);

        const response = yield call(HosBillingService.getHospitalBilling, newParams);

        const list = lodash.get(response, 'resultData.rows', []);
        const result = lodash.set(response, 'resultData.rows', list);

        if (response?.success) {
          yield put({
            type: 'save',
            payload: {
              hospitalBillingList: resRevert(result),
            },
          });
        }
      },
      { type: 'takeLatest' },
    ],
  },

  reducers: {
    save(state: any, action: any) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
