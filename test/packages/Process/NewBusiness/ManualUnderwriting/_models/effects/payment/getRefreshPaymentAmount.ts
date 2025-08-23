import lodash from 'lodash';
import { notification } from 'antd';

import { refresh } from '@/services/owbNbPremiumEnquiryControllerService';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default function* ({ payload }: any, { call, put, select }: any): Generator<any, any, any> {
  const { init = false } = payload || {};

  const applicationNo: string = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.processData?.planInfoData?.applicationNo
  ) || '';
  const taskDetail = yield select(({ processTask }) => processTask.getTask);

  const response = yield call(refresh, { applicationNo });
  if (
    lodash.isPlainObject(response) &&
    !!response.success &&
    lodash.isPlainObject(response?.resultData)
  ) {
    const paymentAmountDataMap = new Map();
    lodash
      .chain(response?.resultData || {})
      .entries()
      .forEach(([key, value]) => {
        if (lodash.isNumber(value)) {
          paymentAmountDataMap.set(key, lodash.toNumber(value).toFixed(2));
        } else {
          paymentAmountDataMap.set(key, value);
        }
      })
      .value();
    const paymentAmountData = Object.fromEntries(paymentAmountDataMap);
    yield put({
      type: 'savePaymentAmountData',
      payload: {
        paymentAmountData,
      },
    });
    if (taskDetail) {
      const { businessNo, caseNo, caseCategory, taskDefKey } = taskDetail;
      if (businessNo && caseNo && caseCategory) {
        yield put({
          type: 'integration/getIntegrationChecklist',
          payload: {
            businessNo,
            caseNo,
            caseCategory,
            taskDefKey,
          },
        });
      }
    }
    !init &&
      notification.success({
        message: 'Refresh successfully!',
      });
  } else {
    !init &&
      notification.error({
        message: 'Refresh fail!',
      });
  }
}
