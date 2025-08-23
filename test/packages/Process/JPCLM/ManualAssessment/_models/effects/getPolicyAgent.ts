import lodash from 'lodash';
import claimC360PolicyControllerService from '@/services/claimC360PolicyControllerService';
import { formUtils } from 'basic/components/Form';
import { tenant } from '@/components/Tenant';
import { getAgentInfo } from '../functions/getServiceAgentInfo';

export default function* getPolicyAgent({ payload }: any, { call, put, select }: any) {
  const { insuredInfo, policyAgent } = yield select((state: any) => ({
    insuredInfo: state.JPCLMOfClaimAssessment.claimProcessData.insured,
    policyAgent: state.JPCLMOfClaimAssessment.claimProcessData.policyAgent,
  }));
  const insuredObj: any = formUtils.formatFlattenValue(formUtils.cleanValidateData(insuredInfo));
  const { policyId, insuredId } = lodash.pick(insuredObj, ['policyId', 'insuredId']);
  const newPolicyId = lodash.trim(formUtils.queryValue(policyId));
  const params = {
    insured: { insuredId, newPolicyId },
    regionCode: tenant.remoteRegion(),
  };
  const response = yield call(claimC360PolicyControllerService.inquiryByInsured, params);
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success && resultData) {
    const newPolicyAgent = getAgentInfo(newPolicyId, resultData?.policyAgentList) || {};
    yield put({
      type: 'savePolicyAgent',
      payload: {
        policyAgent: {
          ...newPolicyAgent,
          agencyAcceptanceDate: policyAgent?.agencyAcceptanceDate,
          informTheAgency: policyAgent?.informTheAgency,
        },
      },
    });
  }
}
