import { address } from '@/services/miscAddressInformationControllerService';

type IResponse = Record<string, any>;

export default function* getAddress({ payload = {} }, { call, put }: any) {
  const response: IResponse = yield call(address, payload);

  yield put({
    type: 'addressUpdate',
    payload: response?.resultData,
  });
}
