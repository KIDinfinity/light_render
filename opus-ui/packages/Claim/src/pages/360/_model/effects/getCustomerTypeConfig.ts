import lodash from 'lodash';
import bpmCommonControllerService from '@/services/bpmCommonControllerService';

export default function* getCustomerTypeConfig({ payload }: any, { call, put }: any) {
  const { caseDetail } = payload || {};

  // @ts-ignore
  const response: any = yield call(bpmCommonControllerService.getCustomerTypeConfig, {
    caseCategory: caseDetail?.caseCategory,
  });

  if (response?.success && lodash.isPlainObject(response?.resultData)) {
    const { businessCode, customerType } = response?.resultData || {};
    yield put({
      type: 'saveCustomerType',
      payload: {
        customerType,
        businessCode,
      },
    });
    yield put({
      type: 'getMultipleOverallSideBar',
      payload: {
        customerType,
        caseDetail,
      },
    });
  }
}
