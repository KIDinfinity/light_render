import { edit } from '@/services/owbNbChequeInfoControllerService';
import lodash from 'lodash';
import ChequeEditStatus from 'process/NB/Enum/ChequeEditStatus';

export default function* ({ payload }: any, { call, put }: any) {
  const {
    chequeNo,
    assignee,
    taskId,
    caseNo,
    applicationNo,
    paymentOption,
    payType,
  } = lodash.pick(payload, [
    'chequeNo',
    'assignee',
    'taskId',
    'caseNo',
    'applicationNo',
    'paymentOption',
    'payType',
  ]);

  const response = yield call(edit, {
    chequeNo,
    assignee,
    taskId,
    caseNo,
    applicationNo,
    paymentOption,
    payType,
  });
  const { success } = lodash.pick(response, ['success']);

  if (success) {
    yield put({
      type: 'setChequeEditStatus',
      payload: {
        chequeEditStatus: ChequeEditStatus.Editing,
      },
    });
  }

  return response;
}
