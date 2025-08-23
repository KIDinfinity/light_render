import { getAllFunds } from '@/services/miscCfgInquiryControllerService';

export default function* (_: any, { call, put }: any) {
  const res = yield call(getAllFunds) || [];
  if (!res?.success) {
    return;
  }
  yield put({
    type: 'setAllFunds',
    payload: {
      data: res?.resultData
    },
  });
}
