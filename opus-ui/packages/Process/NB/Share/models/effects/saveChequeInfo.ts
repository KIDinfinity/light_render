import { save } from '@/services/owbNbChequeInfoControllerService';
import lodash from 'lodash';
import ChequeEditStatus from 'process/NB/Enum/ChequeEditStatus';

export default function* ({ payload }: any, { call, put }: any) {
  const {
    chequeInfoList,
    applicationNo,
    caseNo,
    taskId,
    assignee,
    chequeNo,
    paymentOption,
    payType,
  } = lodash.pick(payload, [
    'applicationNo',
    'caseNo',
    'taskId',
    'chequeInfoList',
    'assignee',
    'chequeNo',
    'paymentOption',
    'payType',
  ]);

  const response = yield call(save, {
    chequeInfoList,
    applicationNo,
    caseNo,
    taskId,
    assignee,
    chequeNo,
    paymentOption,
    payType,
  });
  const { success } = lodash.pick(response, ['success']);
  if (success) {
    yield put({
      type: 'setChequeEditStatus',
      payload: {
        chequeEditStatus: ChequeEditStatus.Saved,
      },
    });
  }
  return response;
}
