import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import claimInsuredPolicyControllerService from '@/services/claimInsuredPolicyControllerService';

export default function* queryListPolicy({ payload }: any, { call, put }: any) {
  const requestParam = objectToFormData(payload);
  const response = yield call(claimInsuredPolicyControllerService.listPolicies, requestParam);
  if (response && response.success && response.resultData) {
    const listPolicy = response.resultData;
    listPolicy.map((policy) => {
      policy.calculationAmount = policy.sumAssured;
    });
    yield put({
      type: 'saveListPolicy',
      payload: listPolicy,
    });
    const benefitTypeCodeUniqed = lodash.uniqBy(listPolicy, 'benefitTypeCode');
    const benefitTypeList = lodash.map(
      benefitTypeCodeUniqed,
      (benefitTypeCodeItem: any) => benefitTypeCodeItem.benefitTypeCode
    );
    const reimbursementPercentageMap = lodash.reduce(listPolicy, (r, c) => {
      r[`${c?.policyNo}-${c?.benefitTypeCode}-${c?.benefitItemCode}`] = c?.reimbursementPercentage;
      return r;
    });
    yield put({
      type: 'saveReimbursementPercentageMap',
      payload: { reimbursementPercentageMap },
    });
    yield put({
      type: 'getBeneficiaryTypeByBenefitType',
      payload: { benefitTypeList },
    });
  }

  return response;
}
