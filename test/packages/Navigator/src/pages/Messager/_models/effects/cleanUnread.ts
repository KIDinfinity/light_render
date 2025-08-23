import { serialize as objectToFormData } from 'object-to-formdata';
import mcChatControllerService from '@/services/mcChatControllerService';

export default function* (_, { call, put, select }) {
  const sessionId = yield select((state) => state.chatController.sessionId);

  if (sessionId) {
    const response = yield call(
      mcChatControllerService.cleanUnread,
      objectToFormData({
        sessionId,
      })
    );

    if (response?.success) {
      yield put({
        type: 'cleanUnreadOfCurrentChatInfo',
      });

      yield put({
        type: 'converseController/cleanUnreadOfConveration',
        payload: {
          sessionId,
        },
      });
    }
  }
}
