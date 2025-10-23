import lodash from 'lodash';
import mcChatControllerService from '@/services/mcChatControllerService';

export default function* (_, { call, put, select }) {
  const sessionId = yield select((state) => state.chatController.sessionId);
  const currentChatMessagesPagination = yield select(
    (state) => state.chatController.currentChatMessagesPagination
  );

  const response = yield call(mcChatControllerService.getBySessionId, {
    currentPage: currentChatMessagesPagination.currentPage + 1,
    pageSize: 20,
    params: {
      sessionId,
    },
  });

  if (response?.success) {
    const { rows, currentPage, pageSize, total, totalPage } = { ...response.resultData };
    yield put({
      type: 'savePaginationListOfCurrentChatMessages',
      payload: {
        currentChatMessages: lodash.reverse(rows) || [],
      },
    });

    yield put({
      type: 'savePaginationInfoOfCurrentChatMessages',
      payload: {
        currentChatMessagesPagination: {
          currentPage,
          pageSize,
          total,
          totalPage,
        },
      },
    });
  }
}
