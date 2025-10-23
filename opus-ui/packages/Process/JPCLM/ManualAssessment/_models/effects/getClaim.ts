import { serialize as objectToFormData } from 'object-to-formdata';
import lodash from 'lodash';
import claimAssessmentControllerService from '@/services/claimAssessmentControllerService';

export default function* getClaim({ payload }: any, { call, put }: any) {
  const requestParam = objectToFormData(payload);

  const response = yield call(claimAssessmentControllerService.getClaimAssessment, requestParam);
  if (response.success && response.resultData) {
    const claimProcessData = response.resultData;

    lodash.forEach(claimProcessData?.incidentList, (item) => {
      lodash.set(item, 'causeOfIncident', item?.causeOfIncident || '疾病/けが');
    });

    // 保存理赔数据
    yield put({
      type: 'saveClaimProcessData',
      payload: claimProcessData,
    });
  }
  return response;
}
