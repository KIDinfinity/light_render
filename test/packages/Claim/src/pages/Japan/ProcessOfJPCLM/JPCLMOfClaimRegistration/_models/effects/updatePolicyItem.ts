import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { formUtils } from 'basic/components/Form';
import { getPolicyInfo } from '@/services/claimJpclmClaimControllerService';

export default function* updatePolicyItem({ payload }: any, { call, put, select }: any) {
  const { policyNo, policyId } = payload;
  const claimProcessData = yield select(
    (state) => state.JPCLMOfClaimRegistrationController.claimProcessData
  );
  const claimEntities = yield select(
    (state) => state.JPCLMOfClaimRegistrationController.claimEntities
  );
  const incidentId = lodash.get(claimProcessData, 'incidentList[0]');
  const claimTypes = formUtils.queryValue(
    lodash.get(claimEntities.incidentListMap[incidentId], 'claimType')
  );
  const requestParam = objectToFormData({ claimTypes, policyNo });

  const response = yield call(getPolicyInfo, requestParam);
  if (response.success && response.resultData) {
    const policyInfo = response.resultData;
    const {
      basicPlanCode,
      beneficiaryName,
      benefitTypeCodeList,
      insuredBirthDate,
      insuredName,
      insuredNameSpelling,
      policyIssueDate,
      policyOwnerName,
      policyOwnerNameSpelling,
      policyStatus,
    } = policyInfo;
    const changedFields = {
      basicPlanCode,
      beneficiaryName,
      benefitTypeCodeList,
      insuredBirthDate,
      insuredName,
      insuredNameSpelling,
      policyIssueDate,
      policyOwnerName,
      policyOwnerNameSpelling,
      policyStatus,
    };
    // 保存理赔数据
    yield put({
      type: 'savePolicyListItem',
      payload: {
        changedFields,
        policyId,
      },
    });
  }
  return response;
}
