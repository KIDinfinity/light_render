import { serialize as objectToFormData } from 'object-to-formdata';
import lodash from 'lodash';
import { getBankCodesByRenewalPayTypeAndCurrencyCode } from '@/services/owbNbCfgControllerService';

export default function* ({ payload }: any, { call, put, select }: any) {
  const { renewalPayType, currencyCode } = payload;

  const response = yield call(
    getBankCodesByRenewalPayTypeAndCurrencyCode,
    objectToFormData({
      renewalPayType,
      currencyCode,
    })
  );

  if (
    lodash.isPlainObject(response) &&
    !!response?.success &&
    lodash.isArray(response?.resultData) &&
    !lodash.isEmpty(response?.resultData)
  ) {
    yield put({
      type: 'saveBankCodeByRptAndCcList',
      payload: {
        bankCodeByRptAndCcList: response?.resultData,
      },
    });
    return response?.resultData;
  }
}
