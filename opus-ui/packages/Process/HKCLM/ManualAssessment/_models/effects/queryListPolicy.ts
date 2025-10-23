import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import claimInsuredPolicyControllerService from '@/services/claimInsuredPolicyControllerService';

export default function* queryListPolicy({ payload }: any, { call, put }: any) {
  const requestParam = objectToFormData(payload);
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
      (benefitTypeCodeItem: any) => benefitTypeCodeItem.benefitTypeCode
    );
    yield put({
      type: 'getBeneficiaryTypeByBenefitType',
      payload: { benefitTypeList },
    });
  }

  return response;
}
