import mcChatControllerService from '@/services/mcChatControllerService';

export default function* (_, { call, put, select }) {
  const currentUser = yield select((state) => state.user.currentUser);
  const currentChatInfo = yield select((state) => state.chatController.currentChatInfo);
  const currentSendingMessage = yield select((state) => state.chatController.currentSendingMessage);

  if (currentUser?.userId && currentChatInfo?.sessionPeer) {
    const response = yield call(mcChatControllerService.text, {
      srcId: currentUser.userId,
      srcName: currentUser.userName,
      destId: currentChatInfo.sessionPeer,
      destName: currentChatInfo.sessionPeerName,
      content: currentSendingMessage,
      type: 0,
      channels: [1],
      contentType: 1,
    });

    if (response?.success) {
      yield put({
        type: 'newMessageOfSendingBySelfOfCurrentChatMessages',
        payload: {
          chatMessage: {
            creator: null,
            deleted: null,
            gmtCreate: null,
            gmtModified: null,
            mid: response.resultData?.id,
            modifier: null,
            transId: null,
            ...response.resultData,
          },
        },
      });
    }
  }
}
