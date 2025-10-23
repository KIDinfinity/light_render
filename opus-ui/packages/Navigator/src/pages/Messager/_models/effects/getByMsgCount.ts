import mcChatControllerService from '@/services/mcChatControllerService';

export default function* ({ payload }, { call, put }) {
  const response = yield call(mcChatControllerService.getByMsgCount, payload);
  const { rows, currentPage, total, pageSize } = response?.resultData;

  if (response?.success) {
    yield put({
      type: 'saveGetByMsgCountReducer',
      payload: {
        getByMsgCount: {
          list: [...rows],
          pagination: {
            page: currentPage,
            total,
            pageSize,
          },
        },
      },
    });
  }

  return response;
}
