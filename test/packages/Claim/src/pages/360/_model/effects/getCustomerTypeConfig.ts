import lodash from 'lodash';
import bpmCommonControllerService from '@/services/bpmCommonControllerService';

export default function* getCustomerTypeConfig(_: any, { select, call, put }: any) {
  // @ts-ignore
  const caseCategory: any = yield select(
    (state: any) => state.insured360?.taskInfo?.caseCategory
  ) || '';

  // @ts-ignore
  const response: any = yield call(bpmCommonControllerService.getCustomerTypeConfig, {
    caseCategory,
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
      },
    });
  }
}
