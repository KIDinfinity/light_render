import lodash from 'lodash';
import claimC360PolicyControllerService from '@/services/claimC360PolicyControllerService';
import { formUtils } from 'basic/components/Form';
import { tenant } from '@/components/Tenant';
import { getAgentInfo } from '../functions/getServiceAgentInfo';
import { Action } from '@/components/AuditLog/Enum';

export default function* getPolicyAgent({ payload }: any, { call, put, select }: any) {
  const { source } = payload;
  const { insuredInfo } = yield select((state: any) => ({
    insuredInfo: state.opusClaimDataCapture.claimProcessData.insured,
    policyAgent: state.opusClaimDataCapture.claimProcessData.policyAgent,
    caseCategory: state?.opusClaimDataCapture?.claimProcessData?.caseCategory,
  }));
  const insuredObj: any = formUtils.formatFlattenValue(formUtils.cleanValidateData(insuredInfo));
  const { policyId, insuredId } = lodash.pick(insuredObj, ['policyId', 'insuredId']);
  const newPolicyId = lodash.trim(formUtils.queryValue(policyId));
  const params = {
    insured: { insuredId, policyId: newPolicyId },
    regionCode: tenant.remoteRegion(),
  };
  const response = yield call(claimC360PolicyControllerService.inquiryByInsured, params);
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && resultData) {
    const newPolicyAgent = getAgentInfo(newPolicyId, resultData?.policyAgentList);
    yield put({
      type: 'savePolicyAgent',
      payload: { policyAgent: newPolicyAgent },
    });
    yield put({
      type: 'policyListUpdate',
      payload: { policyContractList: response?.resultData?.policyContractList || [] },
    });
    yield put({
      type: 'auditLogController/logInformation',
      payload: {
        action: Action.Refresh,
        category: source || '',
      },
    });
  }
}
