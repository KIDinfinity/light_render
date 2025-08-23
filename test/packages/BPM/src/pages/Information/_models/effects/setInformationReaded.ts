import lodash from 'lodash';
import { markInfoIsRead } from '@/services/bpmInfoControllerService';
import handleMessageModal from '@/utils/commonMessage';
import type { IEffects } from '../interfaces/index';

export default function* setInformationReaded({ payload }: any, { call, select, put }: IEffects) {
  const { id, newReadStatus } = payload;
  const userId = yield select((state) => state.user.currentUser.userId);
  const params = {
    id,
    userId,
    readStatus: newReadStatus,
  };
  const response = yield call(markInfoIsRead, params);
  const success = lodash.get(response, 'success');
  if (success) {
    yield put({
      type: 'updateReadStatusLocal',
      payload: {
        id,
        newReadStatus,
      },
    });
    // 点击已读未读的时候，history中原有的折叠板的展示状态保持不变
    yield put({
      type: 'saveHistoryActiveKey',
      payload: {
        saveHistoryActiveKey: true,
      },
    });
  } else {
    const promptMessages = lodash.get(response, 'promptMessages', []);
    handleMessageModal(promptMessages);
  }
}
