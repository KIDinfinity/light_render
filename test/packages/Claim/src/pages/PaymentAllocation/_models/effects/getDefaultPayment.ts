import { getPayeeInformation } from '@/services/claimSearchAddressService';
import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default function* getDefaultPayment({ payload }: any, { call, put, select }: any) {
  const { id, countryCode } = payload;

  const policyBenefitList = yield select(
    ({ paymentAllocation }: any) => paymentAllocation.claimData.policyBenefitList
  );

  const policyNo = lodash.first(policyBenefitList)?.policyNo;

  if (policyNo) {
    const response = yield call(
      getPayeeInformation,
      objectToFormData({ policyNo, businessCode: 'BIZ001' })
    );

    if (response.success && response.resultData) {
      yield put({
        type: 'setDefaultPayment',
        payload: {
          id,
          defaultPayee: response.resultData,
          countryCode,
        },
      });
    }  else {
      yield put({
        type: 'setDefaultPayment',
        payload: {
          id,
          errors: lodash.map(response.promptMessages, (item) => {
            return {
              message: formatMessageApi({ Label_COM_ErrorMessage: item.content }),
              field: 'isDefaultPaymentMethod',
            };
          }),
        },
      });
    }
  }
}
