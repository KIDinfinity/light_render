import lodash from 'lodash';
import { refresh } from '@/services/owbNbChequeInfoControllerService';

import ChequeEditStatus from 'process/NewBusiness/Enum/ChequeEditStatus';

export default function* loadChequeInfoList({ payload }: any, { call, put, select }: any) {
  const userId = yield select(({ processTask }: any) => processTask.getTask?.assignee) || '';

  const showOnly = payload?.showOnly;

  const params = yield put.resolve({
    type: 'getChequeParams',
    payload: {
      showOnly,
    },
  });
  //
  const response = yield call(refresh, { ...params, ...payload });

  if (
    lodash.isPlainObject(response) &&
    !!response.success &&
    lodash.isPlainObject(response?.resultData)
  ) {
    const { chequeInfoList, editing, verified, editingUserId, editingAssignee } = lodash.pick(
      response?.resultData,
      ['chequeInfoList', 'editing', 'verified', 'userId', 'editingUserId', 'editingAssignee']
    );

    if (!!editingUserId) {
      yield put({
        type: 'saveEditingAssignee',
        payload: {
          editingAssignee: userId === editingUserId ? '' : editingAssignee,
        },
      });

      yield put({
        type: 'saveChequeEditStatus',
        payload: {
          chequeEditStatus: userId === editingUserId ? ChequeEditStatus.Editing : '',
        },
      });
    }

    if (!editing && !payload?.showOnly && !verified) {
      yield put({
        type: 'getEditChequeInfo',
      });
      yield put({
        type: 'saveEditingAssignee',
        payload: {
          editingAssignee: '',
        },
      });
      yield put({
        type: 'saveChequeEditStatus',
        payload: {
          chequeEditStatus: ChequeEditStatus.Editing,
        },
      });
    }
    yield put({
      type: 'saveChequeInfoList',
      payload: {
        chequeInfoList,
      },
    });
    if (verified) {
      yield put({
        type: 'saveChequeEditStatus',
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
}
