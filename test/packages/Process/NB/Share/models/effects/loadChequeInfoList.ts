import lodash from 'lodash';
import { refresh } from '@/services/owbNbChequeInfoControllerService';
import ChequeEditStatus from 'process/NB/Enum/ChequeEditStatus';

export default function* loadChequeInfoList({ payload }: any, { call, put, select }: any) {
  const {
    assignee,
    applicationNo,
    caseNo,
    taskId,
    chequeNo,
    NAMESPACE,
    paymentOption,
    forceRefresh: localForceRefresh,
    payType,
  } = lodash.pick(payload, [
    'assignee',
    'applicationNo',
    'caseNo',
    'taskId',
    'chequeNo',
    'NAMESPACE',
    'paymentOption',
    'forceRefresh',
    'payType',
  ]);
  const chequeEditStatus = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.chequeEditStatus
  );

  const forceRefresh = (() => {
    return chequeEditStatus === ChequeEditStatus.Editing || localForceRefresh;
  })();
  const response = yield call(refresh, {
    assignee,
    applicationNo,
    caseNo,
    taskId,
    chequeNo,
    forceRefresh,
    paymentOption,
    payType,
  });
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success) {
    const { chequeInfoList, editing, verified } = lodash.pick(resultData, [
      'chequeInfoList',
      'editing',
      'verified',
    ]);

    yield put({
      type: 'setChequeInfoList',
      payload: {
        chequeInfoList,
      },
    });
    if (editing) {
      yield put({
        type: 'setChequeEditStatus',
        payload: {
          chequeEditStatus: ChequeEditStatus.Editing,
        },
      });
    }
    if (verified) {
      yield put({
        type: 'setChequeEditStatus',
        payload: {
          chequeEditStatus: ChequeEditStatus.Verified,
        },
      });
    } else {
      yield put({
        type: 'setChequeEditStatus',
        payload: {
          chequeEditStatus: '',
        },
      });
    }
  }
  return success;
}
