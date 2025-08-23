import mcBroadcastControllerService from '@/services/mcBroadcastControllerService';

export default function* ({ payload }, { call, put, select }) {
  const userId = yield select((state) => state.user.currentUser?.userId);
  const response = yield call(mcBroadcastControllerService.changeStatus, {
    userId,
    status: payload.status,
  });

  if (response?.success) {
    yield put({
      type: 'changeChatStatusReducer',
      payload: {
        chatStatus: payload.status,
      },
    });
  }
}
