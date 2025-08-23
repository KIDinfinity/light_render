import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import claimInsuredPolicyControllerService from '@/services/claimInsuredPolicyControllerService';

export default function* queryListPolicy({ payload }: any, { call, put, select }: any) {
  let claimNo;
  if (!payload) {
    claimNo = yield select(
      (state: any) => state.hbOfClaimAssessmentController.claimProcessData.claimNo
    );
  } else {
    claimNo = payload.claimNo;
  }
  const requestParam = objectToFormData({ claimNo });
  const response = yield call(claimInsuredPolicyControllerService.listPolicies, requestParam);
  if (response && response.success && response.resultData) {
    const listPolicy = response.resultData;
    yield put({
      type: 'saveListPolicy',
      payload: listPolicy,
    });
    const benefitTypeCodeUniqed = lodash.uniqBy(listPolicy, 'benefitTypeCode');
    const benefitTypeList = lodash.map(
      benefitTypeCodeUniqed,
      (benefitTypeCodeItem) => benefitTypeCodeItem.benefitTypeCode
    );
    yield put({
      type: 'getBeneficiaryTypeByBenefitType',
      payload: { benefitTypeList },
    });
  }

  return response;
}
