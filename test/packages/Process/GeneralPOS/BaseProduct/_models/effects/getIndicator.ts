import { getIndicatorBySrvNo } from '@/services/posSrvPreviewControllerService';

import { NAMESPACE } from '../../activity.config';

export default function* (_, { call, put, select }: any): any {
  const srvNo: any = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.srvNo
  );
  const transactionTypesId = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.transactionTypes?.[0]
  );
  const transactionTypeCode = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.entities?.transactionTypesMap?.[transactionTypesId]?.transactionTypeCode
  );

  if (!srvNo || !transactionTypeCode) {
    return;
  }

  const response = yield call(getIndicatorBySrvNo, {
    srvNo,
    transactionTypes: [{ transactionTypeCode }],
  });

  if (response && response?.success) {
    yield put({
      type: 'saveIndicatorBySrvNo',
      payload: {
        needReCalEffective: response?.resultData?.displayExclamationMark,
      },
    });
  }
}
