import { serialize as objectToFormData } from 'object-to-formdata';
import claimApClaimAssessmentControllerService from '@/services/claimApClaimAssessmentControllerService';

export default function* getClaim({ payload }: any, { call, put, select }: any) {
  const requestParam = objectToFormData(payload);
  const { taskDefKey } = payload;
  const { taskStatus } = yield select((state) => state.processTask.getTask);

  const response = yield call(
    claimApClaimAssessmentControllerService.getClaimAssessment,
    requestParam
  );
  if (response.success && response.resultData) {
    const claimProcessData = response.resultData;
    claimProcessData.activityKey = taskDefKey;
    yield put({
      type: 'followUpClaim/initFollowUpClaim',
      payload: {
        ...claimProcessData,
        taskStatus,
      },
    });
    // 保存理赔数据
    yield put({
      type: 'saveClaimProcessData',
      payload: claimProcessData,
    });
  }
  return response;
}
