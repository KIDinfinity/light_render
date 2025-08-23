export default function* (_, { put, select }) {
  const archiveList = yield select((state) => state.chatController.archiveList);

  // 打开对应的模板
  yield put({
    type: 'workspaceSwitchOn/changeSwitch',
    payload: {
      name: 'remark',
    },
  });
  yield put({
    type: 'navigatorInformationController/setCacheChatLink',
    payload: {
      archiveList,
    },
  });
}
