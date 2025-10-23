function* openChat(_: any, { put }: any) {
  yield put({
    type: 'workspaceSwitchOn/changeSwitch',
    payload: {
      name: 'chat',
    },
  });
}

export default openChat;
