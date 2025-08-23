import { serialize as objectToFormData } from 'object-to-formdata';
import lodash from 'lodash';
import claimAssessmentControllerService from '@/services/claimAssessmentControllerService';

export default function* getClaim({ payload }: any, { call, put, select }: any) {
  const requestParam = objectToFormData(payload);

  const taskDetail = yield select((state: any) => state.processTask.getTask || {});

  const response = yield call(claimAssessmentControllerService.getClaimAssessment, requestParam);
  if (response.success && response.resultData) {
    const claimProcessData = response.resultData;
    // 保存理赔数据
    yield put({
      type: 'saveClaimProcessData',
      payload: { ...claimProcessData, ...lodash.pick(taskDetail, ['taskId', 'taskDefKey']) },
    });
  }
  return response;
}
