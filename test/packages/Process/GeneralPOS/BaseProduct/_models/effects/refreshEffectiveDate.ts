import { refreshEffectiveDate } from '@/services/posSrvCaseInquiryControllerService';
import { diffTime } from 'process/GeneralPOS/common/utils';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import lodash from 'lodash';

export default function* refreshEffectiveDateEffect({ payload }: any, { put, select, call }: any) {
  const { effectiveDate, transactionId, type } = payload;
  const businessNo = yield select(({ processTask }: any) => processTask.getTask?.businessNo);
  const validating = yield select(
    ({ formCommonController }: any) => formCommonController.validating
  );
  const originEffectiveDate: any = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.entities?.transactionTypesMap[transactionId]?.effectiveDate
  );
  const warnMessage: any = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.processData?.showReAssess?.warnMessage
  );

  const params = { businessNo, effectiveDate };
  const response = yield call(refreshEffectiveDate, params);
  if (effectiveDate) {
    return;
  }

  if (response.success && response?.resultData?.effectiveDate) {
    if (type === 'cvDate') {
      yield put({
        type: 'policySurrenderUpdate',
        payload: {
          changedFields: { cvDate: response?.resultData?.effectiveDate },
          transactionId,
          validating,
        },
      });
    }
    if (type === 'loan' && diffTime(originEffectiveDate, response?.resultData?.effectiveDate)) {
      yield put({
        type: 'setShowReAssess',
        payload: {
          showReAssess: {
            show: true,
            change: true,
            warnMessage: lodash.uniq([...(warnMessage || []), 'MSG_000828']),
          },
        },
      });
    }
    yield put({
      type: 'transactionInfoUpdate',
      payload: {
        changedFields: { effectiveDate: response?.resultData?.effectiveDate },
        transactionId,
      },
    });
    yield put({
      type: 'getIndicator',
    });
  }
}
