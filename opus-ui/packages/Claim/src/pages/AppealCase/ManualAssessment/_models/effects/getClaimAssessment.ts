import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import claimAssessmentControllerService from '@/services/claimAssessmentControllerService';

export default function* getClaimAssessment({ payload }: any, { call, put }: any) {
  const { taskNotEditable, ...res } = payload;

  const requestParam = objectToFormData({ ...res });

  const response = yield call(claimAssessmentControllerService.getClaimAssessment, requestParam);

  if (response.success && response.resultData) {
    const businessData = response.resultData;
    // 保存理赔数据
    yield put({
      type: 'saveClaimProcessData',
      payload: {
        businessData,
        taskNotEditable,
      },
    });

    const claimAppealRelateCaseInfo = lodash.get(businessData, 'claimAppealRelateCaseInfo', {});

    if (!lodash.isEmpty(claimAppealRelateCaseInfo)) {
      yield put({
        type: 'saveAppealRelateCase',
        payload: [claimAppealRelateCaseInfo],
      });
    }

    yield put({
      type: 'saveClaimAppealOriginalCase',
      payload: businessData,
    });
  }
  return response;
}
