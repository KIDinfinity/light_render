import claimJpclmClaimControllerService from '@/services/claimJpclmClaimControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';

export default function* getPolicyInsuredBeneficiaryOwner({ payload }: any, { call, put }: any) {
  const response = yield call(
    claimJpclmClaimControllerService.getPolicyInsuredBeneficiaryOwner,
    objectToFormData(payload)
  );
  if (response?.success && response.resultData) {
    yield put({
      type: 'savePolicyInsuredListMap',
      payload: response.resultData.claimInsuredIdList,
    });
    yield put({
      type: 'savePolicyBeneficiaryListMap',
      payload: response.resultData.policyBeneficiaryList,
    });
    yield put({
      type: 'savePolicyOwnerMap',
      payload: response.resultData.policyOwnerList,
    });
    yield put({
      type: 'saveDictFirstNameMap',
      payload: response.resultData,
    });
  }

  return response;
}
