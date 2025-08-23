import { findByPostalCode } from '@/services/miscAddressInformationControllerService';

type IResponse = Record<string, any>;

export default function* getAddressByCode({ payload, signal }: any, { put, call }: any) {
  const { postalCode, transactionId } = payload;

  const response: IResponse = yield call(
    findByPostalCode,
    { postalCode },
    {
      signal,
    }
  );

  yield put({
    type: 'setAddressChangeInfoByZipCode',
    payload: {
      address: response?.resultData,
      zipCode: postalCode,
      transactionId,
    },
  });
}
