import { getPayeeInformation } from '@/services/claimSearchAddressService';
import { NAMESPACE } from '../../activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { serialize as objectToFormData } from 'object-to-formdata';
import lodash from 'lodash';

export default function* getDefaultPayment({ payload }: any, { call, put, select }: any) {
  const { id, countryCode } = payload;
  const policyNo = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData?.insured?.policyId
  );

  if (policyNo) {
    const response = yield call(
      getPayeeInformation,
      objectToFormData({ policyNo, businessCode: 'BIZ001' })
    );

    if (response.success && response.resultData) {
      yield put({
        type: 'setDefaultPayment',
        payload: {
          payeeId: id,
          defaultPayee: response.resultData,
          countryCode,
        },
      });
    } else {
      yield put({
        type: 'setDefaultPayment',
        payload: {
          payeeId: id,
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
