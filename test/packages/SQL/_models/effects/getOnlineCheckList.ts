import { getOnlineCheckList } from '@/services/ccInspectionControllerService';

export default function* ({ payload }: any, { call, put }: any): any {
  const response: any = yield call(getOnlineCheckList, payload?.formData);

  if (response && response.success) {
    yield put({
      type: 'setOnlineCheckList',
      payload: {
        list: response.resultData,
      },
    });
  }
}
