import { findUIConfig } from '@/services/posSrvCaseInquiryControllerService';

export default function* getUIConfig({ payload }, { put, call }: any) {
  const { caseCategory, activityKey, regionCode } = payload;
  const result = yield call(findUIConfig, {
    region: regionCode,
    category: caseCategory,
    activity: activityKey,
  });
  if (result.success && result.resultData) {
    const UIConfig = result.resultData;

    yield put({
      type: 'saveUIConfig',
      payload: {
        UIConfig,
      },
    });
  }
}
