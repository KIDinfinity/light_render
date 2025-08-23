import { getDefaultValueByCode } from '@/services/owbNbCfgControllerService';

export default function* (_: any, { call, put }: any) {
  const response = yield call(getDefaultValueByCode, {
    codeType: 'refundPageEditable',
  });
  if (response.success) {
    yield put({
      type: 'saveRefundEditableState',
      payload: {
        refundEditable: response?.resultData === 'Y',
      },
    });
  }
}
