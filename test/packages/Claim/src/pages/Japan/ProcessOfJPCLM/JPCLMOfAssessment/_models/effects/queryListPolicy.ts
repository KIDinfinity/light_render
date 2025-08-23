import claimInsuredPolicyControllerService from '@/services/claimInsuredPolicyControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';
import lodash from 'lodash';
import { handleListPolicy } from '../functions';

export default function* queryListPolicy({ payload }: any, { call, put, select }: any) {
  const requestParam = objectToFormData(payload);
  const response = yield call(claimInsuredPolicyControllerService.jpListPolicy, requestParam);
  if (response && response.success && response.resultData) {
    const listPolicy = handleListPolicy(response.resultData);

    yield put({
      type: 'saveListPolicy',
      payload: listPolicy,
    });
    const benefitTypeCodeUniqed = lodash.uniqBy(listPolicy, 'benefitTypeCode');
    const benefitTypeList = lodash.map(benefitTypeCodeUniqed, (benefitTypeCodeItem) =>
      lodash.get(benefitTypeCodeItem, 'benefitTypeCode')
    );
    yield put({
      type: 'getBeneficiaryTypeByBenefitType',
      payload: { benefitTypeList },
    });
  }

  return response;
}
