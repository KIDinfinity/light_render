import { getCategoryReasons } from '@/services/bpmInfoControllerService';

export default function* ({ payload }: any, { call, put, select }: any) {
  const { activityCode, caseCategory, businessNo, categoryCode } = payload;

  const response = yield call(getCategoryReasons, {
    categoryCode,
    businessNo,
    activityCode,
    caseCategory,
  });

  if (response.success) {
    yield put({
      type: 'setCategoryReasons',
      payload: {
        categoryReasons: response.resultData,
      },
    });
  }

  return response;
}
