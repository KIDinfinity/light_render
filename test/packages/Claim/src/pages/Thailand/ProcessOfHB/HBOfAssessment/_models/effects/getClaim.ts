import { serialize as objectToFormData } from 'object-to-formdata';
import claimDaClaimAssessmentControllerService from '@/services/claimDaClaimAssessmentControllerService';
import claimOpdClaimAssessmentControllerService from '@/services/claimOpdClaimAssessmentControllerService';
import claimPaClaimAssessmentControllerService from '@/services/claimPaClaimAssessmentControllerService';
import claimRbClaimAssessmentControllerService from '@/services/claimRbClaimAssessmentControllerService';
import claimHospitalBillingControllerService from '@/services/claimHospitalBillingControllerService';

export default function* getClaim({ payload }: any, { call, put, select }: any) {
  const requestParam = objectToFormData(payload);
  const { caseCategory } = payload;
  let getClaimAssessment;
  switch (caseCategory) {
    case 'TH_GC_CTG01':
      getClaimAssessment = claimRbClaimAssessmentControllerService.getClaimAssessment;
      break;
    case 'TH_GC_CTG02':
      getClaimAssessment = claimPaClaimAssessmentControllerService.getClaimAssessment;
      break;
    case 'TH_GC_CTG03':
      getClaimAssessment = claimOpdClaimAssessmentControllerService.getClaimAssessment;
      break;
    case 'TH_GC_CTG05':
      getClaimAssessment = claimHospitalBillingControllerService.getIdentify;
      break;
    default:
      getClaimAssessment = claimDaClaimAssessmentControllerService.getClaimAssessment;
      break;
  }
  const response = yield call(getClaimAssessment, requestParam);
  if (response.success && response.resultData) {
    const claimProcessData = response.resultData;
    // 保存理赔数据
    yield put({
      type: 'saveClaimProcessData',
      payload: claimProcessData,
    });
  }
  return response;
}
