import { address } from '@/services/miscAddressInformationControllerService';

export default function* ({ payload }: any, { call, put }: any) {
  const { param, cascadeAdressKey, level } = payload;
  const map = ['province', 'district', 'city']
  const response = yield call(address, param);

  if (response.success) {
    yield put({
      type: 'saveCascadeAdress',
      payload: {
        result: response.resultData?.[map[level]],
        cascadeAdressKey,
      },
    });
  }
}
