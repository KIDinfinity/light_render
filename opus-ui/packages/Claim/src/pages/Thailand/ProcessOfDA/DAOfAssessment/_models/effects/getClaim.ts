import { serialize as objectToFormData } from 'object-to-formdata';
import lodash from 'lodash';
import { getClaimAssessment } from 'claim/pages/Thailand/ProcessOfDA/flowConfig';

export default function* getClaim({ payload }: any, { call, put, select }: any) {
  const requestParam = objectToFormData(payload);
  const { caseCategory, taskDefKey } = payload;
  const { taskStatus } = yield select((state: any) => state.processTask.getTask);

  const response = yield call(getClaimAssessment[caseCategory], requestParam);
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
  return lodash.get(response, 'resultData');
}
