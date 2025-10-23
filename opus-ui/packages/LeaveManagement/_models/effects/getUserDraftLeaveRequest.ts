import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { LS, LSKey } from '@/utils/cache';
import { getUserDraftLeaveRequest } from '@/services/userCenterUserLeaveRequestControllerService';
import { Mode } from '../../Enum';

export default function* (action: any, { select, call, put }: any) {
  const { userId } = LS.getItem(LSKey.CURRENTUSER) || {};
  const modalTaskId = yield select((state: any) => state.leaveManagement.modalTaskId);

  const response = yield call(getUserDraftLeaveRequest, objectToFormData({ userId }));

  if (
    lodash.isPlainObject(response) &&
    (!response.resultData || lodash.isEmpty(response.resultData))
  ) {
    yield put({
      type: 'saveState',
      payload: {
        draftTaskId: '',
      },
    });
  }

  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isPlainObject(response.resultData)
  ) {
    const { currentTaskId } = response.resultData;
    yield put({
      type: 'saveState',
      payload: {
        draftTaskId: currentTaskId,
        modalTaskId: lodash.isEmpty(modalTaskId) ? currentTaskId : modalTaskId,
        mode: Mode.Expansion,
      },
    });
  }
}
