import { getProcessDetail } from '@/services/integrationExceptionHandlingControllerService';

export default function* ({ payload }: any, {  put, call }: any) {
  const { id } = payload;
  const response = yield call(getProcessDetail, {
    id,
  });
  if (response && response?.success) {
    yield put({
      type: 'saveProcessDetailList',
      payload: {
        currentProcessDetail: response.resultData,
      },
    });
  }
}
