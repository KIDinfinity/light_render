import { serialize as objectToFormData } from 'object-to-formdata';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../../activity.config';
import { getBankCodesByRenewalPayTypeAndCurrencyCode } from '@/services/owbNbCfgControllerService';

export default function* ({ payload }: any, { call, put, select }: any) {
  const policyList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData?.policyList?.[0]
  );

  const response = yield call(
    getBankCodesByRenewalPayTypeAndCurrencyCode,
    objectToFormData({
      renewalPayType: formUtils.queryValue(policyList?.renewalPayType),
      currencyCode: formUtils.queryValue(policyList?.currencyCode),
    })
  );

  if (response?.success && response?.resultData) {
    yield put({
      type: 'setNewBankCodeList',
      payload: {
        bankCodeFilterArray: response?.resultData,
      },
    });
    return response?.resultData;
  }
}
