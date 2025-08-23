import lodash from 'lodash';
import mcChatControllerService from '@/services/mcChatControllerService';

export default function* ({ payload }, { call, put, select }) {
  let sessionId = yield select((state) => state.chatController.sessionId);
  const content = yield select((state) => state.chatController.keyword);
  const contactList = yield select((state) => state.userContactController.contactList);
  const { reverse } = payload;
  if (contactList.some((item: any) => item.userId === sessionId)) {
    const userId = yield select((state) => state.user.currentUser.userId);
    sessionId = `${userId}@${sessionId}`;

    yield put({
      type: 'saveSessionId',
      payload: {
        sessionId,
      },
    });
  }

  const response = yield call(mcChatControllerService.getBySessionId, {
    currentPage: payload?.currentPage,
    pageSize: 20,
    params: {
      sessionId,
      content,
    },
  });

  if (response?.success) {
    yield put({
      type: 'saveCurrentChatMessages',
      payload: {
        currentChatMessages:
          (reverse
            ? lodash.reverse([...response.resultData?.rows])
            : [...response.resultData?.rows]) || [],
      },
    });

    yield put({
      type: 'savePaginationInfoOfCurrentChatMessages',
      payload: {
        currentChatMessagesPagination: {
          currentPage: response.resultData?.currentPage,
          pageSize: response.resultData?.pageSize,
          total: response.resultData?.total,
          totalPage: response.resultData?.totalPage,
        },
      },
    });
  }
}
