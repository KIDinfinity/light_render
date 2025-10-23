import claimJapanPolicyControllerService from '@/services/claimJapanPolicyControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';
import { values } from 'lodash';

export default function* getPolicyInfo({ payload }: any, { call, select }: any) {
  const { policyBenefitId } = payload;
  const policyNo = yield select(
    (state: any) =>
      state.JPCLMOfClaimAssessmentController.claimEntities.policyBenefitListMap[policyBenefitId]
        .policyNo
  );
  const claimTypes = yield select(
    (state: any) =>
      values(state.JPCLMOfClaimAssessmentController.claimEntities.incidentListMap)[0]?.claimType
  );
  const response = yield call(
    claimJapanPolicyControllerService.getPolicyInfo,
    objectToFormData({ policyNo, claimTypes })
  );
  if (response.success && response.resultData) {
    return response.resultData;
  }
  return {};
}
