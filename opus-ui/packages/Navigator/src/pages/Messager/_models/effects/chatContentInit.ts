import lodash from 'lodash';

export default function* (_, { put, select, take }) {
  const userId = yield select((state) => state.user.currentUser?.userId);
  const sessionId = yield select((state) => state.chatController.sessionId);

  yield put({
    type: 'converseController/conversationList',
  });

  yield take('converseController/conversationList/@@end');

  let conversationList = yield select((state) => state.converseController.conversationList);

  let currentConversation = lodash.find(conversationList, ['sessionId', sessionId]);

  let contactList = yield select((state) => state.userContactController.contactList);

  if (!contactList) {
    yield put({
      type: 'userContactController/get',
      payload: {
        contacts: 'contacts',
      },
    });
    yield take('userContactController/get/@@end');
    contactList = yield select((state) => state.userContactController.contactList);
  }

  function getAtIndex($sessionId: string, $userId: string): number {
    const userIdIndex = $sessionId.indexOf($userId);
    // userId在后
    if ($sessionId.slice(userIdIndex - 1, userIdIndex) === '@') {
      return userIdIndex - 1;
    }
    // 默认在前
    return userIdIndex + $userId.length;
  }

  if (!currentConversation) {
    const atIndex = getAtIndex(sessionId, userId);
    const srcId = sessionId.slice(0, atIndex)
    const srcName = contactList.find((item: any) => item.userId === srcId)?.userName;
    const destId = sessionId.slice(atIndex + 1);
    const destName = contactList.find((item: any) => item.userId === destId)?.userName;

    yield put({
      type: 'converseController/createConversation',
      payload: {
        srcId,
        srcName,
        destId,
        destName,
      },
    });
    yield take('converseController/createConversation/@@end');
  }

  conversationList = yield select((state) => state.converseController.conversationList);
  currentConversation = lodash.find(conversationList, ['sessionId', sessionId]);
  const currentUser = yield select((state) => state.user.currentUser);
  const srcAvatar = lodash.find(contactList, ['userId', currentUser?.userId])?.userAvatar;
  const destAvatar = lodash.find(contactList, [
    'userId',
    currentConversation?.sessionPeer || currentConversation?.userId,
  ])?.userAvatar;

  yield put({
    type: 'saveCurrentChatInfo',
    payload: {
      currentChatInfo: {
        // 会话列表取sessionName 从通讯录发起聊天则取userName
        title: currentConversation?.sessionName || currentConversation?.userName,
        ustate: currentConversation?.ustate,
        unread: currentConversation?.unread,
        sessionPeer: currentConversation?.sessionPeer,
        sessionPeerName: currentConversation?.sessionPeerName,
        srcAvatar,
        destAvatar,
      },
    },
  });
  // 未读消息处理
  yield put({
    type: 'converseController/cleanUnreadOfConveration',
    payload: {
      sessionId: currentConversation?.sessionId,
    },
  });
}
