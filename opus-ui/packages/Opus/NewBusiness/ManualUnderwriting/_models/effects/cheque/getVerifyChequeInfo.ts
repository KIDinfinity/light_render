import { verify } from '@/services/owbNbChequeInfoControllerService';

import ChequeEditStatus from 'opus/NewBusiness/Enum/ChequeEditStatus';

export default function* ({ payload }: any, { call, put }: any) {
  const { chequeInfoList } = payload || {};

  const params = yield put.resolve({
    type: 'getChequeParams',
  });

  const response = yield call(verify, { ...params, chequeInfoList });

  if (!!response.success) {
    yield put({
      type: 'saveChequeEditStatus',
      payload: {
        chequeEditStatus: ChequeEditStatus.Verified,
      },
    });
  }

  return response;
}
