import { save } from '@/services/owbNbChequeInfoControllerService';

import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

export default function* ({ payload }: any, { call, put, select }: any) {
  const params = yield put.resolve({
    type: 'getChequeParams',
  });

  const chequeInfoList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData.processData.chequeInfoList
  ) || [];

  const response = yield call(save, { ...params, chequeInfoList });

  return response;
}
