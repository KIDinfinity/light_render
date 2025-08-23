import type { IEffects } from '../interfaces/index';

export default function* changeAddShowButton(_: any, { put }: IEffects) {
  const currrentActivityCategory = yield put.resolve({
    type: 'getCurrentActivityCategory',
  });
  const showAddButton = currrentActivityCategory?.showAddButton;
  yield put({
    type: 'setShowAddButton',
    payload: {
      showAddButton,
    },
  });
  yield put({
    type: 'clearAuditLogPagination',
  });
}
