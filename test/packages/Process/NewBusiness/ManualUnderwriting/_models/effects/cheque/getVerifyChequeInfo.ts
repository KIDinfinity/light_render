import { verify } from '@/services/owbNbChequeInfoControllerService';
import { formUtils } from 'basic/components/Form';
import ChequeEditStatus from 'process/NewBusiness/Enum/ChequeEditStatus';

export default function* ({ payload }: any, { call, put }: any) {
  const { chequeInfoList } = payload || {};

  const params = yield put.resolve({
    type: 'getChequeParams',
  });
  const response = yield call(verify, {
    ...params,
    chequeInfoList: formUtils.cleanValidateData(chequeInfoList),
  });
  if (response?.success) {
    yield put({
      type: 'loadChequeInfoList',
      payload: {
        showOnly: false,
      },
    });
  }
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
