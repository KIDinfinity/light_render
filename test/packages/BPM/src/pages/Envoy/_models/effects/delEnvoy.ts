import lodash from 'lodash';
import { deleteReasonGroup } from '@/services/envoyReasonInfoControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';

interface IAction {
  payload: {
    groupIdx?: number;
    id?: number;
  };
}

export default function* delEnvoy({ payload }: IAction, { select, call, put }: any) {
  let { groupIdx, id } = payload;
  const currentReasonGroups = yield select(
    (state: any) => state.envoyController.currentReasonGroups
  );
  if(id) {
    groupIdx = currentReasonGroups.findIndex((reasonGroup) => reasonGroup.id === id);
  }
  const groupId = currentReasonGroups[groupIdx]?.id;
  const isNew = currentReasonGroups[groupIdx]?.isNew;
  if(groupId && !isNew) {
    const res = yield call(
      deleteReasonGroup,
      objectToFormData({
        reasonGroupId: groupId,
      })
    );
    if (lodash.isPlainObject(res) && res.success) {
      yield put({
        type: 'saveDelEnvoyResult',
        payload: {
          groupIdx,
        },
      });
    }
  } else {
    yield put({
      type: 'saveDelEnvoyResult',
      payload: {
        groupIdx,
      },
    });
  }
}
