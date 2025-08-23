import { getRetryIntegrationCodeAndStatus } from '@/services/integrationRetryControllerService';
export default function* (_: any, { select, put, call }: any) {
  const {
    businessInfo
  } = yield select((state: any) => state.exceptionalHandlingController?.claimProcessData);

  const response = yield call(getRetryIntegrationCodeAndStatus, {
    activityKey: businessInfo?.bizActivity,
    caseCategory: businessInfo?.bizCaseCategory,
    taskId: businessInfo?.bizTaskId,
  })

  if (response && response?.success) {
    yield put({
      type: 'saveRetryList',
      payload: {
        retryList: response.resultData
      }
    })
  }
}
